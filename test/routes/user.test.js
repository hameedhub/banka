import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';

import app from '../../app';

chai.use(chaiHttp);

describe('POST/ User sign up', () => {
  it('should reject POST data if registered already', (done) => {
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
        expect(res.body.data).to.have.property('firstname');
        expect(res.body.data).to.have.property('lastname');
        expect(res.body.data).to.have.property('email');
        done();
      });
  });
});