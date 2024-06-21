```sh

# building and pushing docker image to registry
docker build -t luffy .
docker tag luffy:latest amalsalim/luffy:latest
docker push amalsalim/luffy:latest

minikube start
minikube dashboard

kubectl apply -f deployment.yaml
kubectl apply -f service.yaml

kubectl get services
kubectl get pods

# To get ip to access service
minikube service <luffy>

# get logs
kubectl get pods 
kubectl logs -f <pod_name>

# curl command to add todo in post request
curl --location '<minikube-service-ip:port>/todos' \
--header 'Content-Type: application/json' \
--data '{
    "title": "hello world",
    "description": "this is an intro to coding magic"
}'

# other
kubectl get deployments
kubectl describe deployment <deployment_name>
```

