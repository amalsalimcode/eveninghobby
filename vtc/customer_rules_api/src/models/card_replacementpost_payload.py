# coding: utf-8

"""
    Customer Rules API

    The Customer Rules API enables consumers to establish control rules that will define the type of transactions they want to Manage.

    OpenAPI spec version: v1
    Contact: 
    Generated by: https://github.com/swagger-api/swagger-codegen.git
"""


from pprint import pformat
from six import iteritems
import re


class CardReplacementpostPayload(object):
    """
    NOTE: This class is auto generated by the swagger code generator program.
    Do not edit the class manually.
    """
    def __init__(self, new_account_id=None, current_account_id=None):
        """
        CardReplacementpostPayload - a model defined in Swagger

        :param dict swaggerTypes: The key is attribute name
                                  and the value is attribute type.
        :param dict attributeMap: The key is attribute name
                                  and the value is json key in definition.
        """
        self.swagger_types = {
            'new_account_id': 'str',
            'current_account_id': 'str'
        }

        self.attribute_map = {
            'new_account_id': 'newAccountID',
            'current_account_id': 'currentAccountID'
        }

        self._new_account_id = new_account_id
        self._current_account_id = current_account_id

    @property
    def new_account_id(self):
        """
        Gets the new_account_id of this CardReplacementpostPayload.
        The new account id must be between 16 and 19 digits

        :return: The new_account_id of this CardReplacementpostPayload.
        :rtype: str
        """
        return self._new_account_id

    @new_account_id.setter
    def new_account_id(self, new_account_id):
        """
        Sets the new_account_id of this CardReplacementpostPayload.
        The new account id must be between 16 and 19 digits

        :param new_account_id: The new_account_id of this CardReplacementpostPayload.
        :type: str
        """
        if new_account_id is None:
            raise ValueError("Invalid value for `new_account_id`, must not be `None`")

        self._new_account_id = new_account_id

    @property
    def current_account_id(self):
        """
        Gets the current_account_id of this CardReplacementpostPayload.
        The current account id must be between 16 and 19 digits

        :return: The current_account_id of this CardReplacementpostPayload.
        :rtype: str
        """
        return self._current_account_id

    @current_account_id.setter
    def current_account_id(self, current_account_id):
        """
        Sets the current_account_id of this CardReplacementpostPayload.
        The current account id must be between 16 and 19 digits

        :param current_account_id: The current_account_id of this CardReplacementpostPayload.
        :type: str
        """
        if current_account_id is None:
            raise ValueError("Invalid value for `current_account_id`, must not be `None`")

        self._current_account_id = current_account_id

    def to_dict(self):
        """
        Returns the model properties as a dict
        """
        result = {}

        for attr, _ in iteritems(self.swagger_types):
            value = getattr(self, attr)
            if isinstance(value, list):
                result[attr] = list(map(
                    lambda x: x.to_dict() if hasattr(x, "to_dict") else x,
                    value
                ))
            elif hasattr(value, "to_dict"):
                result[attr] = value.to_dict()
            elif isinstance(value, dict):
                result[attr] = dict(map(
                    lambda item: (item[0], item[1].to_dict())
                    if hasattr(item[1], "to_dict") else item,
                    value.items()
                ))
            else:
                result[attr] = value

        return result

    def to_str(self):
        """
        Returns the string representation of the model
        """
        return pformat(self.to_dict())

    def __repr__(self):
        """
        For `print` and `pprint`
        """
        return self.to_str()

    def __eq__(self, other):
        """
        Returns true if both objects are equal
        """
        if not isinstance(other, CardReplacementpostPayload):
            return False

        return self.__dict__ == other.__dict__

    def __ne__(self, other):
        """
        Returns true if both objects are not equal
        """
        return not self == other

# ----------------------------------------------------------------------------------------------------------------------
# © Copyright 2018 Visa. All Rights Reserved.
#
# NOTICE: The software and accompanying information and documentation (together, the “Software”) remain the property of
# and are proprietary to Visa and its suppliers and affiliates. The Software remains protected by intellectual property
# rights and may be covered by U.S. and foreign patents or patent applications. The Software is licensed and not sold.
#
# By accessing the Software you are agreeing to Visa's terms of use (developer.visa.com/terms) and privacy policy
# (developer.visa.com/privacy). In addition, all permissible uses of the Software must be in support of Visa products,
# programs and services provided through the Visa Developer Program (VDP) platform only (developer.visa.com).
# THE SOFTWARE AND ANY ASSOCIATED INFORMATION OR DOCUMENTATION IS PROVIDED ON AN “AS IS,” “AS AVAILABLE,” “WITH ALL
# FAULTS” BASIS WITHOUT WARRANTY OR CONDITION OF ANY KIND. YOUR USE IS AT YOUR OWN RISK.
# ----------------------------------------------------------------------------------------------------------------------