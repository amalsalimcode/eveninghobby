# Alert History and Customer Profiles API
The Alert History and Customer Profiles API is used to retrieve alert history information and for issuers using the VTC Alert Delivery Service to store cardholder contact information.

- API version: 1.0
- Package version: 1.0.0

For more information, please visit [https://developer.visa.com/](https://developer.visa.com/)

## Requirements.

Python 2.7 and 3.4+

## Installation & Usage
### pip install

To install by pip, execute the below command.

```sh
pip install -r requirements.txt
```
(you may need to run `pip` with root permission: `sudo pip install -r requirements.txt`)

Then import the package:
```python
from src.apis.customer_rules_alerts_api import CustomerRulesAlertsApi
```

### Setuptools

Install via [Setuptools](http://pypi.python.org/pypi/setuptools).

```sh
python setup.py install --user
```
(or `sudo python setup.py install` to install the package for all users)

Then import the package:
```python
from src.apis.customer_rules_alerts_api import CustomerRulesAlertsApi
```
## Tests
- Edit the file **globlaConfig.py** to set the fields shown below. Please refer the [Getting Started Guide](https://developer.visa.com/vdpguide#get-started-overview) to get the credentials.

```python
# For mutual auth
userName = 'your_username'
password = 'your_password'
certificatePath = '/absolute/path/to/cert.pem'
privateKeyPath = '/absolute/path/to/key_xxxx.pem'
caCertPath = '/absolute/path/to/cacert.pem'

# For MLE also set the following fields
mleKeyId = 'your_keyId'
encryptionPublicKeyPath = 'your_encryption_public_key_path'
self.decryptionPrivateKeyPath = 'your_decryption_private_key_path'

# For x-pay token
apiKey = 'your_apiKey'
sharedSecret = 'your_shared_secret'

# For Proxy
proxyUrl = 'proxy_url'

```
To run the unit tests:
- Note: The data in the unit tests are just placeholders. Please refer the [Create Project Guide](https://developer.visa.com/pages/working-with-visa-apis/create-project) to get the test data
```
nosetests --nocapture
```

## Getting Started

Please follow the [installation procedure](#installation--usage) and then run the following:

```python
from __future__ import print_function
import time
from src.apis.customer_rules_alerts_api import CustomerRulesAlertsApi
from src.configuration import Configuration

config = Configuration()
# Uncomment this block to enable proxy
# config.proxy_url = 'PROXY_URL'

# Configure HTTP basic authorization: basicAuth
config.username = 'YOUR_USERNAME'
config.password = 'YOUR_PASSWORD'
config.cert_file = 'ABSOLUTE_PATH_TO_CERT_FILE'
config.key_file = 'ABSOLUTE_PATH_TO_KEY_FILE'
config.ssl_ca_cert = 'ABSOLUTE_PATH_TO_CA_CERT_FILE'

# Unblock this block to configure MLE credentials
# config.api_key['keyId'] = 'YOUR_KEY_ID'
# config.encryption_public_key_path = 'ABSOLUTE_PATH_TO_MLE_CERT_FILE'
# config.decryption_private_key_path = 'ABSOLUTE_PATH_TO_MLE_KEY_FILE'

# create an instance of the API class
api_instance = CustomerRulesAlertsApi()

# Set all the required parameters in the deletemanage_alerts_preferences. Look at the documentation for further clarification.
user_identifier = 'user_identifier_example' # str | The user identifier of the customer profile document
manage_alerts_preferencesdelete_payload = src.ManageAlertsPreferencesdeletePayload() # ManageAlertsPreferencesdeletePayload | request
app_group_id = 'app_group_id_example' # str | Application Group ID assigned by VDP to uniquely identify a logical group of applications that manage transaction controls, if present appID should not be present (optional)
app_id = 'app_id_example' # str | Application ID assigned by VDP to uniquely identify an application that manages transaction controls, if present appGroupID should not be present (optional)
sponsor_id = 'sponsor_id_example' # str | Card Program Sponsor ID as configured in VTC, and supplied by VDP (optional)

try:
    api_response = api_instance.deletemanage_alerts_preferences(user_identifier, manage_alerts_preferencesdelete_payload, app_group_id=app_group_id, app_id=app_id, sponsor_id=sponsor_id)
    pprint(api_response)
except ApiException as e:
    print("Exception when calling CustomerRulesAlertsApi->deletemanage_alerts_preferences: %s\n" % e)
```

## Documentation for API Endpoints

All URIs are relative to *https://sandbox.api.visa.com*

Class | Method | HTTP request | Description
------------ | ------------- | ------------- | -------------
*CustomerRulesAlertsApi* | [**deletemanage_alerts_preferences**](docs/CustomerRulesAlertsApi.md#deletemanage_alerts_preferences) | **DELETE** /vctc/customerrules/v1/consumertransactioncontrols/customer/{userIdentifier}/alerts/preferences | 
*CustomerRulesAlertsApi* | [**get_get_notification_details**](docs/CustomerRulesAlertsApi.md#get_get_notification_details) | **GET** /vctc/customerrules/v1/consumertransactioncontrols/customer/notifications | 
*CustomerRulesAlertsApi* | [**getcustomer_alerts_profile**](docs/CustomerRulesAlertsApi.md#getcustomer_alerts_profile) | **GET** /vctc/customerrules/v1/consumertransactioncontrols/customer/{userIdentifier} | 
*CustomerRulesAlertsApi* | [**patchcustomer_alerts_profile**](docs/CustomerRulesAlertsApi.md#patchcustomer_alerts_profile) | **PATCH** /vctc/customerrules/v1/consumertransactioncontrols/customer/{userIdentifier} | 
*CustomerRulesAlertsApi* | [**post_get_notifications_summary_by_pan_or_token**](docs/CustomerRulesAlertsApi.md#post_get_notifications_summary_by_pan_or_token) | **POST** /vctc/customerrules/v1/consumertransactioncontrols/customer/notificationInquiry | 
*CustomerRulesAlertsApi* | [**postcreate_customer_alert_profile**](docs/CustomerRulesAlertsApi.md#postcreate_customer_alert_profile) | **POST** /vctc/customerrules/v1/consumertransactioncontrols/customer | 
*CustomerRulesAlertsApi* | [**postmanage_alerts_preferences**](docs/CustomerRulesAlertsApi.md#postmanage_alerts_preferences) | **POST** /vctc/customerrules/v1/consumertransactioncontrols/customer/{userIdentifier}/alerts/preferences | 
*CustomerRulesAlertsApi* | [**putmanage_alerts_preferences**](docs/CustomerRulesAlertsApi.md#putmanage_alerts_preferences) | **PUT** /vctc/customerrules/v1/consumertransactioncontrols/customer/{userIdentifier}/alerts/preferences | 


## Documentation For Models

 - [AlertPreferences](docs/AlertPreferences.md)
 - [AlertPreferencesInner](docs/AlertPreferencesInner.md)
 - [AlertsPreferences](docs/AlertsPreferences.md)
 - [CollectionResourceOfCustomerProfileDocument](docs/CollectionResourceOfCustomerProfileDocument.md)
 - [Contacts](docs/Contacts.md)
 - [ContactsInner](docs/ContactsInner.md)
 - [CreateCustomerAlertProfilepostPayload](docs/CreateCustomerAlertProfilepostPayload.md)
 - [CreateCustomerAlertProfilepostResponse](docs/CreateCustomerAlertProfilepostResponse.md)
 - [CustomerAlertsProfilegetResponse](docs/CustomerAlertsProfilegetResponse.md)
 - [CustomerAlertsProfilepatchPayload](docs/CustomerAlertsProfilepatchPayload.md)
 - [CustomerAlertsProfilepatchResponse](docs/CustomerAlertsProfilepatchResponse.md)
 - [CustomerProfileDocument](docs/CustomerProfileDocument.md)
 - [DefaultAlertsPreferences](docs/DefaultAlertsPreferences.md)
 - [GetNotificationDetailsgetResponse](docs/GetNotificationDetailsgetResponse.md)
 - [GetNotificationsSummaryByPanOrTokenpostPayload](docs/GetNotificationsSummaryByPanOrTokenpostPayload.md)
 - [GetNotificationsSummaryByPanOrTokenpostResponse](docs/GetNotificationsSummaryByPanOrTokenpostResponse.md)
 - [ManageAlertsPreferencesdeletePayload](docs/ManageAlertsPreferencesdeletePayload.md)
 - [ManageAlertsPreferencesdeleteResponse](docs/ManageAlertsPreferencesdeleteResponse.md)
 - [ManageAlertsPreferencespostPayload](docs/ManageAlertsPreferencespostPayload.md)
 - [ManageAlertsPreferencespostResponse](docs/ManageAlertsPreferencespostResponse.md)
 - [ManageAlertsPreferencesputPayload](docs/ManageAlertsPreferencesputPayload.md)
 - [ManageAlertsPreferencesputResponse](docs/ManageAlertsPreferencesputResponse.md)
 - [Pagination](docs/Pagination.md)
 - [Resource](docs/Resource.md)
 - [TimeRange](docs/TimeRange.md)



##Authors
**Visa Developer Platform**
See also the list of [contributors](https://github.com/visa/java-sample-code/graphs/contributors) who participated in this project.

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