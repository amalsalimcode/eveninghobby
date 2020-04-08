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


class GlobalControl(object):
    """
    NOTE: This class is auto generated by the swagger code generator program.
    Do not edit the class manually.
    """
    def __init__(self, time_range=None, should_alert_on_decline=None, alert_threshold=None, decline_threshold=None, spend_limit=None, should_decline_all=None, filter_by_country=None):
        """
        GlobalControl - a model defined in Swagger

        :param dict swaggerTypes: The key is attribute name
                                  and the value is attribute type.
        :param dict attributeMap: The key is attribute name
                                  and the value is json key in definition.
        """
        self.swagger_types = {
            'time_range': 'TimeRange',
            'should_alert_on_decline': 'bool',
            'alert_threshold': 'float',
            'decline_threshold': 'float',
            'spend_limit': 'SpendLimit',
            'should_decline_all': 'bool',
            'filter_by_country': 'FilterByCountry'
        }

        self.attribute_map = {
            'time_range': 'timeRange',
            'should_alert_on_decline': 'shouldAlertOnDecline',
            'alert_threshold': 'alertThreshold',
            'decline_threshold': 'declineThreshold',
            'spend_limit': 'spendLimit',
            'should_decline_all': 'shouldDeclineAll',
            'filter_by_country': 'filterByCountry'
        }

        self._time_range = time_range
        self._should_alert_on_decline = should_alert_on_decline
        self._alert_threshold = alert_threshold
        self._decline_threshold = decline_threshold
        self._spend_limit = spend_limit
        self._should_decline_all = should_decline_all
        self._filter_by_country = filter_by_country

    @property
    def time_range(self):
        """
        Gets the time_range of this GlobalControl.

        :return: The time_range of this GlobalControl.
        :rtype: TimeRange
        """
        return self._time_range

    @time_range.setter
    def time_range(self, time_range):
        """
        Sets the time_range of this GlobalControl.

        :param time_range: The time_range of this GlobalControl.
        :type: TimeRange
        """

        self._time_range = time_range

    @property
    def should_alert_on_decline(self):
        """
        Gets the should_alert_on_decline of this GlobalControl.
        If true, VTC will trigger a decline notification for all transactions matching the associated control type. If false, no alerts will be sent for declined transactions related to this control type.

        :return: The should_alert_on_decline of this GlobalControl.
        :rtype: bool
        """
        return self._should_alert_on_decline

    @should_alert_on_decline.setter
    def should_alert_on_decline(self, should_alert_on_decline):
        """
        Sets the should_alert_on_decline of this GlobalControl.
        If true, VTC will trigger a decline notification for all transactions matching the associated control type. If false, no alerts will be sent for declined transactions related to this control type.

        :param should_alert_on_decline: The should_alert_on_decline of this GlobalControl.
        :type: bool
        """

        self._should_alert_on_decline = should_alert_on_decline

    @property
    def alert_threshold(self):
        """
        Gets the alert_threshold of this GlobalControl.
        The maximum value of total approved purchases within the time period before triggering an alert. Once met or exceeded, any further purchases related to this control-type will not trigger another spendLimit alert until the next time period begins. However, any transactions that meet/exceed the per transaction alertThreshold will continue to trigger alerts.

        :return: The alert_threshold of this GlobalControl.
        :rtype: float
        """
        return self._alert_threshold

    @alert_threshold.setter
    def alert_threshold(self, alert_threshold):
        """
        Sets the alert_threshold of this GlobalControl.
        The maximum value of total approved purchases within the time period before triggering an alert. Once met or exceeded, any further purchases related to this control-type will not trigger another spendLimit alert until the next time period begins. However, any transactions that meet/exceed the per transaction alertThreshold will continue to trigger alerts.

        :param alert_threshold: The alert_threshold of this GlobalControl.
        :type: float
        """

        self._alert_threshold = alert_threshold

    @property
    def decline_threshold(self):
        """
        Gets the decline_threshold of this GlobalControl.
        The maximum accumulated spend for the time period at which VTC will then trigger declines. Once met or exceeded, all subsequent purchases related to the control will trigger a decline until the new time period begins (e.g. a new month.) If 'alertOnDecline' is true, then the cardholder will be notified of these transactions.

        :return: The decline_threshold of this GlobalControl.
        :rtype: float
        """
        return self._decline_threshold

    @decline_threshold.setter
    def decline_threshold(self, decline_threshold):
        """
        Sets the decline_threshold of this GlobalControl.
        The maximum accumulated spend for the time period at which VTC will then trigger declines. Once met or exceeded, all subsequent purchases related to the control will trigger a decline until the new time period begins (e.g. a new month.) If 'alertOnDecline' is true, then the cardholder will be notified of these transactions.

        :param decline_threshold: The decline_threshold of this GlobalControl.
        :type: float
        """

        self._decline_threshold = decline_threshold

    @property
    def spend_limit(self):
        """
        Gets the spend_limit of this GlobalControl.

        :return: The spend_limit of this GlobalControl.
        :rtype: SpendLimit
        """
        return self._spend_limit

    @spend_limit.setter
    def spend_limit(self, spend_limit):
        """
        Sets the spend_limit of this GlobalControl.

        :param spend_limit: The spend_limit of this GlobalControl.
        :type: SpendLimit
        """

        self._spend_limit = spend_limit

    @property
    def should_decline_all(self):
        """
        Gets the should_decline_all of this GlobalControl.
        If the indicator is set to true, all qualifying transactions for this control type will receive a decline recommendation. If set to false, other attributes like declineThreshold will be checked.

        :return: The should_decline_all of this GlobalControl.
        :rtype: bool
        """
        return self._should_decline_all

    @should_decline_all.setter
    def should_decline_all(self, should_decline_all):
        """
        Sets the should_decline_all of this GlobalControl.
        If the indicator is set to true, all qualifying transactions for this control type will receive a decline recommendation. If set to false, other attributes like declineThreshold will be checked.

        :param should_decline_all: The should_decline_all of this GlobalControl.
        :type: bool
        """
        if should_decline_all is None:
            raise ValueError("Invalid value for `should_decline_all`, must not be `None`")

        self._should_decline_all = should_decline_all

    @property
    def filter_by_country(self):
        """
        Gets the filter_by_country of this GlobalControl.

        :return: The filter_by_country of this GlobalControl.
        :rtype: FilterByCountry
        """
        return self._filter_by_country

    @filter_by_country.setter
    def filter_by_country(self, filter_by_country):
        """
        Sets the filter_by_country of this GlobalControl.

        :param filter_by_country: The filter_by_country of this GlobalControl.
        :type: FilterByCountry
        """

        self._filter_by_country = filter_by_country

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
        if not isinstance(other, GlobalControl):
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