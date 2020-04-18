import logging

logger = logging.getLogger(__name__)


class ProcessingOrders:
    """
    This is the main class that holds the data.
    The data here means all orders which are received by the system
    The data entry remains until it has been picked up by a courier,
    or the entry is considered decayed
    """
    __instance = None

    @staticmethod
    def getInstance():
        if ProcessingOrders.__instance is None:
            ProcessingOrders()
        return ProcessingOrders.__instance

    def __init__(self):
        if ProcessingOrders.__instance is not None:
            raise Exception("This class is a singleton!")
        else:
            ProcessingOrders.__instance = self
        self.processing_orders = {}

    def get_orders_in_process(self):
        return self.processing_orders.keys()

    def delete_order(self, order_id):
        for each_id in order_id:
            logger.info("removing the following food items completely! {}"
                        .format(each_id))
            self.processing_orders.pop(each_id, None)

        logger.info("Current Shelf contents: {}".format(self.get_orders_in_process() or
                                                        "empty and awaiting new order"))

    def create_order(self, data):
        self.processing_orders[data["id"]] = data

    def update_order(self, order_id, key, value):
        self.processing_orders[order_id][key] = value

    def get_processing_data(self, order_id):
        return self.processing_orders[order_id]


db = ProcessingOrders()
