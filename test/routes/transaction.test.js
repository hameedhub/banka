import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

chai.use(chaiHttp);

describe('POST/ Debit Transaction', ()=>{
  it('should be able to debit account', (done)=>{
    const accNum = 58897676867;
    const data = {
      amount: 100,
      cashier: 1
    }
    chai.request(app)    
      .post(`/api/v1/transactions/${accNum}/debit`)
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
})

describe('POST/ Credit Transaction', ()=>{
  it('should be able to credit account', (done)=>{
    const accNum = 58897676867;
    const data = {
      amount: 100,
      cashier: 1
    }
    chai.request(app)    
      .post(`/api/v1/transactions/${accNum}/credit`)
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
})