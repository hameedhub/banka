### Banka Application

Banka is light weight application that power banking operations.
User can signup and create an account,
Staff can credit and debit the account and also view all transactions
Admin can create new admin/ staff and all view all transactins

#### Features
- User can signup and create an account
- User can view account transaction history
- User can view a specific account transaction,
- Staff can credit and debit user accounts
- Admin/staff can view all user accounts
- Admin/staff can view a specific user account
- Admin/staff can activate or deativate an account.
- Admin/staff can delete a specific user account.
- Admin can create staff and admin user accounts
- User can also reset password
- Integration of real time email notification upon credit/debit transaction on user aaccount

#### Installation
- Clone the repo and change directory **UI/** to view the user interface 

##### User Interface structure
| Folder | content | 
| ----------- | ----------- | 
|  user | login.html  signup.html dashboard.html create-account.html transaction.html | 
|  staff | login.html dashboard.html view-account.html view-details.html | 
| admin | login.html dashboard.html staff-list.html view-account.html view-details.html | 




- cd to resource, open terminal on resource and **RUN** npm install to install all the dependencies
- Run **node app** to start the API

#### Technologies
The following framework and tools were used:
- Nodejs
- Express
- mocha
- chai
- babel

### API Endpoints
API endpoints present enable one to
- Signup and Login
- Create an account
- View all account and transactions
- Credit and debit user account
- Activate or deactive an account
- Delete an account, transaction and user

#### API User Endpoint
| Endpoint | Functionality | Routes |
| ----------- | ----------- | ----------- |
| GET /users | Get all user | /api/v1/users |
| GET /users/:id | Fetch single user by id | /api/v1/users/:id |
| POST /users | Create a new user | /api/v1/users |
| PUT /users/:id | To make change on user | /api/v1/users/:id |
| DELETE /users/:id | Delete a user by id | /api/v1/users/:id |

#### API Account Endpoint
| Endpoint | Functionality | Routes |
| ----------- | ----------- | ----------- |
| GET /accounts | Get all accounts | /api/v1/accounts |
| GET /account/:id | Fetch single account by id | /api/v1/accounts/:id |
| POST /account | Create a new account | /api/v1/accounts |
| PATCH /account/:id | Change the status of the account | /api/v1/accounts/:id |
| DELETE /account/:id | Delete a account based on supplied id | /api/v1/accounts/:id |

#### API Transaction Endpoint
| Endpoint | Functionality | Routes |
| ----------- | ----------- | ----------- |
| GET /transactions | Get all transaction | /api/v1/transactions |
| GET /transactions/:id | Fetch single transaction by id | /api/v1/transactions/:id |
| POST /transactions | Create a new transaction | /api/v1/transaction |
| DELETE /transactions/:id | Delete a transaction based on supplied id | /api/v1/transactions/:id |

### Testing API endpoint
- Install Nodejs, have Postman
- clone the repo and open terminal from the **resource folder**
- Run **npm install** to install all the dependencies
- Run **node app** to start the app and test with Postman

### Helpful Resources / Credits
Some of the helpful resources during this project includes:
- Background image was from google images 
- www.w3school.com (creating collapsable, filter search and model)
- Medium Programming - Application structure and versioning the Andela way
- redhat.com Kendall Totten Reduce, Reuse, Recycle MODULAR CSS
- TraversyMedia.com git Crash Course by Brad Traversy
- github repo Andela naming convenstion
- Coding Garden with CJ 

### Author
Hameed Abdulrahaman

