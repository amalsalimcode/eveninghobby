import time
import unittest

import db
from unittest.mock import MagicMock, patch

from shelf import Shelf


class TestShelf(unittest.TestCase):

    def setUp(self):
        db.processing_orders = {}

    def test_insert_overflow(self):
        # ensure that when inserting item at max, existing item goes to
        # overflow and new item goes to 'test' shelf
        self.shelf = Shelf(0, 1, 'test')
        with patch.object(db.ProcessingOrders, 'create_order', return_value=None) as mock_method:
            with patch.object(db.ProcessingOrders, 'update_order', return_value=True) as mock_method2:
                self.shelf.insert_item({"id": "test_food", "shelf": "test"})
                self.assertEqual(mock_method.call_args_list[0][0][0]['shelf'], 'test')
                self.assertEqual(mock_method2.call_args_list[0][0][2], 'overflow')

    def test_decay_time_decayed(self):
        # a very low shelflife means, the food is pretty much decayed
        food = {"shelfLife": 0.001, "decayRate": 1, "insert_time": 0}
        self.shelf = Shelf(0, 1, 'test')
        self.assertTrue(self.shelf.is_decayed(food))

    def test_decay_time_fresh(self):
        # a very low shelflife means, the food is pretty much decayed
        food = {"shelfLife": 100, "decayRate": 0.001, "insert_time": time.time()}
        self.shelf = Shelf(0, 1, 'test')
        self.assertFalse(self.shelf.is_decayed(food))


if __name__ == '__main__':
    unittest.main()
