import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';

import app from '../../app';

chai.use(chaiHttp);

describe('POST/ User sign up', () => {
  it('should POST user data', (done) => {
    const user = {
      firstname: 'Hameed',
      lastname: 'Abdul',
      email: 'h@gmail.com',
      password: '12345n',
      type: 'client',
      isAdmin: true,
    };
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res).to.have.status(201);
        expect(res.body.status).to.equal(201);
        expect(res.body.data).to.have.property('firstname');
        expect(res.body.data).to.have.property('lastname');
        expect(res.body.data).to.have.property('email');
        done();
      });
  });
});


describe('POST/ User Signin', () => {
  it('should be able to login user', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'hameed@gmail.com',
        password: '12345n'
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