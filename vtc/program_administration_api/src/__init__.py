# coding: utf-8

"""
    Program Administration API

    The Transaction Controls Program Administration API enables Issuers to change program configurations for their sponsorID.

    OpenAPI spec version: v1
    Contact: 
    Generated by: https://github.com/swagger-api/swagger-codegen.git
"""


from __future__ import absolute_import

# import models into sdk package
from .models.card_enrollment_callback_settings import CardEnrollmentCallbackSettings
from .models.manage_rule_configurationdelete_payload import ManageRuleConfigurationdeletePayload
from .models.manage_rule_configurationdelete_response import ManageRuleConfigurationdeleteResponse
from .models.manage_rule_configurationget_response import ManageRuleConfigurationgetResponse
from .models.manage_rule_configurationpost_payload import ManageRuleConfigurationpostPayload
from .models.manage_rule_configurationpost_response import ManageRuleConfigurationpostResponse
from .models.manage_rule_configurationput_payload import ManageRuleConfigurationputPayload
from .models.manage_rule_configurationput_response import ManageRuleConfigurationputResponse
from .models.manage_transaction_controlsdelete_payload import ManageTransactionControlsdeletePayload
from .models.manage_transaction_controlsdelete_response import ManageTransactionControlsdeleteResponse
from .models.manage_transaction_controlsget_response import ManageTransactionControlsgetResponse
from .models.manage_transaction_controlspost_payload import ManageTransactionControlspostPayload
from .models.manage_transaction_controlspost_response import ManageTransactionControlspostResponse
from .models.manage_transaction_controlsput_payload import ManageTransactionControlsputPayload
from .models.manage_transaction_controlsput_response import ManageTransactionControlsputResponse
from .models.resource import Resource

# import apis into sdk package
from .apis.prog_admin_api import ProgAdminApi

# import ApiClient
from .api_client import ApiClient

from .configuration import Configuration

configuration = Configuration()

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