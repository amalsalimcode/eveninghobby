import unittest

import db
from courier import Courier
from unittest.mock import MagicMock, patch


class MyTestCase(unittest.TestCase):

    def setUp(self):
        self.courier = Courier()

    def test_process_ready_courier(self):
        self.assertEqual(self.courier.process_ready_courier(), [])

    def test_generate_new_courier(self):
        with patch.object(db.ProcessingOrders, 'update_order', return_value=None) as mock_method:
            order_id = '1234'
            self.courier.generate_new_courier(order_id)
            self.assertEqual(mock_method.call_args_list[0][0][0], order_id)
            # check type of wait_time
            self.assertTrue(isinstance(mock_method.call_args_list[0][0][2], int))


if __name__ == '__main__':
    unittest.main()
