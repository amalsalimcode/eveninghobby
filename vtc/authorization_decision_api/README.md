# Authorization API
The Authorization Decision API enables an authorization processor to request an authorization decision recommendation based on cardholder rules configured in consumer transaction controls.  In addition, the API enables the authorization processor to update an authorization decision with the actual decision that was rendered. 

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
from src.apis.authorization_decision_api import AuthorizationDecisionApi
```

### Setuptools

Install via [Setuptools](http://pypi.python.org/pypi/setuptools).

```sh
python setup.py install --user
```
(or `sudo python setup.py install` to install the package for all users)

Then import the package:
```python
from src.apis.authorization_decision_api import AuthorizationDecisionApi
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
from src.apis.authorization_decision_api import AuthorizationDecisionApi
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
api_instance = AuthorizationDecisionApi()

# Set all the required parameters in the getdecision_request_actions. Look at the documentation for further clarification.
decision_id = 'decision_id_example' # str | The ID of the document for the document to be returned

try:
    api_response = api_instance.getdecision_request_actions(decision_id)
    pprint(api_response)
except ApiException as e:
    print("Exception when calling AuthorizationDecisionApi->getdecision_request_actions: %s\n" % e)
```

## Documentation for API Endpoints

All URIs are relative to *https://sandbox.api.visa.com*

Class | Method | HTTP request | Description
------------ | ------------- | ------------- | -------------
*AuthorizationDecisionApi* | [**getdecision_request_actions**](docs/AuthorizationDecisionApi.md#getdecision_request_actions) | **GET** /vctc/validation/v1/decisions/{decisionID} | 
*AuthorizationDecisionApi* | [**getdecisions_history**](docs/AuthorizationDecisionApi.md#getdecisions_history) | **GET** /vctc/validation/v1/decisions/history | 
*AuthorizationDecisionApi* | [**postdecision_inquiry**](docs/AuthorizationDecisionApi.md#postdecision_inquiry) | **POST** /vctc/validation/v1/consumertransactioncontrols/decisioninquiry | 
*AuthorizationDecisionApi* | [**postdecision_request**](docs/AuthorizationDecisionApi.md#postdecision_request) | **POST** /vctc/validation/v1/decisions | 
*AuthorizationDecisionApi* | [**postdecision_request_by_pan**](docs/AuthorizationDecisionApi.md#postdecision_request_by_pan) | **POST** /vctc/validation/v1/decisions/cardinquiry | 
*AuthorizationDecisionApi* | [**postpreevaluations**](docs/AuthorizationDecisionApi.md#postpreevaluations) | **POST** /vctc/validation/v1/preevaluations | 
*AuthorizationDecisionApi* | [**putdecision_request_actions**](docs/AuthorizationDecisionApi.md#putdecision_request_actions) | **PUT** /vctc/validation/v1/decisions/{decisionID} | 


## Documentation For Models

 - [CardDetail](docs/CardDetail.md)
 - [CollectionResourceDecisionHistoryResponse](docs/CollectionResourceDecisionHistoryResponse.md)
 - [CollectionResourceDecisionResponseType](docs/CollectionResourceDecisionResponseType.md)
 - [CollectionResourceDecisionUpdateModel](docs/CollectionResourceDecisionUpdateModel.md)
 - [CollectionResourceGetDecisionDocument](docs/CollectionResourceGetDecisionDocument.md)
 - [DecisionInquirypostPayload](docs/DecisionInquirypostPayload.md)
 - [DecisionInquirypostResponse](docs/DecisionInquirypostResponse.md)
 - [DecisionRequestActionsgetResponse](docs/DecisionRequestActionsgetResponse.md)
 - [DecisionRequestActionsputPayload](docs/DecisionRequestActionsputPayload.md)
 - [DecisionRequestActionsputResponse](docs/DecisionRequestActionsputResponse.md)
 - [DecisionRequestByPanpostPayload](docs/DecisionRequestByPanpostPayload.md)
 - [DecisionRequestByPanpostResponse](docs/DecisionRequestByPanpostResponse.md)
 - [DecisionRequestpostPayload](docs/DecisionRequestpostPayload.md)
 - [DecisionRequestpostResponse](docs/DecisionRequestpostResponse.md)
 - [DecisionResponse](docs/DecisionResponse.md)
 - [DecisionsHistorygetResponse](docs/DecisionsHistorygetResponse.md)
 - [MerchantInfo](docs/MerchantInfo.md)
 - [PaginationData](docs/PaginationData.md)
 - [PaymentToken](docs/PaymentToken.md)
 - [PointOfServiceInfo](docs/PointOfServiceInfo.md)
 - [PreevaluationspostPayload](docs/PreevaluationspostPayload.md)
 - [PreevaluationspostResponse](docs/PreevaluationspostResponse.md)
 - [PresentationData](docs/PresentationData.md)
 - [Resource](docs/Resource.md)
 - [TerminalClass](docs/TerminalClass.md)



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