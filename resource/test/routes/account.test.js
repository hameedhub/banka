import chai, {expect} from 'chai';
import chaiHttp from 'chai-http';

import app from '../../app';

chai.use(chaiHttp);

describe('POST/ Create Account', ()=>{
  it('should be able to create account and get response', (done)=>{
    chai.request(app).post('/api/v1/accounts')
      .send({
        accountNumber: 3908080304,
        owner: 1,
        type: "savings",
        openingBalance:  100
      })
      .end((err, res)=>{
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.eql(201);
        expect(res.body.data).to.be.an('object');
        expect(res.body.data).to.have.property('accountNumber');
        expect(res.body.data).to.have.property('firstName');
        expect(res.body.data).to.have.property('lastName');
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