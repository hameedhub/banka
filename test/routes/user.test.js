import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';

import app from '../../app';

chai.use(chaiHttp);

describe('POST/ User sign up', () => {
  it('should reject POST if email exist already', (done) => {
    const user = {
      firstname: 'Test',
      lastname: 'Test',
      email: 'test@test.com',
      password: '12345',
      type: 'client',
      isAdmin: true,
    };
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res).to.have.status(400);
        expect(res.body.status).to.equal(400);
        done();
      });
  });
  it('should reject POST if firstname is less than 3', (done) => {
    const user = {
      firstname: 'ok',
      lastname: 'Test',
      email: 'test@test.com',
      password: '12345',
      type: 'client',
      isAdmin: true,
    };
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res).to.have.status(404);
        expect(res.body.status).to.equal(404);
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('error');
        done();
      });
  });
  it('should reject POST if email is not valid', (done) => {
    const user = {
      firstname: 'ok',
      lastname: 'Test',
      email: 'testest.com',
      password: '12345',
      type: 'client',
      isAdmin: true,
    };
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res).to.have.status(404);
        expect(res.body.status).to.equal(404);
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('error');
        done();
      });
  });
  it('should reject POST if field  is not completed', (done) => {
    const user = {
      firstname: 'Test',
      lastname: 'Test',
      email: 'test@test.com',
      password: '12345',
      type: 'client',
    };
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res).to.have.status(404);
        expect(res.body.status).to.equal(404);
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('error');
        done();
      });
  });
  it('should reject POST if password is not string', (done) => {
    const user = {
      firstname: 'test',
      lastname: 'Test',
      email: 'test@test.com',
      password: 1232324,
      type: 'client',
      isAdmin: true,
    };
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res).to.have.status(404);
        expect(res.body.status).to.equal(404);
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('error');
        done();
      });
  });
  it('should welcome user to banka api', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res).to.have.status(200);
        expect(res.body.status).to.equal(200);
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('message');
        done();
      });
  });
  
});


describe('POST/ User Signin', () => {
  it('should be able to login user', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'test@client.com',
        password: '12345'
      })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res).to.have.status(200);
        expect(res.body.status).to.equal(200);
        expect(res.body.data[0]).to.have.property('firstname');
        expect(res.body.data[0]).to.have.property('lastname');
        expect(res.body.data[0]).to.have.property('email');
        done();
      });
  });
  it('should not allow user to login if the email not an email', (done)=>{
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'notanemail',
        password: '12345'
      })
      .end((err, res)=>{
        expect(res.body).to.be.an('object');
        expect(res).to.have.status(404);
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('error');
        done();
      })
  })
  it('should not allow user to login if the email not provided', (done)=>{
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send({
        password: '12345'
      })
      .end((err, res)=>{
        expect(res.body).to.be.an('object');
        expect(res).to.have.status(404);
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('error');
        done();
      })
  })
  it('should not allow user to login if password incorrect', (done)=>{
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'test@test.com',
        password: '1324232345'
      })
      .end((err, res)=>{
        expect(res.body).to.be.an('object');
        expect(res).to.have.status(404);
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('error');
        done();
      })
  })
});