const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('./../../app');

chai.use(chaiHttp);

let should = chai.should();


// GET TRANSACTIONS TEST
describe('/GET transactions', () => {
  it('should GET all transactions', (done) => {
    chai.request(app)
      .get('/api/v1/transactions')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });
});

// GET TRANSACTION BY ID
describe('/GET/:id transaction', () => {
it('should GET transaction by id', (done) => {
    let trans = {
      id: 1,
      type: 'credit',
    };
    chai.request(app)
      .get('/api/v1/transactions/'+trans.id)
      .send(trans)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });
});

// POST TRANSACTION
// NB: PLEASE ENSURE TO COMMENT OUT VALIDATION RESULT BEFORE THIS TEST
describe('/POST transaction', () => {
  it('should POST transaction', (done) => {
    let trans = { id: 1, type: 'debit' };
    chai.request(app)
      .post('/api/v1/transactions')
      .send(trans)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        done();
      });
  });
});

// DELETE TRANSACTION
describe('/DELETE/:id transaction', () => {
  it('should DELETE transaction by id', (done) => {
    let trans = {
      id: 1,
      type: 'credit',
    };
    chai.request(app)
      .delete('/api/v1/transactions/'+trans.id)
      .send(trans)
      .end((err, res) => {
        res.should.have.status(204);
        res.body.should.be.a('object');
        done();
      });
  });
});
