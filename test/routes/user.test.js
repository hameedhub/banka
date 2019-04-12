import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';

import app from '../../app';

chai.use(chaiHttp);

describe('POST/ User sign up', () => {
  it('should POST user data', (done) => {
    const user = {
      firstName: 'Hameed',
      lastName: 'Abdul',
      email: 'h@gmail.com',
      password: '12345n'
    };
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res).to.have.status(201);
        expect(res.body.status).to.equal(201);
        expect(res.body.data).to.have.property('firstName');
        expect(res.body.data).to.have.property('lastName');
        expect(res.body.data).to.have.property('email');
        done();
      });
  });
});

// this test may fail due to bcrypt
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
        expect(res.body.data).to.have.property('firstName');
        expect(res.body.data).to.have.property('lastName');
        expect(res.body.data).to.have.property('email');
        done();
      });
  });
});