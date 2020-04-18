#!/usr/bin/env python
import logging
import threading
import time

from courier import Courier
from receive_order import ReceiveOrder
from shelf import HotShelf, ColdShelf, FrozenShelf, OverflowShelf

logger = logging.getLogger(__name__)


def thread_process_order():
    """
    Responsible for the following
    1. Retrieve new set of food orders. Currently at 2req/sec
    2. Place the item in the appropriate shelf once the order is received
    """

    # shelf map doesn't contain overflow, since overflow
    # is used by any of the following three once its full
    shelf_map = {"frozen": FrozenShelf(),
                 "cold": ColdShelf(),
                 "hot": HotShelf()}

    while True:
        # retrieve orders
        nxt_order = r_order.get_next_order()
        if nxt_order is False:
            logger.info("We are done processing the incoming file!")
            return

        for order in nxt_order:
            # insert the food in appropriate shelf
            shelf_map[order["temp"]].insert_item(order)
            # signal a courier to come and pick up food
            courier.generate_new_courier(order["id"])


def thread_courier_process():
    """
    Responsible for the following
    1. Check to see if we have more incoming orders
    2. Monitor the couriers to see if any are have reached.
       If so, complete the order
    """

    while r_order.more_orders_to_process():
        courier.process_ready_courier()
        time.sleep(1)


if __name__ == "__main__":

    logging.basicConfig(format='%(asctime)s,%(msecs)d %(levelname)-8s [%(filename)s:%(lineno)d] %(message)s',
                        datefmt='%Y-%m-%d:%H:%M:%S',
                        level=logging.DEBUG)

    r_order = ReceiveOrder("./orders.json")
    r_order.ingest_data()

    courier = Courier()

    threading.Thread(target=thread_process_order).start()
    threading.Thread(target=thread_courier_process).start()

