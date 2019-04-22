import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import app from '../../app';

chai.use(chaiHttp);
const accNum = 7444872889;
const login ={
  email: 'test@staff.com',
  password: '12345'
}

describe('Account Test', ()=>{
  let token;
  let createAccount;
  before('Login staff before test runs', (done)=> {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(login)
      .end((err, res)=> {
        token =res.body.data.token;
        done();
      });
  });
  it('should be able to get all users account', (done)=>{
    chai.request(app).get('/api/v1/accounts')
      .set('authorization', `Bearer ${token}`)
      .end((err, res)=>{
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.eql(200);
        expect(res.body.data).to.be.an('array');
        done();
      });
  });
  it('should be able to change account status', (done)=>{
    chai.request(app)
      .patch(`/api/v1/accounts/${accNum}`)
      .send({
        status: 'active'
      })
      .set('authorization', `Bearer ${token}`)
      .end((err, res)=>{
        expect(res).to.have.status(200);
        expect(res.body.status).to.eql(200);
        expect(res.body).to.be.an('object');
        expect(res.body.data).to.have.property('accountNumber');
        expect(res.body.data).to.have.property('status');
        done();
      })
  });
  it('should be able to get account transactions', (done)=>{
    chai.request(app)
      .get(`/api/v1/accounts/${accNum}/transactions`)
      .set('authorization', `Bearer ${token}`)
      .end((err, res)=>{
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        done();
      })
  });
  it('should be able view all accounts by specific user', (done)=>{
    chai.request(app)
      .get(`/api/v1/user/test@staff.com/accounts`)
      .set('authorization', `Bearer ${token}`)
      .end((err, res)=>{
        expect(res).to.have.status(200);
        expect(res.body.status).to.eql(200);
        expect(res.body).to.be.an('object');
        expect(res.body.accounts).to.have.an('array');
        expect(res.body.accounts[0]).to.have.property('accountnumber');
        expect(res.body.accounts[0]).to.have.property('createdon');
        expect(res.body.accounts[0]).to.have.property('owneremail');
        expect(res.body.accounts[0]).to.have.property('type');
        expect(res.body.accounts[0]).to.have.property('status');
        expect(res.body.accounts[0]).to.have.property('balance');
        done();
      })
  });
  it('should be able view account details', (done)=>{
    chai.request(app)
      .get(`/api/v1/accounts/${accNum}`)
      .set('authorization', `Bearer ${token}`)
      .end((err, res)=>{
        expect(res).to.have.status(200);
        expect(res.body.status).to.eql(200);
        expect(res.body).to.be.an('object');
        expect(res.body.data).to.have.an('object');
        expect(res.body.data).to.have.property('accountnumber');
        expect(res.body.data).to.have.property('createdon');
        expect(res.body.data).to.have.property('owneremail');
        expect(res.body.data).to.have.property('type');
        expect(res.body.data).to.have.property('status');
        expect(res.body.data).to.have.property('balance');
        done();
      })
  });
  it('should be able view active account', (done)=>{
    chai.request(app)
      .get(`/api/v1/accounts?status=active`)
      .set('authorization', `Bearer ${token}`)
      .end((err, res)=>{
        expect(res).to.have.status(200);
        expect(res.body.status).to.eql(200);
        expect(res.body).to.be.an('object');
        expect(res.body.data).to.have.an('array');
        expect(res.body.data[0]).to.have.property('accountnumber');
        expect(res.body.data[0]).to.have.property('createdon');
        expect(res.body.data[0]).to.have.property('owneremail');
        expect(res.body.data[0]).to.have.property('type');
        expect(res.body.data[0]).to.have.property('status');
        expect(res.body.data[0]).to.have.property('balance');
        done();
      })
  });
  it('should be able view dormant account', (done)=>{
    chai.request(app)
      .get(`/api/v1/accounts?status=dormant`)
      .set('authorization', `Bearer ${token}`)
      .end((err, res)=>{
        expect(res).to.have.status(200);
        expect(res.body.status).to.eql(200);
        expect(res.body).to.be.an('object');
        expect(res.body.data).to.have.an('array');
        expect(res.body.data[0]).to.have.property('accountnumber');
        expect(res.body.data[0]).to.have.property('createdon');
        expect(res.body.data[0]).to.have.property('owneremail');
        expect(res.body.data[0]).to.have.property('type');
        expect(res.body.data[0]).to.have.property('status');
        expect(res.body.data[0]).to.have.property('balance');
        done();
      })
  });
  it('should be able to create account and get response', (done)=>{
    chai.request(app).post('/api/v1/accounts')
      .send({
        type: 'savings',
        openingBalance:  1000
      })
      .set('authorization', `Bearer ${token}`)
      .end((err, res)=>{
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.eql(201);
        expect(res.body.data).to.be.an('object');
        expect(res.body.data).to.have.property('accountNumber');
        expect(res.body.data).to.have.property('firstname');
        expect(res.body.data).to.have.property('lastname');
        expect(res.body.data).to.have.property('email');
        expect(res.body.data).to.have.property('type');
        expect(res.body.data).to.have.property('openingBalance');
        createAccount = res.body.data.accountNumber;
        done();
      });
  });
  it('should delete account',(done)=>{
    chai.request(app)
      .delete(`/api/v1/accounts/${createAccount}`)
      .set('authorization', `Bearer ${token}`)
      .end((err, res)=>{
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.eql(204);
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('message');
        done();
      })
  })
});
