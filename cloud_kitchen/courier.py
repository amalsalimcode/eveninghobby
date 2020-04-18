import logging
import random
import time
from db import db

logger = logging.getLogger(__name__)


class Courier:

    def __init__(self):
        self.min_wait = 2
        self.max_wait = 6

    @staticmethod
    def process_ready_courier():
        """
        Check to see what couriers have completed their wait_time
        The couriers who have arrived (wait_time == 0), can now
        remove the entry from the shelf forever
        """

        curr_time = int(time.time())
        del_courier_id = []
        ready_courier = []

        # retrieve all orders that are awaiting in shelves
        # It is faster to look at orders than courier, since orders are hashed
        order_id = db.get_orders_in_process()
        for each_id in order_id:
            food_item = db.get_processing_data(each_id)
            # check if the courier has arrived for the food_item
            # and if so process them for removal from shelf
            if curr_time >= food_item["courier_wait_time"]:
                ready_courier.append(food_item)
                del_courier_id.append(each_id)

        # delete food entries that are on shelf, and the courier is ready
        db.delete_order(del_courier_id)

        return ready_courier

    def generate_new_courier(self, order_id):
        """
        Responsible for the following
        1. Generate a new courier for the order
        2. Generate a wait time for the same courier
        3. Link the courier to the food so that the courier knows
           which item to pickup
        """
        courier_wait_delta = random.randint(self.min_wait, self.max_wait)
        courier_wait_time = int(time.time()) + courier_wait_delta
        logger.info("created a courier request for order id {}."
                    "wait time for courier: {}".format(order_id, courier_wait_time))
        db.update_order(order_id, "courier_wait_time", courier_wait_time)
