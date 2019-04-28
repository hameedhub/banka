import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

chai.use(chaiHttp);
const accNum = 7248551420;
describe('Transaction Test', () => {
    let token
    before('Login cashier before the transaction', (done) => {
        chai.request(app)
            .post('/api/v1/auth/signin')
            .send({
                email: 't@t.com',
                password: '12345'
            })
            .end((err, res) => {
                token = res.body.data[0].token;
                done();
            });
    })
    it('should be able to transaction by Id', (done) => {
        const id = 1;
        chai.request(app)
            .get(`/api/v1/transactions/${id}`)
            .set('authorization', `Bearer ${token}`)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.status).to.eql(200);
                expect(res.body).to.be.an('object');
                expect(res.body.data[0]).to.have.property('createdon');
                expect(res.body.data[0]).to.have.property('type');
                expect(res.body.data[0]).to.have.property('accountnumber');
                expect(res.body.data[0]).to.have.property('cashier');
                expect(res.body.data[0]).to.have.property('amount');
                expect(res.body.data[0]).to.have.property('oldbalance');
                expect(res.body.data[0]).to.have.property('newbalance');
                done();
            })
    })

    it('should be able to debit account', (done) => {
        const data = {
            amount: 100,
        }
        chai.request(app)
            .post(`/api/v1/transactions/${accNum}/debit`)
            .set('authorization', `Bearer ${token}`)
            .send(data)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.status).to.eql(200);
                expect(res.body).to.be.an('object');
                expect(res.body.data[0]).to.have.property('transactionId');
                expect(res.body.data[0]).to.have.property('accountNumber');
                expect(res.body.data[0]).to.have.property('amount');
                expect(res.body.data[0]).to.have.property('cashier');
                expect(res.body.data[0]).to.have.property('transactionType');
                expect(res.body.data[0]).to.have.property('accountBalance');
                done();
            })
    })
    it('should be able to credit account', (done) => {
        const data = {
            amount: 100,
        }
        chai.request(app)
            .post(`/api/v1/transactions/${accNum}/credit`)
            .send(data)
            .set('authorization', `Bearer ${token}`)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.status).to.eql(200);
                expect(res.body).to.be.an('object');
                expect(res.body.data[0]).to.have.property('transactionId');
                expect(res.body.data[0]).to.have.property('accountNumber');
                expect(res.body.data[0]).to.have.property('amount');
                expect(res.body.data[0]).to.have.property('cashier');
                expect(res.body.data[0]).to.have.property('transactionType');
                expect(res.body.data[0]).to.have.property('accountBalance');
                done();
            })
    })
    it('should send error if no amount', (done) => {
        const data = {}
        chai.request(app)
            .post(`/api/v1/transactions/${accNum}/credit`)
            .send(data)
            .set('authorization', `Bearer ${token}`)
            .end((err, res) => {
                expect(res).to.have.status(404);
                expect(res.body.status).to.eql(404);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('error');
                done();
            })
    })
    it('should not have access without token', (done) => {
        const data = {
            amount: 100,
        }
        chai.request(app)
            .post(`/api/v1/transactions/${accNum}/credit`)
            .send(data)
            .end((err, res) => {
                expect(res).to.have.status(401);
                expect(res.body.status).to.eql(401);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('message');
                done();
            })
    })
})