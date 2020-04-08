# CreateCustomerAlertProfilepostPayload

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**country_code** | **str** | Three letter ISO ALPHA-3 Code. Required if participating in VTC Alert Delivery Service. | [optional] 
**first_name** | **str** | First name of the cardholder, Maximum of 25 characters. | 
**preferred_language** | **str** | Preferred language for last mile alerts. Currently supported languages are &#39;en-us&#39; (English US) and &#39;es-us&#39;(Spanish US). Required if participating in VTC Alert Delivery Service. | [optional] 
**last_name** | **str** | Last name of the cardholder, Maximum of 25 characters. | 
**default_alerts_preferences** | [**DefaultAlertsPreferences**](DefaultAlertsPreferences.md) |  | 
**primary_account_number** | **str** | Primary account number passed in the request for registration. | [optional] 
**payment_token** | **str** | Payment token passed in the request for registration. | [optional] 
**user_identifier** | **str** | Assigned by the enrolling application to uniquely identify a specific Customer. Ideally a GUID, the userIdentifier must not contain any PII data. Maximum of 72 characters. | 

[Back to Model list](../README.md#documentation-for-models)   |   [Back to API list](../README.md#documentation-for-api-endpoints)   |   [Back to README](../README.md)



##License
**© Copyright 2018 Visa. All Rights Reserved.**

*NOTICE: The software and accompanying information and documentation (together, the “Software”) remain the property of
and are proprietary to Visa and its suppliers and affiliates. The Software remains protected by intellectual property
rights and may be covered by U.S. and foreign patents or patent applications. The Software is licensed and not sold.*

*By accessing the Software you are agreeing to Visa's terms of use (developer.visa.com/terms) and privacy policy (developer.visa.com/privacy).
In addition, all permissible uses of the Software must be in support of Visa products, programs and services provided
through the Visa Developer Program (VDP) platform only (developer.visa.com). **THE SOFTWARE AND ANY ASSOCIATED
INFORMATION OR DOCUMENTATION IS PROVIDED ON AN “AS IS,” “AS AVAILABLE,” “WITH ALL FAULTS” BASIS WITHOUT WARRANTY OR
CONDITION OF ANY KIND. YOUR USE IS AT YOUR OWN RISK.** All brand names are the property of their respective owners, used for identification purposes only, and do not imply
product endorsement or affiliation with Visa. Any links to third party sites are for your information only and equally
do not constitute a Visa endorsement. Visa has no insight into and control over third party content and code and disclaims
all liability for any such components, including continued availability and functionality. Benefits depend on implementation
details and business factors and coding steps shown are exemplary only and do not reflect all necessary elements for the
described capabilities. Capabilities and features are subject to Visa’s terms and conditions and may require development,
implementation and resources by you based on your business and operational details. Please refer to the specific
API documentation for details on the requirements, eligibility and geographic availability.*

*This Software includes programs, concepts and details under continuing development by Visa. Any Visa features,
functionality, implementation, branding, and schedules may be amended, updated or canceled at Visa’s discretion.
The timing of widespread availability of programs and functionality is also subject to a number of factors outside Visa’s control,
including but not limited to deployment of necessary infrastructure by issuers, acquirers, merchants and mobile device manufacturers.*