import chai, {expect} from 'chai';
import chaiHttp from 'chai-http';

import app from '../../app';

chai.use(chaiHttp);

describe('Account Test', ()=>{
  let token;
  before('Login staff before test runs', (done)=> {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'hameed@gmail.com',
        password: '12345n'
      })
      .end((err, res)=> {
        token =res.body.data.token;
        done();
      });
  });
  it('should be able to create account and get response', (done)=>{
    chai.request(app).post('/api/v1/accounts')
      .send({
        accountNumber: 3908080304,
        owner: 1,
        type: 'savings',
        openingBalance:  100,
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
        done();
      });
  });
  it('should be able to change account status', (done)=>{
    const accNum = {
      id: 1,
      accountNumber: 3812381012,
      type: 'savings',
      status: 'active'
    }
    chai.request(app)
      .patch('/api/v1/accounts/'+accNum.accountNumber)
      .send(accNum)
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
    const accNum = {
      accountNumber: 3812381012,
    }
    chai.request(app)
      .get(`/api/v1/accounts/${accNum.accountNumber}/transactions`)
      .set('authorization', `Bearer ${token}`)
      .end((err, res)=>{
        expect(res).to.have.status(200);
        expect(res.body.status).to.eql(200);
        expect(res.body).to.be.an('object');
        expect(res.body.data).to.have.an('array');
        done();
      })
  });
  it('should delete account',(done)=>{
    const accNum = {
      id: 1,
      accountNumber: 3812381012,
      createdOn: '2019-06-06T21:43:27.124Z',
      owner: 3,
      type: 'savings',
      status: 'active',
      balance: 81000.00,
    };
    chai.request(app)
      .delete('/api/v1/accounts/'+accNum.accountNumber)
      .send(accNum)
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
  it('should be able view all accounts by specific user', (done)=>{
    const email = 'youngds2u@gmail.com'
    chai.request(app)
      .get(`/api/v1/user/${email}/accounts`)
      .set('authorization', `Bearer ${token}`)
      .end((err, res)=>{
        expect(res).to.have.status(200);
        expect(res.body.status).to.eql(200);
        expect(res.body).to.be.an('object');
        expect(res.body.accounts).to.have.an('array');
        expect(res.body.accounts[0]).to.have.property('accountNumber');
        expect(res.body.accounts[0]).to.have.property('createdOn');
        expect(res.body.accounts[0]).to.have.property('ownerEmail');
        expect(res.body.accounts[0]).to.have.property('type');
        expect(res.body.accounts[0]).to.have.property('status');
        expect(res.body.accounts[0]).to.have.property('balance');
        done();
      })
  });
  it('should be able view account details', (done)=>{
    const account = 58897676867;
    chai.request(app)
      .get(`/api/v1/accounts/${account}`)
      .set('authorization', `Bearer ${token}`)
      .end((err, res)=>{
        expect(res).to.have.status(200);
        expect(res.body.status).to.eql(200);
        expect(res.body).to.be.an('object');
        expect(res.body.data).to.have.an('object');
        expect(res.body.data).to.have.property('accountNumber');
        expect(res.body.data).to.have.property('createdOn');
        expect(res.body.data).to.have.property('ownerEmail');
        expect(res.body.data).to.have.property('type');
        expect(res.body.data).to.have.property('status');
        expect(res.body.data).to.have.property('balance');
        done();
      })
  });
});