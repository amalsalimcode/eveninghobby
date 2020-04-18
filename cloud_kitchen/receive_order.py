import json
import logging
import time

logger = logging.getLogger(__name__)


class ReceiveOrder:
    """
    Ingest data from external source (currently JSON file) and then
    process them at a variable rate (currently 2req per 2sec)
    """
    def __init__(self, file_path):

        # count on how many orders were processed
        self.processed_order_idx = 0
        # wait time before getting the next order
        self.request_wait_time = 2
        # number of orders that can be processed per request
        self.batch_count = 2
        # contents of the file after ingestion are saved here
        self.data = []
        self.file_path = file_path

    def ingest_data(self):
        logger.info("Ingesting order data from source")
        self.data = json.loads(open(self.file_path, "r").read())

    def get_next_order(self):
        if not self.more_orders_to_process():
            logger.info("All orders have been processed")
            return False

        idx = self.processed_order_idx
        self.processed_order_idx += self.batch_count

        new_data = self.data[idx: idx + self.batch_count]
        time.sleep(self.request_wait_time)
        if new_data:
            logger.info("I received new orders! {}".format(new_data))
        return new_data

    def more_orders_to_process(self):
        return self.processed_order_idx < len(self.data)

