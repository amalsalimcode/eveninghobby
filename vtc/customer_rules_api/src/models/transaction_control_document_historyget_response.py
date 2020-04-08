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


class TransactionControlDocumentHistorygetResponse(object):
    """
    NOTE: This class is auto generated by the swagger code generator program.
    Do not edit the class manually.
    """
    def __init__(self, processing_timein_ms=None, received_timestamp=None, resource=None):
        """
        TransactionControlDocumentHistorygetResponse - a model defined in Swagger

        :param dict swaggerTypes: The key is attribute name
                                  and the value is attribute type.
        :param dict attributeMap: The key is attribute name
                                  and the value is json key in definition.
        """
        self.swagger_types = {
            'processing_timein_ms': 'int',
            'received_timestamp': 'str',
            'resource': 'Resource'
        }

        self.attribute_map = {
            'processing_timein_ms': 'processingTimeinMs',
            'received_timestamp': 'receivedTimestamp',
            'resource': 'resource'
        }

        self._processing_timein_ms = processing_timein_ms
        self._received_timestamp = received_timestamp
        self._resource = resource

    @property
    def processing_timein_ms(self):
        """
        Gets the processing_timein_ms of this TransactionControlDocumentHistorygetResponse.
        The processing time in milliseconds

        :return: The processing_timein_ms of this TransactionControlDocumentHistorygetResponse.
        :rtype: int
        """
        return self._processing_timein_ms

    @processing_timein_ms.setter
    def processing_timein_ms(self, processing_timein_ms):
        """
        Sets the processing_timein_ms of this TransactionControlDocumentHistorygetResponse.
        The processing time in milliseconds

        :param processing_timein_ms: The processing_timein_ms of this TransactionControlDocumentHistorygetResponse.
        :type: int
        """
        if processing_timein_ms is None:
            raise ValueError("Invalid value for `processing_timein_ms`, must not be `None`")

        self._processing_timein_ms = processing_timein_ms

    @property
    def received_timestamp(self):
        """
        Gets the received_timestamp of this TransactionControlDocumentHistorygetResponse.
        The time the request is received.  Value is in GMT time

        :return: The received_timestamp of this TransactionControlDocumentHistorygetResponse.
        :rtype: str
        """
        return self._received_timestamp

    @received_timestamp.setter
    def received_timestamp(self, received_timestamp):
        """
        Sets the received_timestamp of this TransactionControlDocumentHistorygetResponse.
        The time the request is received.  Value is in GMT time

        :param received_timestamp: The received_timestamp of this TransactionControlDocumentHistorygetResponse.
        :type: str
        """
        if received_timestamp is None:
            raise ValueError("Invalid value for `received_timestamp`, must not be `None`")

        self._received_timestamp = received_timestamp

    @property
    def resource(self):
        """
        Gets the resource of this TransactionControlDocumentHistorygetResponse.

        :return: The resource of this TransactionControlDocumentHistorygetResponse.
        :rtype: Resource
        """
        return self._resource

    @resource.setter
    def resource(self, resource):
        """
        Sets the resource of this TransactionControlDocumentHistorygetResponse.

        :param resource: The resource of this TransactionControlDocumentHistorygetResponse.
        :type: Resource
        """
        if resource is None:
            raise ValueError("Invalid value for `resource`, must not be `None`")

        self._resource = resource

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
        if not isinstance(other, TransactionControlDocumentHistorygetResponse):
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