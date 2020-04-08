# coding: utf-8

"""
    Authorization API

    The Authorization Decision API enables an authorization processor to request an authorization decision recommendation based on cardholder rules configured in consumer transaction controls.  In addition, the API enables the authorization processor to update an authorization decision with the actual decision that was rendered. 

    OpenAPI spec version: v1
    Contact: 
    Generated by: https://github.com/swagger-api/swagger-codegen.git
"""


from pprint import pformat
from six import iteritems
import re


class PaginationData(object):
    """
    NOTE: This class is auto generated by the swagger code generator program.
    Do not edit the class manually.
    """
    def __init__(self, start_index=None, page_limit=None):
        """
        PaginationData - a model defined in Swagger

        :param dict swaggerTypes: The key is attribute name
                                  and the value is attribute type.
        :param dict attributeMap: The key is attribute name
                                  and the value is json key in definition.
        """
        self.swagger_types = {
            'start_index': 'str',
            'page_limit': 'str'
        }

        self.attribute_map = {
            'start_index': 'startIndex',
            'page_limit': 'pageLimit'
        }

        self._start_index = start_index
        self._page_limit = page_limit

    @property
    def start_index(self):
        """
        Gets the start_index of this PaginationData.
        Page start location - must be numeric, max of 9 digits

        :return: The start_index of this PaginationData.
        :rtype: str
        """
        return self._start_index

    @start_index.setter
    def start_index(self, start_index):
        """
        Sets the start_index of this PaginationData.
        Page start location - must be numeric, max of 9 digits

        :param start_index: The start_index of this PaginationData.
        :type: str
        """
        if start_index is None:
            raise ValueError("Invalid value for `start_index`, must not be `None`")

        self._start_index = start_index

    @property
    def page_limit(self):
        """
        Gets the page_limit of this PaginationData.
        Page size - must be numeric, between 1 to 50

        :return: The page_limit of this PaginationData.
        :rtype: str
        """
        return self._page_limit

    @page_limit.setter
    def page_limit(self, page_limit):
        """
        Sets the page_limit of this PaginationData.
        Page size - must be numeric, between 1 to 50

        :param page_limit: The page_limit of this PaginationData.
        :type: str
        """
        if page_limit is None:
            raise ValueError("Invalid value for `page_limit`, must not be `None`")

        self._page_limit = page_limit

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
        if not isinstance(other, PaginationData):
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