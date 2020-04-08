# Alert History and Customer Profiles API
The Alert History and Customer Profiles API is used to retrieve alert history information and for issuers using the VTC Alert Delivery Service to store cardholder contact information.

All URIs are relative to *https://sandbox.api.visa.com*

Method | HTTP request | Description
------------- | ------------- | -------------
[**deletemanage_alerts_preferences**](CustomerRulesAlertsApi.md#deletemanage_alerts_preferences) | **DELETE** /vctc/customerrules/v1/consumertransactioncontrols/customer/{userIdentifier}/alerts/preferences | 
[**get_get_notification_details**](CustomerRulesAlertsApi.md#get_get_notification_details) | **GET** /vctc/customerrules/v1/consumertransactioncontrols/customer/notifications | 
[**getcustomer_alerts_profile**](CustomerRulesAlertsApi.md#getcustomer_alerts_profile) | **GET** /vctc/customerrules/v1/consumertransactioncontrols/customer/{userIdentifier} | 
[**patchcustomer_alerts_profile**](CustomerRulesAlertsApi.md#patchcustomer_alerts_profile) | **PATCH** /vctc/customerrules/v1/consumertransactioncontrols/customer/{userIdentifier} | 
[**post_get_notifications_summary_by_pan_or_token**](CustomerRulesAlertsApi.md#post_get_notifications_summary_by_pan_or_token) | **POST** /vctc/customerrules/v1/consumertransactioncontrols/customer/notificationInquiry | 
[**postcreate_customer_alert_profile**](CustomerRulesAlertsApi.md#postcreate_customer_alert_profile) | **POST** /vctc/customerrules/v1/consumertransactioncontrols/customer | 
[**postmanage_alerts_preferences**](CustomerRulesAlertsApi.md#postmanage_alerts_preferences) | **POST** /vctc/customerrules/v1/consumertransactioncontrols/customer/{userIdentifier}/alerts/preferences | 
[**putmanage_alerts_preferences**](CustomerRulesAlertsApi.md#putmanage_alerts_preferences) | **PUT** /vctc/customerrules/v1/consumertransactioncontrols/customer/{userIdentifier}/alerts/preferences | 


# **deletemanage_alerts_preferences**
> ManageAlertsPreferencesdeleteResponse deletemanage_alerts_preferences(user_identifier, manage_alerts_preferencesdelete_payload, app_group_id=app_group_id, app_id=app_id, sponsor_id=sponsor_id)



Delete Existing Notification Preferences for given Customer

### Example 
```python
from __future__ import print_statement
import time
from src.apis.customer_rules_alerts_api import CustomerRulesAlertsApi
from src.configuration import Configuration
from pprint import pprint

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

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **user_identifier** | **str**| The user identifier of the customer profile document | 
 **manage_alerts_preferencesdelete_payload** | [**ManageAlertsPreferencesdeletePayload**](ManageAlertsPreferencesdeletePayload.md)| request | 
 **app_group_id** | **str**| Application Group ID assigned by VDP to uniquely identify a logical group of applications that manage transaction controls, if present appID should not be present | [optional] 
 **app_id** | **str**| Application ID assigned by VDP to uniquely identify an application that manages transaction controls, if present appGroupID should not be present | [optional] 
 **sponsor_id** | **str**| Card Program Sponsor ID as configured in VTC, and supplied by VDP | [optional] 

### Return type

[**ManageAlertsPreferencesdeleteResponse**](ManageAlertsPreferencesdeleteResponse.md)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[Back to top](#)   |   [Back to API list](../README.md#documentation-for-api-endpoints)   |   [Back to Model list](../README.md#documentation-for-models)   |   [Back to README](../README.md)

# **get_get_notification_details**
> GetNotificationDetailsgetResponse get_get_notification_details(limit, page, decision_id=decision_id, document_id=document_id, notification_id=notification_id, user_identifier=user_identifier, app_group_id=app_group_id, app_id=app_id, sponsor_id=sponsor_id)



Get notification details by documentID, decisionID, or userIdentifier. Note, only one parameter may be passed per request.

### Example 
```python
from __future__ import print_statement
import time
from src.apis.customer_rules_alerts_api import CustomerRulesAlertsApi
from src.configuration import Configuration
from pprint import pprint

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

# Set all the required parameters in the get_get_notification_details. Look at the documentation for further clarification.
limit = 'limit_example' # str | Page size to be returned
page = 'page_example' # str | Page number to be returned
decision_id = 'decision_id_example' # str | Decision ID to search for (optional)
document_id = 'document_id_example' # str | Control document ID to search for (optional)
notification_id = 'notification_id_example' # str | Notification ID to search for (optional)
user_identifier = 'user_identifier_example' # str | User identifier to search for (optional)
app_group_id = 'app_group_id_example' # str | Application Group ID assigned by VDP to uniquely identify a logical group of applications that manage transaction controls, if present appID should not be present (optional)
app_id = 'app_id_example' # str | Application ID assigned by VDP to uniquely identify an application that manages transaction controls, if present appGroupID should not be present (optional)
sponsor_id = 'sponsor_id_example' # str | Card Program Sponsor ID as configured in VTC, and supplied by VDP (optional)

try: 
    api_response = api_instance.get_get_notification_details(limit, page, decision_id=decision_id, document_id=document_id, notification_id=notification_id, user_identifier=user_identifier, app_group_id=app_group_id, app_id=app_id, sponsor_id=sponsor_id)
    pprint(api_response)
except ApiException as e:
    print("Exception when calling CustomerRulesAlertsApi->get_get_notification_details: %s\n" % e)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **limit** | **str**| Page size to be returned | 
 **page** | **str**| Page number to be returned | 
 **decision_id** | **str**| Decision ID to search for | [optional] 
 **document_id** | **str**| Control document ID to search for | [optional] 
 **notification_id** | **str**| Notification ID to search for | [optional] 
 **user_identifier** | **str**| User identifier to search for | [optional] 
 **app_group_id** | **str**| Application Group ID assigned by VDP to uniquely identify a logical group of applications that manage transaction controls, if present appID should not be present | [optional] 
 **app_id** | **str**| Application ID assigned by VDP to uniquely identify an application that manages transaction controls, if present appGroupID should not be present | [optional] 
 **sponsor_id** | **str**| Card Program Sponsor ID as configured in VTC, and supplied by VDP | [optional] 

### Return type

[**GetNotificationDetailsgetResponse**](GetNotificationDetailsgetResponse.md)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[Back to top](#)   |   [Back to API list](../README.md#documentation-for-api-endpoints)   |   [Back to Model list](../README.md#documentation-for-models)   |   [Back to README](../README.md)

# **getcustomer_alerts_profile**
> CustomerAlertsProfilegetResponse getcustomer_alerts_profile(user_identifier, app_group_id=app_group_id, app_id=app_id, sponsor_id=sponsor_id)



Get Customer Profile by userIdentifier

### Example 
```python
from __future__ import print_statement
import time
from src.apis.customer_rules_alerts_api import CustomerRulesAlertsApi
from src.configuration import Configuration
from pprint import pprint

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

# Set all the required parameters in the getcustomer_alerts_profile. Look at the documentation for further clarification.
user_identifier = 'user_identifier_example' # str | The user identifier of the customer profile document
app_group_id = 'app_group_id_example' # str | Application Group ID assigned by VDP to uniquely identify a logical group of applications that manage transaction controls, if present appID should not be present (optional)
app_id = 'app_id_example' # str | Application ID assigned by VDP to uniquely identify an application that manages transaction controls, if present appGroupID should not be present (optional)
sponsor_id = 'sponsor_id_example' # str | Card Program Sponsor ID as configured in VTC, and supplied by VDP (optional)

try: 
    api_response = api_instance.getcustomer_alerts_profile(user_identifier, app_group_id=app_group_id, app_id=app_id, sponsor_id=sponsor_id)
    pprint(api_response)
except ApiException as e:
    print("Exception when calling CustomerRulesAlertsApi->getcustomer_alerts_profile: %s\n" % e)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **user_identifier** | **str**| The user identifier of the customer profile document | 
 **app_group_id** | **str**| Application Group ID assigned by VDP to uniquely identify a logical group of applications that manage transaction controls, if present appID should not be present | [optional] 
 **app_id** | **str**| Application ID assigned by VDP to uniquely identify an application that manages transaction controls, if present appGroupID should not be present | [optional] 
 **sponsor_id** | **str**| Card Program Sponsor ID as configured in VTC, and supplied by VDP | [optional] 

### Return type

[**CustomerAlertsProfilegetResponse**](CustomerAlertsProfilegetResponse.md)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[Back to top](#)   |   [Back to API list](../README.md#documentation-for-api-endpoints)   |   [Back to Model list](../README.md#documentation-for-models)   |   [Back to README](../README.md)

# **patchcustomer_alerts_profile**
> CustomerAlertsProfilepatchResponse patchcustomer_alerts_profile(user_identifier, customer_alerts_profilepatch_payload, app_group_id=app_group_id, app_id=app_id, sponsor_id=sponsor_id)



Update Customer Profile by userIdentifier

### Example 
```python
from __future__ import print_statement
import time
from src.apis.customer_rules_alerts_api import CustomerRulesAlertsApi
from src.configuration import Configuration
from pprint import pprint

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

# Set all the required parameters in the patchcustomer_alerts_profile. Look at the documentation for further clarification.
user_identifier = 'user_identifier_example' # str | The user identifier of the customer profile document
customer_alerts_profilepatch_payload = src.CustomerAlertsProfilepatchPayload() # CustomerAlertsProfilepatchPayload | request
app_group_id = 'app_group_id_example' # str | Application Group ID assigned by VDP to uniquely identify a logical group of applications that manage transaction controls, if present appID should not be present (optional)
app_id = 'app_id_example' # str | Application ID assigned by VDP to uniquely identify an application that manages transaction controls, if present appGroupID should not be present (optional)
sponsor_id = 'sponsor_id_example' # str | Card Program Sponsor ID as configured in VTC, and supplied by VDP (optional)

try: 
    api_response = api_instance.patchcustomer_alerts_profile(user_identifier, customer_alerts_profilepatch_payload, app_group_id=app_group_id, app_id=app_id, sponsor_id=sponsor_id)
    pprint(api_response)
except ApiException as e:
    print("Exception when calling CustomerRulesAlertsApi->patchcustomer_alerts_profile: %s\n" % e)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **user_identifier** | **str**| The user identifier of the customer profile document | 
 **customer_alerts_profilepatch_payload** | [**CustomerAlertsProfilepatchPayload**](CustomerAlertsProfilepatchPayload.md)| request | 
 **app_group_id** | **str**| Application Group ID assigned by VDP to uniquely identify a logical group of applications that manage transaction controls, if present appID should not be present | [optional] 
 **app_id** | **str**| Application ID assigned by VDP to uniquely identify an application that manages transaction controls, if present appGroupID should not be present | [optional] 
 **sponsor_id** | **str**| Card Program Sponsor ID as configured in VTC, and supplied by VDP | [optional] 

### Return type

[**CustomerAlertsProfilepatchResponse**](CustomerAlertsProfilepatchResponse.md)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[Back to top](#)   |   [Back to API list](../README.md#documentation-for-api-endpoints)   |   [Back to Model list](../README.md#documentation-for-models)   |   [Back to README](../README.md)

# **post_get_notifications_summary_by_pan_or_token**
> GetNotificationsSummaryByPanOrTokenpostResponse post_get_notifications_summary_by_pan_or_token(get_notifications_summary_by_pan_or_tokenpost_payload, app_group_id=app_group_id, app_id=app_id, sponsor_id=sponsor_id)



Get notification summary by primaryAccountNumber or paymentToken

### Example 
```python
from __future__ import print_statement
import time
from src.apis.customer_rules_alerts_api import CustomerRulesAlertsApi
from src.configuration import Configuration
from pprint import pprint

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

# Set all the required parameters in the post_get_notifications_summary_by_pan_or_token. Look at the documentation for further clarification.
get_notifications_summary_by_pan_or_tokenpost_payload = src.GetNotificationsSummaryByPanOrTokenpostPayload() # GetNotificationsSummaryByPanOrTokenpostPayload | request
app_group_id = 'app_group_id_example' # str | Application Group ID assigned by VDP to uniquely identify a logical group of applications that manage transaction controls, if present appID should not be present (optional)
app_id = 'app_id_example' # str | Application ID assigned by VDP to uniquely identify an application that manages transaction controls, if present appGroupID should not be present (optional)
sponsor_id = 'sponsor_id_example' # str | Card Program Sponsor ID as configured in VTC, and supplied by VDP (optional)

try: 
    api_response = api_instance.post_get_notifications_summary_by_pan_or_token(get_notifications_summary_by_pan_or_tokenpost_payload, app_group_id=app_group_id, app_id=app_id, sponsor_id=sponsor_id)
    pprint(api_response)
except ApiException as e:
    print("Exception when calling CustomerRulesAlertsApi->post_get_notifications_summary_by_pan_or_token: %s\n" % e)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **get_notifications_summary_by_pan_or_tokenpost_payload** | [**GetNotificationsSummaryByPanOrTokenpostPayload**](GetNotificationsSummaryByPanOrTokenpostPayload.md)| request | 
 **app_group_id** | **str**| Application Group ID assigned by VDP to uniquely identify a logical group of applications that manage transaction controls, if present appID should not be present | [optional] 
 **app_id** | **str**| Application ID assigned by VDP to uniquely identify an application that manages transaction controls, if present appGroupID should not be present | [optional] 
 **sponsor_id** | **str**| Card Program Sponsor ID as configured in VTC, and supplied by VDP | [optional] 

### Return type

[**GetNotificationsSummaryByPanOrTokenpostResponse**](GetNotificationsSummaryByPanOrTokenpostResponse.md)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[Back to top](#)   |   [Back to API list](../README.md#documentation-for-api-endpoints)   |   [Back to Model list](../README.md#documentation-for-models)   |   [Back to README](../README.md)

# **postcreate_customer_alert_profile**
> CreateCustomerAlertProfilepostResponse postcreate_customer_alert_profile(create_customer_alert_profilepost_payload, app_group_id=app_group_id, app_id=app_id, sponsor_id=sponsor_id)



Create New Customer Profile

### Example 
```python
from __future__ import print_statement
import time
from src.apis.customer_rules_alerts_api import CustomerRulesAlertsApi
from src.configuration import Configuration
from pprint import pprint

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

# Set all the required parameters in the postcreate_customer_alert_profile. Look at the documentation for further clarification.
create_customer_alert_profilepost_payload = src.CreateCustomerAlertProfilepostPayload() # CreateCustomerAlertProfilepostPayload | request
app_group_id = 'app_group_id_example' # str | Application Group ID assigned by VDP to uniquely identify a logical group of applications that manage transaction controls, if present appID should not be present (optional)
app_id = 'app_id_example' # str | Application ID assigned by VDP to uniquely identify an application that manages transaction controls, if present appGroupID should not be present (optional)
sponsor_id = 'sponsor_id_example' # str | Card Program Sponsor ID as configured in VTC, and supplied by VDP (optional)

try: 
    api_response = api_instance.postcreate_customer_alert_profile(create_customer_alert_profilepost_payload, app_group_id=app_group_id, app_id=app_id, sponsor_id=sponsor_id)
    pprint(api_response)
except ApiException as e:
    print("Exception when calling CustomerRulesAlertsApi->postcreate_customer_alert_profile: %s\n" % e)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **create_customer_alert_profilepost_payload** | [**CreateCustomerAlertProfilepostPayload**](CreateCustomerAlertProfilepostPayload.md)| request | 
 **app_group_id** | **str**| Application Group ID assigned by VDP to uniquely identify a logical group of applications that manage transaction controls, if present appID should not be present | [optional] 
 **app_id** | **str**| Application ID assigned by VDP to uniquely identify an application that manages transaction controls, if present appGroupID should not be present | [optional] 
 **sponsor_id** | **str**| Card Program Sponsor ID as configured in VTC, and supplied by VDP | [optional] 

### Return type

[**CreateCustomerAlertProfilepostResponse**](CreateCustomerAlertProfilepostResponse.md)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[Back to top](#)   |   [Back to API list](../README.md#documentation-for-api-endpoints)   |   [Back to Model list](../README.md#documentation-for-models)   |   [Back to README](../README.md)

# **postmanage_alerts_preferences**
> ManageAlertsPreferencespostResponse postmanage_alerts_preferences(user_identifier, manage_alerts_preferencespost_payload, app_group_id=app_group_id, app_id=app_id, sponsor_id=sponsor_id)



Create New Notification Preferences for given Customer Profile

### Example 
```python
from __future__ import print_statement
import time
from src.apis.customer_rules_alerts_api import CustomerRulesAlertsApi
from src.configuration import Configuration
from pprint import pprint

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

# Set all the required parameters in the postmanage_alerts_preferences. Look at the documentation for further clarification.
user_identifier = 'user_identifier_example' # str | The user identifier of the customer profile document
manage_alerts_preferencespost_payload = src.ManageAlertsPreferencespostPayload() # ManageAlertsPreferencespostPayload | request
app_group_id = 'app_group_id_example' # str | Application Group ID assigned by VDP to uniquely identify a logical group of applications that manage transaction controls, if present appID should not be present (optional)
app_id = 'app_id_example' # str | Application ID assigned by VDP to uniquely identify an application that manages transaction controls, if present appGroupID should not be present (optional)
sponsor_id = 'sponsor_id_example' # str | Card Program Sponsor ID as configured in VTC, and supplied by VDP (optional)

try: 
    api_response = api_instance.postmanage_alerts_preferences(user_identifier, manage_alerts_preferencespost_payload, app_group_id=app_group_id, app_id=app_id, sponsor_id=sponsor_id)
    pprint(api_response)
except ApiException as e:
    print("Exception when calling CustomerRulesAlertsApi->postmanage_alerts_preferences: %s\n" % e)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **user_identifier** | **str**| The user identifier of the customer profile document | 
 **manage_alerts_preferencespost_payload** | [**ManageAlertsPreferencespostPayload**](ManageAlertsPreferencespostPayload.md)| request | 
 **app_group_id** | **str**| Application Group ID assigned by VDP to uniquely identify a logical group of applications that manage transaction controls, if present appID should not be present | [optional] 
 **app_id** | **str**| Application ID assigned by VDP to uniquely identify an application that manages transaction controls, if present appGroupID should not be present | [optional] 
 **sponsor_id** | **str**| Card Program Sponsor ID as configured in VTC, and supplied by VDP | [optional] 

### Return type

[**ManageAlertsPreferencespostResponse**](ManageAlertsPreferencespostResponse.md)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[Back to top](#)   |   [Back to API list](../README.md#documentation-for-api-endpoints)   |   [Back to Model list](../README.md#documentation-for-models)   |   [Back to README](../README.md)

# **putmanage_alerts_preferences**
> ManageAlertsPreferencesputResponse putmanage_alerts_preferences(user_identifier, manage_alerts_preferencesput_payload, app_group_id=app_group_id, app_id=app_id, sponsor_id=sponsor_id)



Update Existing Notification Preferences for given Customer

### Example 
```python
from __future__ import print_statement
import time
from src.apis.customer_rules_alerts_api import CustomerRulesAlertsApi
from src.configuration import Configuration
from pprint import pprint

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

# Set all the required parameters in the putmanage_alerts_preferences. Look at the documentation for further clarification.
user_identifier = 'user_identifier_example' # str | The user identifier of the customer profile document
manage_alerts_preferencesput_payload = src.ManageAlertsPreferencesputPayload() # ManageAlertsPreferencesputPayload | request
app_group_id = 'app_group_id_example' # str | Application Group ID assigned by VDP to uniquely identify a logical group of applications that manage transaction controls, if present appID should not be present (optional)
app_id = 'app_id_example' # str | Application ID assigned by VDP to uniquely identify an application that manages transaction controls, if present appGroupID should not be present (optional)
sponsor_id = 'sponsor_id_example' # str | Card Program Sponsor ID as configured in VTC, and supplied by VDP (optional)

try: 
    api_response = api_instance.putmanage_alerts_preferences(user_identifier, manage_alerts_preferencesput_payload, app_group_id=app_group_id, app_id=app_id, sponsor_id=sponsor_id)
    pprint(api_response)
except ApiException as e:
    print("Exception when calling CustomerRulesAlertsApi->putmanage_alerts_preferences: %s\n" % e)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **user_identifier** | **str**| The user identifier of the customer profile document | 
 **manage_alerts_preferencesput_payload** | [**ManageAlertsPreferencesputPayload**](ManageAlertsPreferencesputPayload.md)| request | 
 **app_group_id** | **str**| Application Group ID assigned by VDP to uniquely identify a logical group of applications that manage transaction controls, if present appID should not be present | [optional] 
 **app_id** | **str**| Application ID assigned by VDP to uniquely identify an application that manages transaction controls, if present appGroupID should not be present | [optional] 
 **sponsor_id** | **str**| Card Program Sponsor ID as configured in VTC, and supplied by VDP | [optional] 

### Return type

[**ManageAlertsPreferencesputResponse**](ManageAlertsPreferencesputResponse.md)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[Back to top](#)   |   [Back to API list](../README.md#documentation-for-api-endpoints)   |   [Back to Model list](../README.md#documentation-for-models)   |   [Back to README](../README.md)


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