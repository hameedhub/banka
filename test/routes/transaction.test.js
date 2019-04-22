import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

chai.use(chaiHttp);

describe('Transaction Test', ()=>{
  let token
  before('Login cashier before the transaction', (done)=>{
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'test@staff.com',
        password: '12345'
      })
      .end((err, res)=> {
        token =res.body.data.token;
        done();
      });
  })
  it('should be able to transaction by Id', (done)=>{
    const id = 1;
    chai.request(app)    
      .get(`/api/v1/transactions/${id}`)
      .set('authorization', `Bearer ${token}`)
      .end((err, res)=>{
        expect(res).to.have.status(200);
        expect(res.body.status).to.eql(200);
        expect(res.body).to.be.an('object');
        expect(res.body.data).to.have.property('createdOn');
        expect(res.body.data).to.have.property('type');
        expect(res.body.data).to.have.property('accountNumber');
        expect(res.body.data).to.have.property('cashier');
        expect(res.body.data).to.have.property('amount');
        expect(res.body.data).to.have.property('oldBalance');
        expect(res.body.data).to.have.property('newBalance');
        done();
      })
  })

  it('should be able to debit account', (done)=>{
    const accNum = 58897676867;
    const data = {
      amount: 100,
      cashier: 1
    }
    chai.request(app)    
      .post(`/api/v1/transactions/${accNum}/debit`)
      .set('authorization', `Bearer ${token}`)
      .send(data)
      .end((err, res)=>{
        expect(res).to.have.status(201);
        expect(res.body.status).to.eql(201);
        expect(res.body).to.be.an('object');
        expect(res.body.data).to.have.property('accountNumber');
        expect(res.body.data).to.have.property('amount');
        expect(res.body.data).to.have.property('cashier');
        expect(res.body.data).to.have.property('transactionType');
        expect(res.body.data).to.have.property('accountBalance');
        done();
      })
  })
  it('should be able to credit account', (done)=>{
    const accNum = 58897676867;
    const data = {
      amount: 100,
      cashier: 1
    }
    chai.request(app)    
      .post(`/api/v1/transactions/${accNum}/credit`)
      .send(data)
      .set('authorization', `Bearer ${token}`)
      .end((err, res)=>{
        expect(res).to.have.status(201);
        expect(res.body.status).to.eql(201);
        expect(res.body).to.be.an('object');
        expect(res.body.data).to.have.property('accountNumber');
        expect(res.body.data).to.have.property('amount');
        expect(res.body.data).to.have.property('cashier');
        expect(res.body.data).to.have.property('transactionType');
        expect(res.body.data).to.have.property('accountBalance');
        done();
      })
  })
})
