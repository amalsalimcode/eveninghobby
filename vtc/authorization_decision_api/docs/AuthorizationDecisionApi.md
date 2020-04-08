# Authorization API
The Authorization Decision API enables an authorization processor to request an authorization decision recommendation based on cardholder rules configured in consumer transaction controls.  In addition, the API enables the authorization processor to update an authorization decision with the actual decision that was rendered. 

All URIs are relative to *https://sandbox.api.visa.com*

Method | HTTP request | Description
------------- | ------------- | -------------
[**getdecision_request_actions**](AuthorizationDecisionApi.md#getdecision_request_actions) | **GET** /vctc/validation/v1/decisions/{decisionID} | 
[**getdecisions_history**](AuthorizationDecisionApi.md#getdecisions_history) | **GET** /vctc/validation/v1/decisions/history | 
[**postdecision_inquiry**](AuthorizationDecisionApi.md#postdecision_inquiry) | **POST** /vctc/validation/v1/consumertransactioncontrols/decisioninquiry | 
[**postdecision_request**](AuthorizationDecisionApi.md#postdecision_request) | **POST** /vctc/validation/v1/decisions | 
[**postdecision_request_by_pan**](AuthorizationDecisionApi.md#postdecision_request_by_pan) | **POST** /vctc/validation/v1/decisions/cardinquiry | 
[**postpreevaluations**](AuthorizationDecisionApi.md#postpreevaluations) | **POST** /vctc/validation/v1/preevaluations | 
[**putdecision_request_actions**](AuthorizationDecisionApi.md#putdecision_request_actions) | **PUT** /vctc/validation/v1/decisions/{decisionID} | 


# **getdecision_request_actions**
> DecisionRequestActionsgetResponse getdecision_request_actions(decision_id)



Retrieve the details of a specific decision record

### Example 
```python
from __future__ import print_statement
import time
from src.apis.authorization_decision_api import AuthorizationDecisionApi
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
api_instance = AuthorizationDecisionApi()

# Set all the required parameters in the getdecision_request_actions. Look at the documentation for further clarification.
decision_id = 'decision_id_example' # str | The ID of the document for the document to be returned

try: 
    api_response = api_instance.getdecision_request_actions(decision_id)
    pprint(api_response)
except ApiException as e:
    print("Exception when calling AuthorizationDecisionApi->getdecision_request_actions: %s\n" % e)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **decision_id** | **str**| The ID of the document for the document to be returned | 

### Return type

[**DecisionRequestActionsgetResponse**](DecisionRequestActionsgetResponse.md)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[Back to top](#)   |   [Back to API list](../README.md#documentation-for-api-endpoints)   |   [Back to Model list](../README.md#documentation-for-models)   |   [Back to README](../README.md)

# **getdecisions_history**
> DecisionsHistorygetResponse getdecisions_history(page, limit)



Retrieve a list of decision records for a sponsor

### Example 
```python
from __future__ import print_statement
import time
from src.apis.authorization_decision_api import AuthorizationDecisionApi
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
api_instance = AuthorizationDecisionApi()

# Set all the required parameters in the getdecisions_history. Look at the documentation for further clarification.
page = 'page_example' # str | Page number to be returned
limit = 'limit_example' # str | Page size to be returned

try: 
    api_response = api_instance.getdecisions_history(page, limit)
    pprint(api_response)
except ApiException as e:
    print("Exception when calling AuthorizationDecisionApi->getdecisions_history: %s\n" % e)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **page** | **str**| Page number to be returned | 
 **limit** | **str**| Page size to be returned | 

### Return type

[**DecisionsHistorygetResponse**](DecisionsHistorygetResponse.md)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[Back to top](#)   |   [Back to API list](../README.md#documentation-for-api-endpoints)   |   [Back to Model list](../README.md#documentation-for-models)   |   [Back to README](../README.md)

# **postdecision_inquiry**
> DecisionInquirypostResponse postdecision_inquiry(decision_inquirypost_payload)



Retrieve a list of decision records by reterivalReferenceNumber

### Example 
```python
from __future__ import print_statement
import time
from src.apis.authorization_decision_api import AuthorizationDecisionApi
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
api_instance = AuthorizationDecisionApi()

# Set all the required parameters in the postdecision_inquiry. Look at the documentation for further clarification.
decision_inquirypost_payload = src.DecisionInquirypostPayload() # DecisionInquirypostPayload | decisionRequest

try: 
    api_response = api_instance.postdecision_inquiry(decision_inquirypost_payload)
    pprint(api_response)
except ApiException as e:
    print("Exception when calling AuthorizationDecisionApi->postdecision_inquiry: %s\n" % e)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **decision_inquirypost_payload** | [**DecisionInquirypostPayload**](DecisionInquirypostPayload.md)| decisionRequest | 

### Return type

[**DecisionInquirypostResponse**](DecisionInquirypostResponse.md)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[Back to top](#)   |   [Back to API list](../README.md#documentation-for-api-endpoints)   |   [Back to Model list](../README.md#documentation-for-models)   |   [Back to README](../README.md)

# **postdecision_request**
> DecisionRequestpostResponse postdecision_request(decision_requestpost_payload)



Request a decision on pending transaction or send notification or advice for completed transaction

### Example 
```python
from __future__ import print_statement
import time
from src.apis.authorization_decision_api import AuthorizationDecisionApi
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
api_instance = AuthorizationDecisionApi()

# Set all the required parameters in the postdecision_request. Look at the documentation for further clarification.
decision_requestpost_payload = src.DecisionRequestpostPayload() # DecisionRequestpostPayload | decisionRequest

try: 
    api_response = api_instance.postdecision_request(decision_requestpost_payload)
    pprint(api_response)
except ApiException as e:
    print("Exception when calling AuthorizationDecisionApi->postdecision_request: %s\n" % e)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **decision_requestpost_payload** | [**DecisionRequestpostPayload**](DecisionRequestpostPayload.md)| decisionRequest | 

### Return type

[**DecisionRequestpostResponse**](DecisionRequestpostResponse.md)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[Back to top](#)   |   [Back to API list](../README.md#documentation-for-api-endpoints)   |   [Back to Model list](../README.md#documentation-for-models)   |   [Back to README](../README.md)

# **postdecision_request_by_pan**
> DecisionRequestByPanpostResponse postdecision_request_by_pan(decision_request_by_panpost_payload)



Retrieve a list of decision records for a card

### Example 
```python
from __future__ import print_statement
import time
from src.apis.authorization_decision_api import AuthorizationDecisionApi
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
api_instance = AuthorizationDecisionApi()

# Set all the required parameters in the postdecision_request_by_pan. Look at the documentation for further clarification.
decision_request_by_panpost_payload = src.DecisionRequestByPanpostPayload() # DecisionRequestByPanpostPayload | decisionHistoryRequest

try: 
    api_response = api_instance.postdecision_request_by_pan(decision_request_by_panpost_payload)
    pprint(api_response)
except ApiException as e:
    print("Exception when calling AuthorizationDecisionApi->postdecision_request_by_pan: %s\n" % e)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **decision_request_by_panpost_payload** | [**DecisionRequestByPanpostPayload**](DecisionRequestByPanpostPayload.md)| decisionHistoryRequest | 

### Return type

[**DecisionRequestByPanpostResponse**](DecisionRequestByPanpostResponse.md)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[Back to top](#)   |   [Back to API list](../README.md#documentation-for-api-endpoints)   |   [Back to Model list](../README.md#documentation-for-models)   |   [Back to README](../README.md)

# **postpreevaluations**
> PreevaluationspostResponse postpreevaluations(preevaluationspost_payload)



Request a Pre-Evaluation recommendation on a transaction before it is run

### Example 
```python
from __future__ import print_statement
import time
from src.apis.authorization_decision_api import AuthorizationDecisionApi
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
api_instance = AuthorizationDecisionApi()

# Set all the required parameters in the postpreevaluations. Look at the documentation for further clarification.
preevaluationspost_payload = src.PreevaluationspostPayload() # PreevaluationspostPayload | preEvaluationRequest

try: 
    api_response = api_instance.postpreevaluations(preevaluationspost_payload)
    pprint(api_response)
except ApiException as e:
    print("Exception when calling AuthorizationDecisionApi->postpreevaluations: %s\n" % e)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **preevaluationspost_payload** | [**PreevaluationspostPayload**](PreevaluationspostPayload.md)| preEvaluationRequest | 

### Return type

[**PreevaluationspostResponse**](PreevaluationspostResponse.md)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[Back to top](#)   |   [Back to API list](../README.md#documentation-for-api-endpoints)   |   [Back to Model list](../README.md#documentation-for-models)   |   [Back to README](../README.md)

# **putdecision_request_actions**
> DecisionRequestActionsputResponse putdecision_request_actions(decision_id, decision_request_actionsput_payload)



Update the state of a specific decision record

### Example 
```python
from __future__ import print_statement
import time
from src.apis.authorization_decision_api import AuthorizationDecisionApi
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
api_instance = AuthorizationDecisionApi()

# Set all the required parameters in the putdecision_request_actions. Look at the documentation for further clarification.
decision_id = 'decision_id_example' # str | The ID of the document for the document to be updated
decision_request_actionsput_payload = src.DecisionRequestActionsputPayload() # DecisionRequestActionsputPayload | decisionUpdate

try: 
    api_response = api_instance.putdecision_request_actions(decision_id, decision_request_actionsput_payload)
    pprint(api_response)
except ApiException as e:
    print("Exception when calling AuthorizationDecisionApi->putdecision_request_actions: %s\n" % e)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **decision_id** | **str**| The ID of the document for the document to be updated | 
 **decision_request_actionsput_payload** | [**DecisionRequestActionsputPayload**](DecisionRequestActionsputPayload.md)| decisionUpdate | 

### Return type

[**DecisionRequestActionsputResponse**](DecisionRequestActionsputResponse.md)

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