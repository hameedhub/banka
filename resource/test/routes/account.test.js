const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('./../../app');

chai.use(chaiHttp);

let should = chai.should();


// GET ACCOUNT TEST
describe('/GET accounts', () => {
  it('should GET all accounts', (done) => {
    chai.request(app)
      .get('/api/v1/accounts')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });
});

// GET ACCOUNT BY ID
// NB: COMMNENT OUT THE JSON RESPONSE
describe('/GET/:id account', () => {
it('should GET account by id', (done) => {
    let account = {
      id: 1,
      accountNumber: 7897907988,
    };
    chai.request(app)
      .get('/api/v1/accounts/'+account.id)
      .send(account)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });
});

// POST ACCOUNT
// NB: PLEASE ENSURE TO COMMENT OUT VALIDATION RESULT BEFORE THIS TEST
describe('/POST account', () => {
  it('should POST account', (done) => {
    let account = { id: 1, accountNumber: 80980898080 };
    chai.request(app)
      .post('/api/v1/accounts')
      .send(account)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        done();
      });
  });
});

// PATCH ACCOUNT
// NB: PLEASE ENSURE TO COMMENT OUT VALIDATION RESULT BEFORE RUNNING TEST
describe('/PATCH/:id account', () => {
  it('should PATCH account by id', (done) => {
    let account = {
      id: 1,
      status: 'active',
    };
    chai.request(app)
      .patch('/api/v1/users/'+account.id)
      .send(account)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });
});

// DELETE ACCOUNT
// NB: PLEASE ENSURE TO COMMENT OUT VALIDATION RESULT BEFORE RUN
describe('/DELETE/:id account', () => {
  it('should DELETE account by id', (done) => {
    let account = {
      id: 1,
      accountNumber: 87987979879,
    };
    chai.request(app)
      .delete('/api/v1/account/'+account.id)
      .send(account)
      .end((err, res) => {
        res.should.have.status(500);
        res.body.should.be.a('object');
        done();
      });
  });
});
