import chai, {expect} from 'chai';
import chaiHttp from 'chai-http';

import app from '../../app';

chai.use(chaiHttp);

const login = {
  email: 'hameed@gmail.com',
  password: '12345n',
};
let BearerToken = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW1haWwiOiJoYW1lZWRAZ21haWwuY29tIiwiaWF0IjoxNTU1NTkwMzg1LCJleHAiOjE1NTU2NzY3ODV9.4FJKArXeMbrF7BhQbo9Nw533TUPjvt9VYSJ2nqH6Fww`;   

describe('POST/ Create Account', ()=>{
  it('should be able to create account and get response', (done)=>{
    chai.request(app).post('/api/v1/accounts')
      .send({
        accountNumber: 3908080304,
        owner: 1,
        type: 'savings',
        openingBalance:  100,
      })
      .set('authorization', BearerToken)
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
});

describe('PATCH/ Account Status', ()=>{
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
      .set('authorization', BearerToken)
      .end((err, res)=>{
        expect(res).to.have.status(200);
        expect(res.body.status).to.eql(200);
        expect(res.body).to.be.an('object');
        expect(res.body.data).to.have.property('accountNumber');
        expect(res.body.data).to.have.property('status');
        done();
      })
  })
})
describe('DELETE/ Account', ()=>{
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
      .set('authorization', BearerToken)
      .end((err, res)=>{
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.eql(204);
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('message');
        done();
      })
  })
})