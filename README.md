[![Build Status](https://travis-ci.org/hameedhub/banka.svg?branch=develop)](https://travis-ci.org/hameedhub/banka) [![Coverage Status](https://coveralls.io/repos/github/hameedhub/banka/badge.svg?branch=develop)](https://coveralls.io/github/hameedhub/banka?branch=develop)  [![Maintainability](https://api.codeclimate.com/v1/badges/68b3330f4e7128e27401/maintainability)](https://codeclimate.com/github/hameedhub/hameedhub.github.io/maintainability)  

# Banka
> A light weight banking application

Banka is a web application with operations like user (client) sign up, signin, creation of bank account, deposit and withdrawals.

## Installing / Getting started
Brief introduction on how to run the application. Clone the repo and RUN the following lines of code on your terminal directly on the folder.

```shell
npm install --To install all dependencies 
npm start   --To run the application
```

Here you should say what actually happens when you execute the code above.


### Initial Configuration

Install Node JS which should come with a node package manager. It is the required environment for the application
Open the node command prompt or any of your favourite command tool and type ``` node --version``` to check if it installed
cd .. or change directory to the clone repo and type ``` npm install ```


## Developing

Procedure for further development of this application:

```shell
git clone https://github.com/hameedhub/hameedhub.github.io.git
cd banka
npm install
```
All the required package to run and develop the application are to be installed in order to have smooth run.

### Built with

* Node Js - The web frame work
* npm - The package manager
* Mocha and Chai - Testing

### Building

In additional, this application is written in ES6 which have some atypical syntax. Hence, may not run on some platform. Babel node, babel cli, babel-register and babel-preset-env should be installed to build the application to ES5

```shell
.start: babel-node app.js
npm start
```

RUN npm start on the clone repo, then babel builds it into later version, which can run in most platforms.

### Deploying / Publishing

In deploying this project to Heroku, install Heroku ci after you might signup. To check if it is properly install RUN ```heroku --version ``` to get the current version in use. To deploy RUN the following command prompt


```shell
$ heroku login i
$ heroku create <application name>
$ git remote -v 
$ git push heroku master 

```

```login i ``` enable you to login into heroku through the terminal interface, after providing the signup details, ```$heroku create with <application name>``` to create the application remote address linked with github then push to git push heroku

## UI Features

The user interface (UI/UX) pages include:
* A user (client) sign up page
* A user (client) sign in page
* A user (client) page to create account
* User can view acccount transaction history
* Staff login page
* Staff (cashier) can debit user (client) account.
* Staff (cashier) can credit user (client) account.
* Adminn login page
* Admin/staff can view all user accounts.
* Admin/staff can view a specific user account.
* Admin/staff can activate or deactivate an account.
* Admin/staff can delete a specific user account.
* Admin can create staff and admin user accounts.


## Configuration / API Endpoints

Here are the API endpoints, it only allows json format and the expected output are also in json format.

### Create user account
#### POST /api/v1/auth/signup

Required fields :
firstName: `String`  
lastName: `'String`
email: `String`  
password: `'String`

On success response
```shell
{
    “status” : Integer ,
    “data” : {
    “token” : “45erkjherht45495783”
    “id” : Integer , // id of newly created user
    “firstName” : String ,
    “lastName” : String ,
    “email” : String 
    }
} 
```
Error response
```shell
{
    “status” : 404 ,
    “error” : “relevant-error-message”
} 
```
Entry
```shell
{
    {
    “id” : Integer ,
    “email” : String ,
    “firstName” : String ,
    “lastName” : String ,
    “password” : String ,
    “type” : String , // client or staff
    “isAdmin” : Boolean , // must be a staff user account
    }
} 
```

Heroku Link POST
https://hameed-banka-api.herokuapp.com/api/v1/auth/signup

### User Login
#### POST /api/v1/auth/signin

Required fields :
email: `String`  
password: `'String`

On success response
```shell
{
    “status” : Integer ,
    “data” : {
    “token” : “45erkjherht45495783”
    “id” : Integer , // user id
    “firstName” : String ,
    “lastName” : String ,
    “email” : String 
  }
}
```
Error response
```shell
{
    “status” : 404 ,
    “error” : “relevant-error-message”
} 
```

Heroku Link POST
https://hameed-banka-api.herokuapp.com/api/v1/auth/signin

### Create a bank account
#### POST /api/v1/accounts

Required fields :
owner: `Integer`  
accountNumber: `'Integer`
type: `'String`
openingBalance: `'Integer`

On success response
```shell
{
  “status” : Integer ,
  “data” : {
  “accountNumber” : Number ,
  “firstName” : String , // account owner first name
  “lastName” : String , // account owner last name
  “email” : String , // account owner email
  “type” : String , // savings, current
  “openingBalance” : Float 
  }
}
```
Error response
```shell
{
    “status” : 404 ,
    “error” : “relevant-error-message”
} 
```

Heroku Link POST
https://hameed-banka-api.herokuapp.com/api/v1/accounts

### Activate or Deactivate bank account
#### PATCH /api/v1/accounts/<account-number>

Required fields :
status: `String`  

On success response
```shell
{
  {
  “status” : Integer ,
  “data” : {
  “accountNumber” : Integer , // user unique id
  “status” : String , // active or dormant
  }
}
```
Error response
```shell
{
    “status” : 404 ,
    “error” : “relevant-error-message”
} 
```

Heroku Link PATCH
https://hameed-banka-api.herokuapp.com/api/v1/accounts/<account-number>

### Delete a specific account 
#### DELETE /api/v1/accounts/<account-number>

Required fields :
 `{}`  

On success response
```shell
{
  {
  “status” : Integer ,
  “message” : ”Account successfully deleted”
  }
}
```
Error response
```shell
{
    “status” : 404 ,
    “error” : “relevant-error-message”
} 
```

Heroku Link DELETE
https://hameed-banka-api.herokuapp.com/api/v1/accounts/<account-number>
  
### Debit a bank account
#### POST /api/v1/transactions/<account-number>/debit
  
 Required fields :
 amount: `Integer`  
 cashier: `'Integer` 

On success response
```shell
{
    “status” : Integer ,
    “data” : {
    “transactionId”: Integer ,
    “accountNumber” : String ,
    “amount” : Float ,
    “cashier” : Integer , // cashier that consumated the transaction
    “transactionType” : String,
    “accountBalance” : String,
    }
}
```
Error response
```shell
{
    “status” : 404 ,
    “error” : “relevant-error-message”
} 
```

Heroku Link POST
https://hameed-banka-api.herokuapp.com/api/v1/transactions/<account-number>/debit
  
### Credit a bank account
#### POST /api/v1/transactions/<account-number>/debit

Required fields :
 amount: `Integer`  
 cashier: `'Integer` 

On success response
```shell
{
    “status” : Integer ,
    “data” : {
    “transactionId”: Integer ,
    “accountNumber” : String ,
    “amount” : Float ,
    “cashier” : Integer , // cashier that consumated the transaction
    “transactionType” : String ,
    “accountBalance” : String,
    }
}
```
Error response
```shell
{
    “status” : 404 ,
    “error” : “relevant-error-message”
} 
```

Heroku Link POST
https://hameed-banka-api.herokuapp.com/api/v1/transactions/<account-number>/credit


## Contributing

If you'd like to contribute, please fork the repository and make a feature
branch. I accept all forms of feedback. Thanks!

The code style guide is eslint airbnb

## Links

- Project homepage: https://github.com/hameedhub/hameedhub.github.io
- Repository: https://github.com/hameedhub/hameedhub.github.io.git
- Deployment: https://hameed-banka-api.herokuapp.com/api/v1/


## Licensing

The code in this project is licensed under MIT license.

## Acknowledgement

* Google images (background image)
* npm Documentation on each package used.
* w3school.com (modal, filter search and collapsable)
* CJ Code Garden (CRUD , Express and Unit Testing)
* Andela (Git naming convension and best practices)
* Kendall Totten (Reduce, Reuse, Recycle - Modular CSS)
etc..