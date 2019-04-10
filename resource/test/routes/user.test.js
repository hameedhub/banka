import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';

import app from '../../app';

chai.use(chaiHttp);

describe('/GET users', () => {
  it('should GET all users', (done) => {
    chai.request(app)
      .get('/api/v1/users')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res).to.have.status(200);
        expect(res.body.status).to.equal(200);
        expect(res.body.data).to.be.a('array');
        done();
      });
  });
});

describe('/GET/:id User', () => {
  it('should GET a user by id', (done) => {
    let user = {
      id: 1,
      firstName: 'Hameed',
      lastName: 'Abdul',
      email: 'hameed@gmail.com',
      password: 'password',
    };
    chai.request(app)
      .get('/api/v1/users/'+user.id)
      .send(user)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res).to.have.status(200);
        expect(res.body.status).to.equal(200);
        expect(res.body.data).to.have.property('firstName');
        expect(res.body.data).to.have.property('lastName');
        expect(res.body.data).to.have.property('email');
        expect(res.body.data).to.have.property('password');
        done();
      });
  });
});

describe('POST/ User sign up', () => {
  it('expect POST of user data', (done) => {
    let user = {
      firstName: 'Hameed',
      lastName: 'Abdul',
      email: 'hameed@gmail.com',
      password: 'password',
    };
    chai.request(app)
      .post('/api/v1/users/auth/signup')
      .send(user)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res).to.have.status(201);
        expect(res.body.status).to.equal(201);
        expect(res.body.data).to.have.property('firstName');
        expect(res.body.data).to.have.property('lastName');
        expect(res.body.data).to.have.property('email');
        expect(res.body.data).to.have.property('password');
        done();
      });
  });
});

describe('POST/ User Login', () => {
  it('expect user POST to login', (done) => {
    let user = {
      email: 'hameed@gmail.com',
      password: '1235n'
    };
    chai.request(app)
      .post('/api/v1/users/auth/login')
      .send(user)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res).to.have.status(200);
        expect(res.body.status).to.equal(200);
        expect(res.body.data).to.have.property('email');
        expect(res.body.data).to.have.property('password');
        done();
      });
  });
});

describe('GET/ User Email', () => {
  it('expect user email to send token to', (done) => {
    chai.request(app)
      .post('/api/v1/users/auth/token')
      .send({email: 'hameed@gmail.com'})
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res).to.have.status(200);
        expect(res.body.status).to.equal(200);
        expect(res.body).to.have.property('message');
        done();
      });
  });
});

// COMMENT OUT BCRYPT HASH BEFOR RUN
describe('PATCH/ Reset Password', ()=>{
  it('expect password with email', (done)=>{
    let tokenMail = {email: 'hameed@gmail.com'};
    chai.request(app)
      .patch('/api/v1/users/auth/token/'+tokenMail.email)
      .send(tokenMail)
      .end((err, res)=>{
        expect(res).to.have.a.status(200);
        expect(res.body.status).to.eql(200);
        expect(res.body).to.have.property('message');
        done();
      })
  })
})

describe('DELETE/ User', ()=>{
  it('expect to DELETE user by id', (done)=>{
    let user = {
      id: 1,
      firstName: 'Hameed',
      lastName: 'Abdul',
      email: 'hameed@gmail.com',
      password: 'password',
    };
    chai.request(app)
      .delete('/api/v1/users/'+user.id)
      .send(user)
      .end((err, res)=>{
        expect(res).to.have.status(204);
        done();
      })
  })
})