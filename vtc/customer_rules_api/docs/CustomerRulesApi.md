# Customer Rules API
The Customer Rules API enables consumers to establish control rules that will define the type of transactions they want to Manage.

All URIs are relative to *https://sandbox.api.visa.com*

Method | HTTP request | Description
------------- | ------------- | -------------
[**deletecard_replacement**](CustomerRulesApi.md#deletecard_replacement) | **DELETE** /vctc/customerrules//v1/consumertransactioncontrols/accounts/accountupdate | 
[**deletedelete_control_document_by_doc_id**](CustomerRulesApi.md#deletedelete_control_document_by_doc_id) | **DELETE** /vctc/customerrules//v1/consumertransactioncontrols/{documentID} | 
[**deletemanage_controls**](CustomerRulesApi.md#deletemanage_controls) | **DELETE** /vctc/customerrules//v1/consumertransactioncontrols/{documentID}/rules | 
[**getapplication_configuration**](CustomerRulesApi.md#getapplication_configuration) | **GET** /vctc/customerrules//v1/consumertransactioncontrols/applications/configuration | 
[**getmanage_controls**](CustomerRulesApi.md#getmanage_controls) | **GET** /vctc/customerrules//v1/consumertransactioncontrols/{documentID}/rules | 
[**gettransaction_control_document_history**](CustomerRulesApi.md#gettransaction_control_document_history) | **GET** /vctc/customerrules//v1/consumertransactioncontrols/{documentID}/controlHistory | 
[**postbatch_enrollment**](CustomerRulesApi.md#postbatch_enrollment) | **POST** /vctc/customerrules//v1/consumertransactioncontrols/batch | 
[**postcard_replacement**](CustomerRulesApi.md#postcard_replacement) | **POST** /vctc/customerrules//v1/consumertransactioncontrols/accounts/accountupdate | 
[**postconfiguration_cardinquiry**](CustomerRulesApi.md#postconfiguration_cardinquiry) | **POST** /vctc/customerrules//v1/consumertransactioncontrols/configuration/cardinquiry | 
[**postdecouple_tokens**](CustomerRulesApi.md#postdecouple_tokens) | **POST** /vctc/customerrules//v1/consumertransactioncontrols/accounts/decoupletokens | 
[**postmanage_controls**](CustomerRulesApi.md#postmanage_controls) | **POST** /vctc/customerrules//v1/consumertransactioncontrols/{documentID}/rules | 
[**postmerchant_type_controls_card_inquiry**](CustomerRulesApi.md#postmerchant_type_controls_card_inquiry) | **POST** /vctc/customerrules//v1/consumertransactioncontrols/merchanttypecontrols/cardinquiry | 
[**postmobile_wallet_services**](CustomerRulesApi.md#postmobile_wallet_services) | **POST** /vctc/customerrules//v1/consumertransactioncontrols/walletservices/accountinquiry | 
[**posttransaction_control_history_by_document_id**](CustomerRulesApi.md#posttransaction_control_history_by_document_id) | **POST** /vctc/customerrules//v1/consumertransactioncontrols/controlHistory | 
[**posttransaction_controls**](CustomerRulesApi.md#posttransaction_controls) | **POST** /vctc/customerrules//v1/consumertransactioncontrols/transactiontypecontrols/cardinquiry | 
[**posttransaction_controls_by_pan**](CustomerRulesApi.md#posttransaction_controls_by_pan) | **POST** /vctc/customerrules//v1/consumertransactioncontrols/inquiries/cardinquiry | 
[**postvtc_registration**](CustomerRulesApi.md#postvtc_registration) | **POST** /vctc/customerrules//v1/consumertransactioncontrols | 
[**putapplication_configuration**](CustomerRulesApi.md#putapplication_configuration) | **PUT** /vctc/customerrules//v1/consumertransactioncontrols/applications/configuration | 
[**putmanage_controls**](CustomerRulesApi.md#putmanage_controls) | **PUT** /vctc/customerrules//v1/consumertransactioncontrols/{documentID}/rules | 


# **deletecard_replacement**
> CardReplacementdeleteResponse deletecard_replacement(card_replacementdelete_payload)



Delete a Control Document using an Account Number (primaryAccountNumber or paymentToken).

### Example 
```python
from __future__ import print_statement
import time
from src.apis.customer_rules_api import CustomerRulesApi
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
api_instance = CustomerRulesApi()

# Set all the required parameters in the deletecard_replacement. Look at the documentation for further clarification.
card_replacementdelete_payload = src.CardReplacementdeletePayload() # CardReplacementdeletePayload | request

try: 
    api_response = api_instance.deletecard_replacement(card_replacementdelete_payload)
    pprint(api_response)
except ApiException as e:
    print("Exception when calling CustomerRulesApi->deletecard_replacement: %s\n" % e)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **card_replacementdelete_payload** | [**CardReplacementdeletePayload**](CardReplacementdeletePayload.md)| request | 

### Return type

[**CardReplacementdeleteResponse**](CardReplacementdeleteResponse.md)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[Back to top](#)   |   [Back to API list](../README.md#documentation-for-api-endpoints)   |   [Back to Model list](../README.md#documentation-for-models)   |   [Back to README](../README.md)

# **deletedelete_control_document_by_doc_id**
> DeleteControlDocumentByDocIddeleteResponse deletedelete_control_document_by_doc_id(document_id)



Delete a Control Document.

### Example 
```python
from __future__ import print_statement
import time
from src.apis.customer_rules_api import CustomerRulesApi
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
api_instance = CustomerRulesApi()

# Set all the required parameters in the deletedelete_control_document_by_doc_id. Look at the documentation for further clarification.
document_id = 'document_id_example' # str | The documentID of the control document to be de-enrolled. The document will be deleted.

try: 
    api_response = api_instance.deletedelete_control_document_by_doc_id(document_id)
    pprint(api_response)
except ApiException as e:
    print("Exception when calling CustomerRulesApi->deletedelete_control_document_by_doc_id: %s\n" % e)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **document_id** | **str**| The documentID of the control document to be de-enrolled. The document will be deleted. | 

### Return type

[**DeleteControlDocumentByDocIddeleteResponse**](DeleteControlDocumentByDocIddeleteResponse.md)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[Back to top](#)   |   [Back to API list](../README.md#documentation-for-api-endpoints)   |   [Back to Model list](../README.md#documentation-for-models)   |   [Back to README](../README.md)

# **deletemanage_controls**
> ManageControlsdeleteResponse deletemanage_controls(document_id, manage_controlsdelete_payload)



Delete an existing control type in a Control Document.

### Example 
```python
from __future__ import print_statement
import time
from src.apis.customer_rules_api import CustomerRulesApi
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
api_instance = CustomerRulesApi()

# Set all the required parameters in the deletemanage_controls. Look at the documentation for further clarification.
document_id = 'document_id_example' # str | The documentID of the control document from where control rules are to be deleted, Does not delete the document
manage_controlsdelete_payload = src.ManageControlsdeletePayload() # ManageControlsdeletePayload | request

try: 
    api_response = api_instance.deletemanage_controls(document_id, manage_controlsdelete_payload)
    pprint(api_response)
except ApiException as e:
    print("Exception when calling CustomerRulesApi->deletemanage_controls: %s\n" % e)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **document_id** | **str**| The documentID of the control document from where control rules are to be deleted, Does not delete the document | 
 **manage_controlsdelete_payload** | [**ManageControlsdeletePayload**](ManageControlsdeletePayload.md)| request | 

### Return type

[**ManageControlsdeleteResponse**](ManageControlsdeleteResponse.md)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[Back to top](#)   |   [Back to API list](../README.md#documentation-for-api-endpoints)   |   [Back to Model list](../README.md#documentation-for-models)   |   [Back to README](../README.md)

# **getapplication_configuration**
> ApplicationConfigurationgetResponse getapplication_configuration()



Retrieve the App's configuration data for notification callback settings

### Example 
```python
from __future__ import print_statement
import time
from src.apis.customer_rules_api import CustomerRulesApi
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
api_instance = CustomerRulesApi()

# Set all the required parameters in the getapplication_configuration. Look at the documentation for further clarification.

try: 
    api_response = api_instance.getapplication_configuration()
    pprint(api_response)
except ApiException as e:
    print("Exception when calling CustomerRulesApi->getapplication_configuration: %s\n" % e)
```

### Parameters
This endpoint does not need any parameter.

### Return type

[**ApplicationConfigurationgetResponse**](ApplicationConfigurationgetResponse.md)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[Back to top](#)   |   [Back to API list](../README.md#documentation-for-api-endpoints)   |   [Back to Model list](../README.md#documentation-for-models)   |   [Back to README](../README.md)

# **getmanage_controls**
> ManageControlsgetResponse getmanage_controls(document_id, user_identifier=user_identifier)



Retrieve a Control Document

### Example 
```python
from __future__ import print_statement
import time
from src.apis.customer_rules_api import CustomerRulesApi
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
api_instance = CustomerRulesApi()

# Set all the required parameters in the getmanage_controls. Look at the documentation for further clarification.
document_id = 'document_id_example' # str | The documentID of the control document to be returned.
user_identifier = 'user_identifier_example' # str | Uniquely identifies the cardholder who is to receive the alert message. The notification Service Provider should use this value to identify an individual and their contact preferences.  The userIdentifier should be a GUID, but at minimum must be unique per enrolling application. It is mandatory for VTC notifications. Maximum of 72 characters. (optional)

try: 
    api_response = api_instance.getmanage_controls(document_id, user_identifier=user_identifier)
    pprint(api_response)
except ApiException as e:
    print("Exception when calling CustomerRulesApi->getmanage_controls: %s\n" % e)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **document_id** | **str**| The documentID of the control document to be returned. | 
 **user_identifier** | **str**| Uniquely identifies the cardholder who is to receive the alert message. The notification Service Provider should use this value to identify an individual and their contact preferences.  The userIdentifier should be a GUID, but at minimum must be unique per enrolling application. It is mandatory for VTC notifications. Maximum of 72 characters. | [optional] 

### Return type

[**ManageControlsgetResponse**](ManageControlsgetResponse.md)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[Back to top](#)   |   [Back to API list](../README.md#documentation-for-api-endpoints)   |   [Back to Model list](../README.md#documentation-for-models)   |   [Back to README](../README.md)

# **gettransaction_control_document_history**
> TransactionControlDocumentHistorygetResponse gettransaction_control_document_history(document_id)



Get Transaction Control Changes History(Audit) by documentID

### Example 
```python
from __future__ import print_statement
import time
from src.apis.customer_rules_api import CustomerRulesApi
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
api_instance = CustomerRulesApi()

# Set all the required parameters in the gettransaction_control_document_history. Look at the documentation for further clarification.
document_id = 'document_id_example' # str | The documentID of the control document to be returned.

try: 
    api_response = api_instance.gettransaction_control_document_history(document_id)
    pprint(api_response)
except ApiException as e:
    print("Exception when calling CustomerRulesApi->gettransaction_control_document_history: %s\n" % e)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **document_id** | **str**| The documentID of the control document to be returned. | 

### Return type

[**TransactionControlDocumentHistorygetResponse**](TransactionControlDocumentHistorygetResponse.md)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[Back to top](#)   |   [Back to API list](../README.md#documentation-for-api-endpoints)   |   [Back to Model list](../README.md#documentation-for-models)   |   [Back to README](../README.md)

# **postbatch_enrollment**
> BatchEnrollmentpostResponse postbatch_enrollment(app_id, sponsor_id, batch_enrollmentpost_payload, app_group_id=app_group_id)



Enroll a batch of accounts in Visa Transaction Controls (VTC)

### Example 
```python
from __future__ import print_statement
import time
from src.apis.customer_rules_api import CustomerRulesApi
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
api_instance = CustomerRulesApi()

# Set all the required parameters in the postbatch_enrollment. Look at the documentation for further clarification.
app_id = 'app_id_example' # str | Application ID assigned by VDP to uniquely identify an application that manages transaction controls, if present appGroupID should not be present
sponsor_id = 'sponsor_id_example' # str | Card Program Sponsor ID as configured in VTC, and supplied by VDP
batch_enrollmentpost_payload = src.BatchEnrollmentpostPayload() # BatchEnrollmentpostPayload | request
app_group_id = 'app_group_id_example' # str | Application Group ID assigned by VDP to uniquely identify a logical group of applications that manage transaction controls, if present appID should not be present (optional)

try: 
    api_response = api_instance.postbatch_enrollment(app_id, sponsor_id, batch_enrollmentpost_payload, app_group_id=app_group_id)
    pprint(api_response)
except ApiException as e:
    print("Exception when calling CustomerRulesApi->postbatch_enrollment: %s\n" % e)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **app_id** | **str**| Application ID assigned by VDP to uniquely identify an application that manages transaction controls, if present appGroupID should not be present | 
 **sponsor_id** | **str**| Card Program Sponsor ID as configured in VTC, and supplied by VDP | 
 **batch_enrollmentpost_payload** | [**BatchEnrollmentpostPayload**](BatchEnrollmentpostPayload.md)| request | 
 **app_group_id** | **str**| Application Group ID assigned by VDP to uniquely identify a logical group of applications that manage transaction controls, if present appID should not be present | [optional] 

### Return type

[**BatchEnrollmentpostResponse**](BatchEnrollmentpostResponse.md)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[Back to top](#)   |   [Back to API list](../README.md#documentation-for-api-endpoints)   |   [Back to Model list](../README.md#documentation-for-models)   |   [Back to README](../README.md)

# **postcard_replacement**
> CardReplacementpostResponse postcard_replacement(card_replacementpost_payload)



Update the existing account identifier with new one (Card Replacement)

### Example 
```python
from __future__ import print_statement
import time
from src.apis.customer_rules_api import CustomerRulesApi
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
api_instance = CustomerRulesApi()

# Set all the required parameters in the postcard_replacement. Look at the documentation for further clarification.
card_replacementpost_payload = src.CardReplacementpostPayload() # CardReplacementpostPayload | request

try: 
    api_response = api_instance.postcard_replacement(card_replacementpost_payload)
    pprint(api_response)
except ApiException as e:
    print("Exception when calling CustomerRulesApi->postcard_replacement: %s\n" % e)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **card_replacementpost_payload** | [**CardReplacementpostPayload**](CardReplacementpostPayload.md)| request | 

### Return type

[**CardReplacementpostResponse**](CardReplacementpostResponse.md)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[Back to top](#)   |   [Back to API list](../README.md#documentation-for-api-endpoints)   |   [Back to Model list](../README.md#documentation-for-models)   |   [Back to README](../README.md)

# **postconfiguration_cardinquiry**
> ConfigurationCardinquirypostResponse postconfiguration_cardinquiry(configuration_cardinquirypost_payload)



Retrieve list of available payment control types for a card

### Example 
```python
from __future__ import print_statement
import time
from src.apis.customer_rules_api import CustomerRulesApi
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
api_instance = CustomerRulesApi()

# Set all the required parameters in the postconfiguration_cardinquiry. Look at the documentation for further clarification.
configuration_cardinquirypost_payload = src.ConfigurationCardinquirypostPayload() # ConfigurationCardinquirypostPayload | CardInquiryRequest

try: 
    api_response = api_instance.postconfiguration_cardinquiry(configuration_cardinquirypost_payload)
    pprint(api_response)
except ApiException as e:
    print("Exception when calling CustomerRulesApi->postconfiguration_cardinquiry: %s\n" % e)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **configuration_cardinquirypost_payload** | [**ConfigurationCardinquirypostPayload**](ConfigurationCardinquirypostPayload.md)| CardInquiryRequest | 

### Return type

[**ConfigurationCardinquirypostResponse**](ConfigurationCardinquirypostResponse.md)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[Back to top](#)   |   [Back to API list](../README.md#documentation-for-api-endpoints)   |   [Back to Model list](../README.md#documentation-for-models)   |   [Back to README](../README.md)

# **postdecouple_tokens**
> DecoupleTokenspostResponse postdecouple_tokens(app_id, decouple_tokenspost_payload, app_group_id=app_group_id, sponsor_id=sponsor_id)



Couple/Decouple a list of tokens from/to corresponding PAN

### Example 
```python
from __future__ import print_statement
import time
from src.apis.customer_rules_api import CustomerRulesApi
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
api_instance = CustomerRulesApi()

# Set all the required parameters in the postdecouple_tokens. Look at the documentation for further clarification.
app_id = 'app_id_example' # str | Application ID assigned by VDP to uniquely identify an application that manages transaction controls, if present appGroupID should not be present
decouple_tokenspost_payload = src.DecoupleTokenspostPayload() # DecoupleTokenspostPayload | request
app_group_id = 'app_group_id_example' # str | Application Group ID assigned by VDP to uniquely identify a logical group of applications that manage transaction controls, if present appID should not be present (optional)
sponsor_id = 'sponsor_id_example' # str | Card Program Sponsor ID as configured in VTC, and supplied by VDP (optional)

try: 
    api_response = api_instance.postdecouple_tokens(app_id, decouple_tokenspost_payload, app_group_id=app_group_id, sponsor_id=sponsor_id)
    pprint(api_response)
except ApiException as e:
    print("Exception when calling CustomerRulesApi->postdecouple_tokens: %s\n" % e)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **app_id** | **str**| Application ID assigned by VDP to uniquely identify an application that manages transaction controls, if present appGroupID should not be present | 
 **decouple_tokenspost_payload** | [**DecoupleTokenspostPayload**](DecoupleTokenspostPayload.md)| request | 
 **app_group_id** | **str**| Application Group ID assigned by VDP to uniquely identify a logical group of applications that manage transaction controls, if present appID should not be present | [optional] 
 **sponsor_id** | **str**| Card Program Sponsor ID as configured in VTC, and supplied by VDP | [optional] 

### Return type

[**DecoupleTokenspostResponse**](DecoupleTokenspostResponse.md)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[Back to top](#)   |   [Back to API list](../README.md#documentation-for-api-endpoints)   |   [Back to Model list](../README.md#documentation-for-models)   |   [Back to README](../README.md)

# **postmanage_controls**
> ManageControlspostResponse postmanage_controls(document_id, manage_controlspost_payload)



Add new payment controls to a Control Document

### Example 
```python
from __future__ import print_statement
import time
from src.apis.customer_rules_api import CustomerRulesApi
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
api_instance = CustomerRulesApi()

# Set all the required parameters in the postmanage_controls. Look at the documentation for further clarification.
document_id = 'document_id_example' # str | The unique documentID of a control document.
manage_controlspost_payload = src.ManageControlspostPayload() # ManageControlspostPayload | request

try: 
    api_response = api_instance.postmanage_controls(document_id, manage_controlspost_payload)
    pprint(api_response)
except ApiException as e:
    print("Exception when calling CustomerRulesApi->postmanage_controls: %s\n" % e)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **document_id** | **str**| The unique documentID of a control document. | 
 **manage_controlspost_payload** | [**ManageControlspostPayload**](ManageControlspostPayload.md)| request | 

### Return type

[**ManageControlspostResponse**](ManageControlspostResponse.md)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[Back to top](#)   |   [Back to API list](../README.md#documentation-for-api-endpoints)   |   [Back to Model list](../README.md#documentation-for-models)   |   [Back to README](../README.md)

# **postmerchant_type_controls_card_inquiry**
> MerchantTypeControlsCardInquirypostResponse postmerchant_type_controls_card_inquiry(merchant_type_controls_card_inquirypost_payload)



Retreive list of available merchant type controls for a card

### Example 
```python
from __future__ import print_statement
import time
from src.apis.customer_rules_api import CustomerRulesApi
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
api_instance = CustomerRulesApi()

# Set all the required parameters in the postmerchant_type_controls_card_inquiry. Look at the documentation for further clarification.
merchant_type_controls_card_inquirypost_payload = src.MerchantTypeControlsCardInquirypostPayload() # MerchantTypeControlsCardInquirypostPayload | CardInquiryRequest

try: 
    api_response = api_instance.postmerchant_type_controls_card_inquiry(merchant_type_controls_card_inquirypost_payload)
    pprint(api_response)
except ApiException as e:
    print("Exception when calling CustomerRulesApi->postmerchant_type_controls_card_inquiry: %s\n" % e)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **merchant_type_controls_card_inquirypost_payload** | [**MerchantTypeControlsCardInquirypostPayload**](MerchantTypeControlsCardInquirypostPayload.md)| CardInquiryRequest | 

### Return type

[**MerchantTypeControlsCardInquirypostResponse**](MerchantTypeControlsCardInquirypostResponse.md)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[Back to top](#)   |   [Back to API list](../README.md#documentation-for-api-endpoints)   |   [Back to Model list](../README.md#documentation-for-models)   |   [Back to README](../README.md)

# **postmobile_wallet_services**
> MobileWalletServicespostResponse postmobile_wallet_services(mobile_wallet_servicespost_payload)



Retrieve available Rules and existing Control Documents based on the primaryAccountNumber, paymentToken or documentID

### Example 
```python
from __future__ import print_statement
import time
from src.apis.customer_rules_api import CustomerRulesApi
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
api_instance = CustomerRulesApi()

# Set all the required parameters in the postmobile_wallet_services. Look at the documentation for further clarification.
mobile_wallet_servicespost_payload = src.MobileWalletServicespostPayload() # MobileWalletServicespostPayload | request

try: 
    api_response = api_instance.postmobile_wallet_services(mobile_wallet_servicespost_payload)
    pprint(api_response)
except ApiException as e:
    print("Exception when calling CustomerRulesApi->postmobile_wallet_services: %s\n" % e)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **mobile_wallet_servicespost_payload** | [**MobileWalletServicespostPayload**](MobileWalletServicespostPayload.md)| request | 

### Return type

[**MobileWalletServicespostResponse**](MobileWalletServicespostResponse.md)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[Back to top](#)   |   [Back to API list](../README.md#documentation-for-api-endpoints)   |   [Back to Model list](../README.md#documentation-for-models)   |   [Back to README](../README.md)

# **posttransaction_control_history_by_document_id**
> TransactionControlHistoryByDocumentIdpostResponse posttransaction_control_history_by_document_id(transaction_control_history_by_document_idpost_payload)



Get a control document history by primaryAccountNumber and date range. 

### Example 
```python
from __future__ import print_statement
import time
from src.apis.customer_rules_api import CustomerRulesApi
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
api_instance = CustomerRulesApi()

# Set all the required parameters in the posttransaction_control_history_by_document_id. Look at the documentation for further clarification.
transaction_control_history_by_document_idpost_payload = src.TransactionControlHistoryByDocumentIdpostPayload() # TransactionControlHistoryByDocumentIdpostPayload | request

try: 
    api_response = api_instance.posttransaction_control_history_by_document_id(transaction_control_history_by_document_idpost_payload)
    pprint(api_response)
except ApiException as e:
    print("Exception when calling CustomerRulesApi->posttransaction_control_history_by_document_id: %s\n" % e)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **transaction_control_history_by_document_idpost_payload** | [**TransactionControlHistoryByDocumentIdpostPayload**](TransactionControlHistoryByDocumentIdpostPayload.md)| request | 

### Return type

[**TransactionControlHistoryByDocumentIdpostResponse**](TransactionControlHistoryByDocumentIdpostResponse.md)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[Back to top](#)   |   [Back to API list](../README.md#documentation-for-api-endpoints)   |   [Back to Model list](../README.md#documentation-for-models)   |   [Back to README](../README.md)

# **posttransaction_controls**
> TransactionControlspostResponse posttransaction_controls(transaction_controlspost_payload)



Retreive list of available transaction type controls for a card

### Example 
```python
from __future__ import print_statement
import time
from src.apis.customer_rules_api import CustomerRulesApi
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
api_instance = CustomerRulesApi()

# Set all the required parameters in the posttransaction_controls. Look at the documentation for further clarification.
transaction_controlspost_payload = src.TransactionControlspostPayload() # TransactionControlspostPayload | CardInquiryRequest

try: 
    api_response = api_instance.posttransaction_controls(transaction_controlspost_payload)
    pprint(api_response)
except ApiException as e:
    print("Exception when calling CustomerRulesApi->posttransaction_controls: %s\n" % e)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **transaction_controlspost_payload** | [**TransactionControlspostPayload**](TransactionControlspostPayload.md)| CardInquiryRequest | 

### Return type

[**TransactionControlspostResponse**](TransactionControlspostResponse.md)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[Back to top](#)   |   [Back to API list](../README.md#documentation-for-api-endpoints)   |   [Back to Model list](../README.md#documentation-for-models)   |   [Back to README](../README.md)

# **posttransaction_controls_by_pan**
> TransactionControlsByPanpostResponse posttransaction_controls_by_pan(transaction_controls_by_panpost_payload)



Get a Control Document List by a PrimaryAccountNumber

### Example 
```python
from __future__ import print_statement
import time
from src.apis.customer_rules_api import CustomerRulesApi
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
api_instance = CustomerRulesApi()

# Set all the required parameters in the posttransaction_controls_by_pan. Look at the documentation for further clarification.
transaction_controls_by_panpost_payload = src.TransactionControlsByPanpostPayload() # TransactionControlsByPanpostPayload | request

try: 
    api_response = api_instance.posttransaction_controls_by_pan(transaction_controls_by_panpost_payload)
    pprint(api_response)
except ApiException as e:
    print("Exception when calling CustomerRulesApi->posttransaction_controls_by_pan: %s\n" % e)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **transaction_controls_by_panpost_payload** | [**TransactionControlsByPanpostPayload**](TransactionControlsByPanpostPayload.md)| request | 

### Return type

[**TransactionControlsByPanpostResponse**](TransactionControlsByPanpostResponse.md)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[Back to top](#)   |   [Back to API list](../README.md#documentation-for-api-endpoints)   |   [Back to Model list](../README.md#documentation-for-models)   |   [Back to README](../README.md)

# **postvtc_registration**
> VtcRegistrationpostResponse postvtc_registration(vtc_registrationpost_payload)



Enroll an account in Visa Transaction Controls (VTC)

### Example 
```python
from __future__ import print_statement
import time
from src.apis.customer_rules_api import CustomerRulesApi
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
api_instance = CustomerRulesApi()

# Set all the required parameters in the postvtc_registration. Look at the documentation for further clarification.
vtc_registrationpost_payload = src.VtcRegistrationpostPayload() # VtcRegistrationpostPayload | request

try: 
    api_response = api_instance.postvtc_registration(vtc_registrationpost_payload)
    pprint(api_response)
except ApiException as e:
    print("Exception when calling CustomerRulesApi->postvtc_registration: %s\n" % e)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **vtc_registrationpost_payload** | [**VtcRegistrationpostPayload**](VtcRegistrationpostPayload.md)| request | 

### Return type

[**VtcRegistrationpostResponse**](VtcRegistrationpostResponse.md)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[Back to top](#)   |   [Back to API list](../README.md#documentation-for-api-endpoints)   |   [Back to Model list](../README.md#documentation-for-models)   |   [Back to README](../README.md)

# **putapplication_configuration**
> ApplicationConfigurationputResponse putapplication_configuration(application_configurationput_payload)



Update the App's configuration data for notification callback settings

### Example 
```python
from __future__ import print_statement
import time
from src.apis.customer_rules_api import CustomerRulesApi
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
api_instance = CustomerRulesApi()

# Set all the required parameters in the putapplication_configuration. Look at the documentation for further clarification.
application_configurationput_payload = src.ApplicationConfigurationputPayload() # ApplicationConfigurationputPayload | callBackSettingsRequest

try: 
    api_response = api_instance.putapplication_configuration(application_configurationput_payload)
    pprint(api_response)
except ApiException as e:
    print("Exception when calling CustomerRulesApi->putapplication_configuration: %s\n" % e)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **application_configurationput_payload** | [**ApplicationConfigurationputPayload**](ApplicationConfigurationputPayload.md)| callBackSettingsRequest | 

### Return type

[**ApplicationConfigurationputResponse**](ApplicationConfigurationputResponse.md)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[Back to top](#)   |   [Back to API list](../README.md#documentation-for-api-endpoints)   |   [Back to Model list](../README.md#documentation-for-models)   |   [Back to README](../README.md)

# **putmanage_controls**
> ManageControlsputResponse putmanage_controls(document_id, manage_controlsput_payload)



Update the existing details of a Control Document

### Example 
```python
from __future__ import print_statement
import time
from src.apis.customer_rules_api import CustomerRulesApi
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
api_instance = CustomerRulesApi()

# Set all the required parameters in the putmanage_controls. Look at the documentation for further clarification.
document_id = 'document_id_example' # str | The documentID of the control document to be updated.
manage_controlsput_payload = src.ManageControlsputPayload() # ManageControlsputPayload | request

try: 
    api_response = api_instance.putmanage_controls(document_id, manage_controlsput_payload)
    pprint(api_response)
except ApiException as e:
    print("Exception when calling CustomerRulesApi->putmanage_controls: %s\n" % e)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **document_id** | **str**| The documentID of the control document to be updated. | 
 **manage_controlsput_payload** | [**ManageControlsputPayload**](ManageControlsputPayload.md)| request | 

### Return type

[**ManageControlsputResponse**](ManageControlsputResponse.md)

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