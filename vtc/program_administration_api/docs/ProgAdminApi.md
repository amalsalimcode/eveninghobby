# Program Administration API
The Transaction Controls Program Administration API enables Issuers to change program configurations for their sponsorID.

All URIs are relative to *https://sandbox.api.visa.com*

Method | HTTP request | Description
------------- | ------------- | -------------
[**deletemanage_rule_configuration**](ProgAdminApi.md#deletemanage_rule_configuration) | **DELETE** /vctc/programadmin//v1/sponsors/configuration | 
[**deletemanage_transaction_controls**](ProgAdminApi.md#deletemanage_transaction_controls) | **DELETE** /vctc/programadmin//v1/configuration/transactiontypecontrols | 
[**getmanage_rule_configuration**](ProgAdminApi.md#getmanage_rule_configuration) | **GET** /vctc/programadmin//v1/sponsors/configuration | 
[**getmanage_transaction_controls**](ProgAdminApi.md#getmanage_transaction_controls) | **GET** /vctc/programadmin//v1/configuration/transactiontypecontrols | 
[**postmanage_rule_configuration**](ProgAdminApi.md#postmanage_rule_configuration) | **POST** /vctc/programadmin//v1/sponsors/configuration | 
[**postmanage_transaction_controls**](ProgAdminApi.md#postmanage_transaction_controls) | **POST** /vctc/programadmin//v1/configuration/transactiontypecontrols | 
[**putmanage_rule_configuration**](ProgAdminApi.md#putmanage_rule_configuration) | **PUT** /vctc/programadmin//v1/sponsors/configuration | 
[**putmanage_transaction_controls**](ProgAdminApi.md#putmanage_transaction_controls) | **PUT** /vctc/programadmin//v1/configuration/transactiontypecontrols | 


# **deletemanage_rule_configuration**
> ManageRuleConfigurationdeleteResponse deletemanage_rule_configuration(manage_rule_configurationdelete_payload)



Delete the consumer transaction controls that the issuer has made avaiable to its cardholders

### Example 
```python
from __future__ import print_statement
import time
from src.apis.prog_admin_api import ProgAdminApi
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
api_instance = ProgAdminApi()

# Set all the required parameters in the deletemanage_rule_configuration. Look at the documentation for further clarification.
manage_rule_configurationdelete_payload = src.ManageRuleConfigurationdeletePayload() # ManageRuleConfigurationdeletePayload | request

try: 
    api_response = api_instance.deletemanage_rule_configuration(manage_rule_configurationdelete_payload)
    pprint(api_response)
except ApiException as e:
    print("Exception when calling ProgAdminApi->deletemanage_rule_configuration: %s\n" % e)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **manage_rule_configurationdelete_payload** | [**ManageRuleConfigurationdeletePayload**](ManageRuleConfigurationdeletePayload.md)| request | 

### Return type

[**ManageRuleConfigurationdeleteResponse**](ManageRuleConfigurationdeleteResponse.md)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[Back to top](#)   |   [Back to API list](../README.md#documentation-for-api-endpoints)   |   [Back to Model list](../README.md#documentation-for-models)   |   [Back to README](../README.md)

# **deletemanage_transaction_controls**
> ManageTransactionControlsdeleteResponse deletemanage_transaction_controls(manage_transaction_controlsdelete_payload)



Delete transaction type controls that the issuer has made available to its cardholders

### Example 
```python
from __future__ import print_statement
import time
from src.apis.prog_admin_api import ProgAdminApi
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
api_instance = ProgAdminApi()

# Set all the required parameters in the deletemanage_transaction_controls. Look at the documentation for further clarification.
manage_transaction_controlsdelete_payload = src.ManageTransactionControlsdeletePayload() # ManageTransactionControlsdeletePayload | request

try: 
    api_response = api_instance.deletemanage_transaction_controls(manage_transaction_controlsdelete_payload)
    pprint(api_response)
except ApiException as e:
    print("Exception when calling ProgAdminApi->deletemanage_transaction_controls: %s\n" % e)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **manage_transaction_controlsdelete_payload** | [**ManageTransactionControlsdeletePayload**](ManageTransactionControlsdeletePayload.md)| request | 

### Return type

[**ManageTransactionControlsdeleteResponse**](ManageTransactionControlsdeleteResponse.md)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[Back to top](#)   |   [Back to API list](../README.md#documentation-for-api-endpoints)   |   [Back to Model list](../README.md#documentation-for-models)   |   [Back to README](../README.md)

# **getmanage_rule_configuration**
> ManageRuleConfigurationgetResponse getmanage_rule_configuration()



Retrieve list of rule categories that issuer has made available to its cardholders

### Example 
```python
from __future__ import print_statement
import time
from src.apis.prog_admin_api import ProgAdminApi
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
api_instance = ProgAdminApi()

# Set all the required parameters in the getmanage_rule_configuration. Look at the documentation for further clarification.

try: 
    api_response = api_instance.getmanage_rule_configuration()
    pprint(api_response)
except ApiException as e:
    print("Exception when calling ProgAdminApi->getmanage_rule_configuration: %s\n" % e)
```

### Parameters
This endpoint does not need any parameter.

### Return type

[**ManageRuleConfigurationgetResponse**](ManageRuleConfigurationgetResponse.md)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[Back to top](#)   |   [Back to API list](../README.md#documentation-for-api-endpoints)   |   [Back to Model list](../README.md#documentation-for-models)   |   [Back to README](../README.md)

# **getmanage_transaction_controls**
> ManageTransactionControlsgetResponse getmanage_transaction_controls()



Retrieve the list of transaction type controls that the issuer has made available to its cardholders

### Example 
```python
from __future__ import print_statement
import time
from src.apis.prog_admin_api import ProgAdminApi
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
api_instance = ProgAdminApi()

# Set all the required parameters in the getmanage_transaction_controls. Look at the documentation for further clarification.

try: 
    api_response = api_instance.getmanage_transaction_controls()
    pprint(api_response)
except ApiException as e:
    print("Exception when calling ProgAdminApi->getmanage_transaction_controls: %s\n" % e)
```

### Parameters
This endpoint does not need any parameter.

### Return type

[**ManageTransactionControlsgetResponse**](ManageTransactionControlsgetResponse.md)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[Back to top](#)   |   [Back to API list](../README.md#documentation-for-api-endpoints)   |   [Back to Model list](../README.md#documentation-for-models)   |   [Back to README](../README.md)

# **postmanage_rule_configuration**
> ManageRuleConfigurationpostResponse postmanage_rule_configuration(manage_rule_configurationpost_payload)



Add new rule categories for use by issuer's cardholders

### Example 
```python
from __future__ import print_statement
import time
from src.apis.prog_admin_api import ProgAdminApi
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
api_instance = ProgAdminApi()

# Set all the required parameters in the postmanage_rule_configuration. Look at the documentation for further clarification.
manage_rule_configurationpost_payload = src.ManageRuleConfigurationpostPayload() # ManageRuleConfigurationpostPayload | request

try: 
    api_response = api_instance.postmanage_rule_configuration(manage_rule_configurationpost_payload)
    pprint(api_response)
except ApiException as e:
    print("Exception when calling ProgAdminApi->postmanage_rule_configuration: %s\n" % e)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **manage_rule_configurationpost_payload** | [**ManageRuleConfigurationpostPayload**](ManageRuleConfigurationpostPayload.md)| request | 

### Return type

[**ManageRuleConfigurationpostResponse**](ManageRuleConfigurationpostResponse.md)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[Back to top](#)   |   [Back to API list](../README.md#documentation-for-api-endpoints)   |   [Back to Model list](../README.md#documentation-for-models)   |   [Back to README](../README.md)

# **postmanage_transaction_controls**
> ManageTransactionControlspostResponse postmanage_transaction_controls(manage_transaction_controlspost_payload)



Add new transaction type controls for the issuer's cardholders

### Example 
```python
from __future__ import print_statement
import time
from src.apis.prog_admin_api import ProgAdminApi
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
api_instance = ProgAdminApi()

# Set all the required parameters in the postmanage_transaction_controls. Look at the documentation for further clarification.
manage_transaction_controlspost_payload = src.ManageTransactionControlspostPayload() # ManageTransactionControlspostPayload | request

try: 
    api_response = api_instance.postmanage_transaction_controls(manage_transaction_controlspost_payload)
    pprint(api_response)
except ApiException as e:
    print("Exception when calling ProgAdminApi->postmanage_transaction_controls: %s\n" % e)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **manage_transaction_controlspost_payload** | [**ManageTransactionControlspostPayload**](ManageTransactionControlspostPayload.md)| request | 

### Return type

[**ManageTransactionControlspostResponse**](ManageTransactionControlspostResponse.md)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[Back to top](#)   |   [Back to API list](../README.md#documentation-for-api-endpoints)   |   [Back to Model list](../README.md#documentation-for-models)   |   [Back to README](../README.md)

# **putmanage_rule_configuration**
> ManageRuleConfigurationputResponse putmanage_rule_configuration(manage_rule_configurationput_payload)



Update existing set of rule categories with a new set for use by issuer's cardholders

### Example 
```python
from __future__ import print_statement
import time
from src.apis.prog_admin_api import ProgAdminApi
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
api_instance = ProgAdminApi()

# Set all the required parameters in the putmanage_rule_configuration. Look at the documentation for further clarification.
manage_rule_configurationput_payload = src.ManageRuleConfigurationputPayload() # ManageRuleConfigurationputPayload | request

try: 
    api_response = api_instance.putmanage_rule_configuration(manage_rule_configurationput_payload)
    pprint(api_response)
except ApiException as e:
    print("Exception when calling ProgAdminApi->putmanage_rule_configuration: %s\n" % e)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **manage_rule_configurationput_payload** | [**ManageRuleConfigurationputPayload**](ManageRuleConfigurationputPayload.md)| request | 

### Return type

[**ManageRuleConfigurationputResponse**](ManageRuleConfigurationputResponse.md)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[Back to top](#)   |   [Back to API list](../README.md#documentation-for-api-endpoints)   |   [Back to Model list](../README.md#documentation-for-models)   |   [Back to README](../README.md)

# **putmanage_transaction_controls**
> ManageTransactionControlsputResponse putmanage_transaction_controls(manage_transaction_controlsput_payload)



Update existing set of transaction type controls with a new set for the issuer's cardholders

### Example 
```python
from __future__ import print_statement
import time
from src.apis.prog_admin_api import ProgAdminApi
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
api_instance = ProgAdminApi()

# Set all the required parameters in the putmanage_transaction_controls. Look at the documentation for further clarification.
manage_transaction_controlsput_payload = src.ManageTransactionControlsputPayload() # ManageTransactionControlsputPayload | request

try: 
    api_response = api_instance.putmanage_transaction_controls(manage_transaction_controlsput_payload)
    pprint(api_response)
except ApiException as e:
    print("Exception when calling ProgAdminApi->putmanage_transaction_controls: %s\n" % e)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **manage_transaction_controlsput_payload** | [**ManageTransactionControlsputPayload**](ManageTransactionControlsputPayload.md)| request | 

### Return type

[**ManageTransactionControlsputResponse**](ManageTransactionControlsputResponse.md)

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