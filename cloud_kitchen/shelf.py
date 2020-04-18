import time
from db import db

import logging
logger = logging.getLogger(__name__)


class Shelf:
    """
    BaseClass for various shelves. Currently meets the base for
    Hot, Cold, Frozen, Overflow
    """

    def __init__(self, capacity, shelf_decay_modifier, shelf_type):
        # food items
        self.items = []
        self.capacity = capacity
        self.shelfDecayModifier = shelf_decay_modifier
        self.type = shelf_type

    def insert_item(self, food, overflow_shelf):
        """
        Place the food in shelf. If no space available,
        make space. Once the food is placed in shelf, then
        update with insert_time so that the decay time can
        be calculated
        """
        logger.info("{} shelf: received request to insert"
                    "food: {}".format(self.type, food["id"]))

        self.check_make_space_in_shelf(overflow_shelf)

        # update with shelf_type. Primary data that will tell
        # courier where is the food placed
        food["shelf"] = self.type
        food["insert_time"] = int(time.time())
        logger.info("{} shelf: inserted new food".format(self.type, food))
        db.create_order(food)

    def is_decayed(self, food):
        """Calculation is as per requirement. If value hits 0,
        then it is considered decayed. Anything above means
        it still has shelfLife"""
        orderAge = int(time.time()) - food["insert_time"]
        value = (food["shelfLife"] - food["decayRate"] * int(time.time()) *
                 self.shelfDecayModifier * orderAge)/food["shelfLife"]
        return value <= 0

    def check_make_space_in_shelf(self, overflow_shelf):
        """
        Check to see if space exists. This means two things
            1. Are there any decayed items? if so trash (del entry) it
            2. Has the max capacity of the shelf been reached
        If still no space, then move an existing entry elsewhere.
        """
        space_available = self.get_available_space() > 0 or \
                          self.trash_decayed_items() is True

        if space_available:
            logger.info("{} shelf: There is enough space to put food".format(self.type))
            return

        logger.debug("{} shelf: Not enough space to put food".format(self.type))
        order_id = self.retrieve_any_order_id()
        self.move_order(order_id, overflow_shelf)

    def get_available_space(self):
        """
        Retrieve the available space in a shelf. Currently this is an
        algorithm to calculate from hashed entries
        """
        used_space = 0
        for order_id in db.get_orders_in_process():
            if db.get_processing_data(order_id)["shelf"] == self.type:
                used_space += 1
        return self.capacity - used_space

    def retrieve_any_order_id(self):
        """
        The requirements say that if the shelf is full, then
        retrieve any order from it and move it to overflow
        """
        ids = db.get_orders_in_process()
        for id_each in ids:
            if db.get_processing_data(id_each)["shelf"] == self.type:
                return id_each

        logger.error("couldn't find any order that can be moved"
                     "shelf type: {}".format(self.type))

    def move_order(self, order_id, overflow_shelf):
        """
        Move the food from current shelf to overflow
        NOTE: This function will not work for overflow class and needs
        to be overridden
        """
        logger.info("requesting to move {} from {} shelf to overflow".format(order_id, self.type))
        db.update_order(order_id, "shelf", "overflow")

    def trash_decayed_items(self):
        """
        When looking to make space in a given shelf, check to see
        if any food items have gone bad. If so trash (del entry) them.
        """
        decayed_order_id = []
        order_id = db.get_orders_in_process()
        # retrieve the orders of the current shelf
        # then check if its decayed
        for each_key in order_id:
            food = db.get_processing_data(each_key)
            if food["shelf"] == self.type:
                if self.is_decayed(food):
                    decayed_order_id.append(each_key)

        if decayed_order_id:
            logger.info("found some decayed food. throwing them away!")
            db.delete_order(decayed_order_id)
            return True
        else:
            return False


class HotShelf(Shelf):
    def __init__(self):
        self.shelfDecayModifier = 1
        self.type = "hot"
        Shelf.__init__(self, 10, 1, 'hot')


class ColdShelf(Shelf):
    def __init__(self):
        Shelf.__init__(self, 10, 1, 'cold')


class FrozenShelf(Shelf):
    def __init__(self):
        Shelf.__init__(self, 10, 1, 'frozen')


class OverflowShelf(Shelf):
    def __init__(self):
        Shelf.__init__(self, 15, 2, 'overflow')

    def move_order(self, order_id, idx):
        """
        For overflow shelf moving an order means trashing (del entry) it
        """
        db.delete_order([order_id])


