```sh

# enter mongo shell
kubectl exec -it <pod_name> -- /bin/bash
mongosh

# query
show collections
db.todos.find()

db.todos.insertOne({
    "title": "Buy groceries",
    "status": "pending",
})


# getting logs
kubectl get pods 
kubectl logs -f <pod_name>
```

