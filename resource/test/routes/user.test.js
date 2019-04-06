const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('./../../app');

chai.use(chaiHttp);

let should = chai.should();


// GET USERS TEST
describe('/GET users', () => {
  it('should GET all users', (done) => {
    chai.request(app)
      .get('/api/v1/users')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });
});

// GET USER BY ID
describe('/GET/:id User', () => {
it('should GET a user by id', (done) => {
    let user = {
      id: 1,
      email: 'hameed@gmail.com',
      firstName: 'Hameed',
      lastName: 'Abdul',
    };
    chai.request(app)
      .get('/api/v1/users/'+user.id)
      .send(user)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });
});

// POST USER
// NB: PLEASE ENSURE TO COMMENT OUT VALIDATION RESULT BEFORE RUNNING TEST
describe('/POST user', () => {
  it('should POST user', (done) => {
    let data = { id: 1, email: 'hameed@gmail.com', firstName: 'Hameed' };
    chai.request(app)
      .post('/api/v1/users')
      .send(data)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        done();
      });
  });
});

// PUT USER
// NB: PLEASE ENSURE TO COMMENT OUT VALIDATION RESULT BEFORE RUNNING TEST
describe('/PUT/:id User', () => {
  it('should PUT a user by id', (done) => {
    let user = {
      id: 1,
      email: 'hameed@gmail.com',
      firstName: 'Hameed',
      lastName: 'Abdul',
    };
    chai.request(app)
      .put('/api/v1/users/'+user.id)
      .send(user)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });
});

// DELETE USER
// NB: PLEASE ENSURE TO COMMENT OUT VALIDATION RESULT BEFORE RUN
describe('/DELETE/:id User', () => {
  it('should DELETE a user by id', (done) => {
    let user = {
      id: 1,
      email: 'hameed@gmail.com',
      firstName: 'Hameed',
      lastName: 'Abdul',
    };
    chai.request(app)
      .delete('/api/v1/users/'+user.id)
      .send(user)
      .end((err, res) => {
        res.should.have.status(500);
        res.body.should.be.a('object');
        done();
      });
  });
});
