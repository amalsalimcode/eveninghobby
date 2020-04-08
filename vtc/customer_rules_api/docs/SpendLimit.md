# SpendLimit

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**time_zone_id** | **str** | The timeZoneID is used to determine the next currentPeriodEndTime based on spendLimitType. It should be in Continent/Region format. For example: &#39;America/Denver&#39; is in United States MST. | 
**type** | **str** | Provides the time period that the control spans.Valid values include: LMT_MONTH, LMT_WEEK, LMT_DAY. | 
**alert_threshold** | **float** | The maximum value of total approved purchases within the time period before triggering an alert. Once met or exceeded, any further purchases related to this control-type will not trigger another spendLimit alert until the next time period begins. However, any transaction that meet/exceed the per transaction alertThreshold will continue to trigger alerts. | [optional] 
**current_period_spend** | **float** | The total amount of all approved transactions performed within the time period for this control type. It is reset by the amount of the first transaction for this control type once a new time period begins. | 
**decline_threshold** | **float** | The maximum accumulated spend for the time period at which VTC will then trigger declines. Once met or exceeded, all subsequent purchases related to the control will trigger a decline until the new time period begins (e.g. a new month.) If &#39;alertOnDecline&#39; is true, then the cardholder will be notified of these transactions. | 

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