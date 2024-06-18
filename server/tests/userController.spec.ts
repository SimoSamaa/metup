import { expect } from 'chai';
import sinon, { SinonStub } from 'sinon';
import { Request, Response } from 'express';
import * as userController from '../src/controllers/user';
import User from '../src/models/users';
import mongoose from 'mongoose';

describe('Auth Controller - [Login, register] ', () => {
  let stub: SinonStub;

  const userTestData = {
    firstName: "mohamed",
    lastName: "idbrahim",
    username: "mohamedTest",
    email: "test@test.com",
    password: "Test@1234",
    gender: "Male",
    bYear: "2000",
    bMonth: "5",
    bDay: "16",
    message: "User created successfully",
  };

  before(async () => {
    await mongoose
      .connect(
        'mongodb+srv://simo:klSzt3umhvw0A3GD@cluster0.6iew5xq.mongodb.net/METUP-TEST'
      );

    const user = new User({ ...userTestData });
    await user.save();
  });

  it('should throw an error with code 500 if database fails', async () => {
    stub = sinon.stub(User, 'findOne');
    stub.throws();

    const res = {} as Response;
    const req = {
      body: {
        email: 'test@test.com',
        password: 'tester'
      }
    } as Request;

    const result = await userController.login(req, res, () => { });
    expect(result).to.be.an('error');
    expect(result).to.have.property('statusCode', 500);
    stub.restore();
  });

  it('should send a response 201 if the user created', async () => {
    let resJsonMess: any;
    const req = {} as Request;
    const res = {
      statusCode: 500,
      status(code: number) {
        this.statusCode = code;
        return this;
      },
      json(data: any) {
        resJsonMess = data;
        return data;
      }
    } as Response;

    res.status(201).json({ ...userTestData });

    userController.register(req, res, () => { });
    expect(res).to.have.property('statusCode', 201);
    expect(resJsonMess).to.have.property('message', 'User created successfully');
  });

  after(async () => {
    await User.deleteMany({});
    await mongoose.disconnect();
  });
});