import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import app from '../../app';

chai.use(chaiHttp);
const accNum = 4323575979;
const login = {
    email: 'test@admin.com',
    password: '12345',
};

describe('Account Test', () => {
    let token;
    let createAccount;
    before('Login staff before test runs', (done) => {
        chai.request(app)
            .post('/api/v1/auth/signin')
            .send(login)
            .end((err, res) => {
                token = res.body.data[0].token;
                done();
            });
    });
    it('should be able to get all users account', (done) => {
        chai.request(app).get('/api/v1/accounts')
            .set('authorization', `Bearer ${token}`)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body.status).to.eql(200);
                expect(res.body.data).to.be.an('array');
                done();
            });
    });

    it('should be able to change account status', (done) => {
        chai.request(app)
            .patch(`/api/v1/accounts/${accNum}`)
            .send({
                status: 'active',
            })
            .set('authorization', `Bearer ${token}`)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.status).to.eql(200);
                expect(res.body).to.be.an('object');
                expect(res.body.data[0]).to.have.property('accountNumber');
                expect(res.body.data[0]).to.have.property('status');
                done();
            });
    });
    it('should return invalid status property', (done) => {
        chai.request(app)
            .patch(`/api/v1/accounts/${accNum}`)
            .send({
                status: 'notactive',
            })
            .set('authorization', `Bearer ${token}`)
            .end((err, res) => {
                expect(res).to.have.status(404);
                expect(res.body.status).to.eql(404);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('status');
                expect(res.body).to.have.property('error');
                done();
            });
    });
    it('should be able to get account transactions', (done) => {
        chai.request(app)
            .get('/api/v1/accounts/7248551420/transactions')
            .set('authorization', `Bearer ${token}`)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                done();
            });
    });
    it('should be able view all accounts by specific user', (done) => {
        chai.request(app)
            .get('/api/v1/user/test@staff.com/accounts')
            .set('authorization', `Bearer ${token}`)
            .end((err, res) => {
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
            });
    });
    it('should be able view account details', (done) => {
        chai.request(app)
            .get(`/api/v1/accounts/${accNum}`)
            .set('authorization', `Bearer ${token}`)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.status).to.eql(200);
                expect(res.body).to.be.an('object');
                expect(res.body.data[0]).to.have.an('object');
                expect(res.body.data[0]).to.have.property('accountnumber');
                expect(res.body.data[0]).to.have.property('createdon');
                expect(res.body.data[0]).to.have.property('owneremail');
                expect(res.body.data[0]).to.have.property('type');
                expect(res.body.data[0]).to.have.property('status');
                expect(res.body.data[0]).to.have.property('balance');
                done();
            });
    });
    it('should throw error without correct account number', (done) => {
        chai.request(app)
            .get('/api/v1/accounts/000000')
            .set('authorization', `Bearer ${token}`)
            .end((err, res) => {
                expect(res).to.have.status(404);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('status');
                expect(res.body).to.have.property('error');
                done();
            });
    });

    it('should be able view active account', (done) => {
        chai.request(app)
            .get('/api/v1/accounts?status=active')
            .set('authorization', `Bearer ${token}`)
            .end((err, res) => {
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
            });
    });
    it('should be able view dormant account', (done) => {
        chai.request(app)
            .get('/api/v1/accounts?status=dormant')
            .set('authorization', `Bearer ${token}`)
            .end((err, res) => {
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
            });
    });
    it('should send error if status is not correct', (done) => {
        chai.request(app)
            .get('/api/v1/accounts?status=dorma')
            .set('authorization', `Bearer ${token}`)
            .end((err, res) => {
                expect(res).to.have.status(404);
                expect(res.body.status).to.eql(404);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('status');
                expect(res.body).to.have.property('error');
                done();
            });
    });
    it('should be able to create account', (done) => {
        chai.request(app).post('/api/v1/accounts')
            .send({
                type: 'savings',
                openingBalance: 1000,
            })
            .set('authorization', `Bearer ${token}`)
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res.body).to.be.an('object');
                expect(res.body.status).to.eql(201);
                expect(res.body.data).to.be.an('array');
                expect(res.body.data[0]).to.have.property('accountNumber');
                expect(res.body.data[0]).to.have.property('firstname');
                expect(res.body.data[0]).to.have.property('lastname');
                expect(res.body.data[0]).to.have.property('email');
                expect(res.body.data[0]).to.have.property('type');
                expect(res.body.data[0]).to.have.property('openingBalance');
                createAccount = res.body.data[0].accountNumber;
                done();
            });
    });
    it('should provide account type', (done) => {
        chai.request(app).post('/api/v1/accounts')
            .send({
                openingBalance: 1000,
            })
            .set('authorization', `Bearer ${token}`)
            .end((err, res) => {
                expect(res).to.have.status(404);
                expect(res.body).to.be.an('object');
                expect(res.body.status).to.eql(404);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('error');
                done();
            });
    });
    it('should delete account', (done) => {
        chai.request(app)
            .delete(`/api/v1/accounts/${createAccount}`)
            .set('authorization', `Bearer ${token}`)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body.status).to.eql(204);
                expect(res.body).to.have.property('status');
                expect(res.body).to.have.property('message');
                done();
            });
    });
});