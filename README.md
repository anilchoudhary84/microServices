# microServices
MIcroSerivices using kafka, zookeeper, mongo, nginx, express

clone project on local machine, 
turn on docker, 
execute command - docker-compose build
execute command - docker-compose up



Project details (Developer):

there are total 4 Microservices built in this project, 
Dependencies (Env setup):
1. Zookeeper,
2. Kafka
3. MongoDB

Core services:
1. SSO:- the service is responsible to handle user creation , login, Token verification API document can be found at localhost:80/SSO/docs
2. Transaction service:- this service is responsible to add banking transactions including CR/DR in mongo DB and publish the same transaction on Kafka publisher API document can be found at localhost:80/transactions/docs
3. Report Service:-  this service is responsible for consuming the published kafka streams by common topic , the service is also converting the currencies , all entred transactions in different currencies will be returned in single required currency along with converted value and filtered by month and user Iban.API document can be found at localhost:80/reports/docs
4. Nginx service:- this service is placed on top of all services to perform service registery tasks, for masking the routes, the service will expose single port and based on basePath requests will be redirected to the specific service .



Project details (User)
step 1. download docker-compose.yml file on local Machine and run following commands:

1. docker-compose build
2. docker-compose up
3. go to http://localhost/sso/docs/ for sso documentation(Swagger UI)
4. go to http://localhost/reports/docs/ for reports documentation(Swagger UI)
5. go to http://localhost/transactions/docs/ for transactions documentation(Swagger UI)

