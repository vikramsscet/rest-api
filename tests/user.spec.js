const UserModel = require('../user/model/User');
const User = require('../user/User');
const sinon = require('sinon');
const mongoose = require('mongoose');
const chai = require('chai');
const expect = chai.expect;
const { users: usersData } = require('./fixtures/user');

describe('Test user handlers', function () {
    let mongooseConnnectStub;
    let UserService = new User();
    beforeEach(() => {
        mongooseConnnectStub = sinon.stub(mongoose, 'connect').resolves({ connections: [{ readyState: true }] });
    });

    afterEach(() => {
        mongooseConnnectStub.restore();
    });

    describe('get all users', () => {
        let findUserStub;

        beforeEach(() => {
            findUserStub = sinon.stub(UserModel, 'find').resolves(usersData);
        });

        afterEach(() => {
            findUserStub.restore();
        });

        it('get all users', function (done) {
            UserService.getAll().then((data) => {
                expect(data).to.equal(usersData);
                done('error test');
            }).catch(err => {
                console.log(err);
                done(err);
            })
        });
    })


    describe('register user', () => {
        let createUserStub;
        let findOneUserStub;
        let newUserData = {
            name: 'testuser1',
            email: 'test1.raogmail.com',
            password: 'password'
        }
        beforeEach(() => {
            createUserStub = sinon.stub(UserModel, 'create').resolves(usersData[0]);
            findOneUserStub = sinon.stub(UserModel, 'findOne').resolves();
        });

        afterEach(() => {
            createUserStub.restore();
            findOneUserStub.restore();
        });

        it('register valid user', function (done) {
            UserService.register(newUserData).then((data) => {
                expect(data).to.have.all.keys(['auth', 'token']);
                done();
            }).catch(err => {
                console.log(err);
                done(err);
            });
        });

        it('should not allow new user with existing email', function (done) {
            findOneUserStub.restore();
            findOneUserStub = sinon.stub(UserModel, 'findOne').resolves(usersData[0]);

            UserService.register(newUserData).then((data) => {
                done(data);
            }).catch(err => {
                expect(err.toString()).to.contain('UserModel with that email exists.')
                done();
            });
        });

        it('should return validation error for password', function (done) {
            findOneUserStub.restore();
            findOneUserStub = sinon.stub(UserModel, 'findOne').resolves(usersData[0]);
            let newUserDataTemp = { ...newUserData };
            newUserDataTemp.password = 'pass';
            UserService.register(newUserDataTemp).then((data) => {
                done(data);
            }).catch(err => {
                expect(err.toString()).to.contain('Password error. Password needs to be longer than 8 characters.');
                done();
            });
        });

        it('should return validation error for username', function (done) {
            let newUserDataTemp = { ...newUserData };
            newUserDataTemp.name = 'temp';
            UserService.register(newUserDataTemp).then((data) => {
                done(data);
            }).catch(err => {
                expect(err.toString()).to.contain('Username error. Username needs to longer than 5 characters');
                done();
            });
        });

        it('should return validation error for email', function (done) {
            let newUserDataTemp = { ...newUserData };
            delete newUserDataTemp.email;
            UserService.register(newUserDataTemp).then((data) => {
                done(data);
            }).catch(err => {
                expect(err.toString()).to.contain('Email error. Email must have valid characters.');
                done();
            });
        });

    });

    describe('user login', () => {

        let findOneUserStub;

        beforeEach(() => {
            findOneUserStub = sinon.stub(UserModel, 'findOne').resolves(usersData[0]);
        });

        afterEach(() => {
            findOneUserStub.restore();
        });

        it('should be able to login', function (done) {
            UserService.login({ email: 'testuser', password: 'password' }).then((data) => {
                expect(data).to.have.all.keys(['auth', 'token']);
                done();
            }).catch(err => {
                done(err);
            });
        });

        it('returns error if email does not exists', function (done) {
            findOneUserStub.restore();
            findOneUserStub = sinon.stub(UserModel, 'findOne').resolves();
            UserService.login({ email: 'testuser', password: 'password' }).then((data) => {
                done(data);
            }).catch(err => {
                expect(err.toString()).to.contain('User with that email does not exits.');
                done();
            });
        });
    })

    describe('get loged in user /me', () => {

        let findOneUserStub;

        beforeEach(() => {
            findOneUserStub = sinon.stub(UserModel, 'findOne').resolves(usersData[0]);
        });

        afterEach(() => {
            findOneUserStub.restore();
        });

        it('should be able to login', function (done) {
            UserService.login({ email: 'testuser', password: 'password' }).then((data) => {
                expect(data).to.have.all.keys(['auth', 'token']);
                done();
            }).catch(err => {
                done(err);
            });
        });

        it('returns error if email does not exists', function (done) {
            findOneUserStub.restore();
            findOneUserStub = sinon.stub(UserModel, 'findOne').resolves();
            UserService.login({ email: 'testuser', password: 'password' }).then((data) => {
                done(data);
            }).catch(err => {
                expect(err.toString()).to.contain('User with that email does not exits.');
                done();
            });
        });
    })

});