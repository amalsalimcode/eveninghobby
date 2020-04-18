import unittest

from db import db, ProcessingOrders


class TestDb(unittest.TestCase):
    def setUp(self):
        self.db = db

    def tearDown(self):
        self.db.processing_orders = {}

    def test_singleton(self):
        self.assertRaises(Exception, ProcessingOrders)

    def test_add_entry(self):
        item = {"id": "order_id", "test_key": "test_key_val"}
        self.db.create_order(item)
        self.assertEqual(self.db.processing_orders["order_id"], item)

    def test_add_entry_negative(self):
        item = {"test_key": "test_key_val_neg"}
        with self.assertRaises(KeyError):
            self.db.create_order(item)

    def test_remove_entry(self):
        order = {'test_val': {'id': 'test_val', 'test_key': 'test_key_val_rem'}}
        self.db.processing_orders = order
        self.db.delete_order(['test_val'])
        self.assertEqual(self.db.processing_orders, {})

    def test_remove_entry_negative(self):
        with self.assertRaises(Exception):
            self.db.delete_order(['invalid_key'])


if __name__ == '__main__':
    unittest.main()
