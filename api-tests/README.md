# API Tests

Postman collection testing the [Reqres](https://reqres.in) public REST API — 
a free API built for practicing API testing and automation.

Covers:
- GET single user (happy path)
- GET non-existent user (negative case — expects 404)
- GET user list with pagination check
- POST create user
- PUT update user
- DELETE user

Each request includes test assertions (status codes and response body 
validation) written using Postman's test scripting.

## How to run
Import `reqres-collection.json` into Postman (File → Import), then either 
run requests individually or use Collection Runner to run the full set.