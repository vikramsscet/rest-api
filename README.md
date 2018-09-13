# note-rest-api

## Run serverless in local environment
  ```npm run run-offline```
  
## Run test in local environment
 ```npm run test```
  
## Sample output
```
Serverless: Routes for verify-token:
Serverless: (none)

Serverless: Routes for login:
Serverless: POST /login

Serverless: Routes for register:
Serverless: POST /register

Serverless: Routes for me:
Serverless: GET /me
Serverless: Configuring Authorization: me verify-token

Serverless: Routes for getUsers:
Serverless: GET /users
Serverless: Configuring Authorization: users verify-token

Serverless: Routes for create:
Serverless: POST /notes
Serverless: Configuring Authorization: notes verify-token

Serverless: Routes for getOne:
Serverless: GET /notes/{id}
Serverless: Configuring Authorization: notes/{id} verify-token

Serverless: Routes for getAll:
Serverless: GET /notes
Serverless: Configuring Authorization: notes verify-token

Serverless: Routes for update:
Serverless: PUT /notes/{id}
Serverless: Configuring Authorization: notes/{id} verify-token

Serverless: Routes for delete:
Serverless: DELETE /notes/{id}
Serverless: Configuring Authorization: notes/{id} verify-token
```

## [POSTMAN Link](https://www.getpostman.com/collections/06dc48a54f25349d09e3)
