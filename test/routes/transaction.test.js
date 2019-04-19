import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

chai.use(chaiHttp);

let BearerToken = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW1haWwiOiJoYW1lZWRAZ21haWwuY29tIiwiaWF0IjoxNTU1NTkwMzg1LCJleHAiOjE1NTU2NzY3ODV9.4FJKArXeMbrF7BhQbo9Nw533TUPjvt9VYSJ2nqH6Fww`;  
describe('POST/ Debit Transaction', ()=>{
  it('should be able to debit account', (done)=>{
    const accNum = 58897676867;
    const data = {
      amount: 100,
      cashier: 1
    }
    chai.request(app)    
      .post(`/api/v1/transactions/${accNum}/debit`)
      .set('authorization', BearerToken)
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
      .set('authorization', BearerToken)
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