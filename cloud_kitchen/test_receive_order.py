import unittest

from db import db
from receive_order import ReceiveOrder


class TestDb(unittest.TestCase):
    def setUp(self):
        self.ingest_file = "./test_orders.json"
        self.db = db

    def tearDown(self):
        self.db = {}

    def test_ingest_data(self):
        self.r_order = ReceiveOrder(self.ingest_file)

        self.r_order.ingest_data()
        self.assertEqual(self.r_order.data, [{'test_key':  'test_val'}])

    def test_ingest_data_negative(self):
        self.ingest_file = "./doesnotexist.json"
        self.r_order = ReceiveOrder(self.ingest_file)

        with self.assertRaises(Exception):
            self.r_order.ingest_data()

    def test_get_next_order(self):
        self.r_order = ReceiveOrder(self.ingest_file)
        self.r_order.data = [{"key": "val"}]
        self.assertEqual(self.r_order.get_next_order(), self.r_order.data)

