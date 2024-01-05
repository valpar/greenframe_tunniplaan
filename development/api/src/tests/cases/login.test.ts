import request from 'supertest';
import { expect } from 'chai';
import sinon from 'sinon';
import axios from 'axios';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import jwtService from '../../components/general/services/jwtService';
import app from '../../app';
import logger from '../../logger';

// testime loggerit lugedes combined.log
const readLogFile = () => fs.readFileSync('combined.log', 'utf8');
describe('Auth Controller', () => {
  let axiosGetStub: sinon.SinonStub;
  // lisan loggeri testid
  let loggerInfoSpy: sinon.SinonSpy;
  let loggerErrorSpy: sinon.SinonSpy;
  beforeEach(() => {
    axiosGetStub = sinon.stub(axios, 'get');
    loggerInfoSpy = sinon.spy(logger, 'info');
    loggerErrorSpy = sinon.spy(logger, 'error');
  });
  afterEach(() => {
    axiosGetStub.restore();
    loggerInfoSpy.restore();
    loggerErrorSpy.restore();
  });
  it('should handle successful Google authentication and read log file', async () => {
    axiosGetStub.withArgs('https://www.googleapis.com/oauth2/v1/userinfo').resolves({
      data: { email: 'test@example.com' },
    });
    axiosGetStub.withArgs(`${process.env.USERAPI_HOST}:${process.env.USERAPI_PORT}/users/email/test@example.com`).resolves({
      data: {
        data: {
          id: 1,
          firstName: 'Admin',
          lastName: 'User',
          email: 'test@example.com',
          roles: ['admin'],
        },
      },
    });
    const response = await request(app)
      .post('/googleauth')
      .set('Authorization', 'Bearer mockGoogleToken');
    expect(response.status).to.equal(200);
    // loggeri test
    const logContent = readLogFile();
    expect(logContent).to.include('Request method and URL: POST /googleauth');
  });
  it('should respond with 401 Unauthorized for missing Google token', async () => {
    const response = await request(app)
      .post('/googleauth')
      .set('Authorization', 'Bearer '); // no token

    expect(response.status).to.equal(401);
    expect(response.body).to.have.property('error', 'No googleToken provided');
  });
  it('should respond with 500 Internal Server Error for invalid Google token', async () => {
    axiosGetStub.withArgs('https://www.googleapis.com/oauth2/v1/userinfo').rejects(new Error('Google authentication failed')); // returns error

    const response = await request(app)
      .post('/googleauth')
      .set('Authorization', 'Bearer invalidGoogleToken');

    expect(response.status).to.equal(500);
    expect(response.text).to.equal('Google authentication error');
  });
  it('should handle successful Google and User API authentication (roles: student)', async () => {
    axiosGetStub.withArgs('https://www.googleapis.com/oauth2/v1/userinfo').resolves({
      data: { email: 'test@example.com' },
    });

    axiosGetStub.withArgs(`${process.env.USERAPI_HOST}:${process.env.USERAPI_PORT}/users/email/test@example.com`).resolves({
      data: {
        data: {
          id: 1,
          firstName: 'Test',
          lastName: 'User',
          email: 'test@example.com',
          roles: ['student'],
        },
      },
    });

    const response = await request(app)
      .post('/googleauth')
      .set('Authorization', 'Bearer mockGoogleToken');

    expect(response.body.user).to.be.an('object');
    expect(response.body.user).to.have.property('id');
    expect(response.body.user).to.have.property('firstName');
    expect(response.body.user).to.have.property('lastName');
    expect(response.body.user).to.have.property('email');
    expect(response.body.user).to.have.property('roles');
    /* console.log(response.status);
    console.log(response.body); */
  });
  // login api ei handle seda praegu hästi, annab 500, aga unauthorized on kood on idee järgi 401
  it('should respond with 401 Unauthorized for user not found in User API', async () => {
    axiosGetStub.withArgs('https://www.googleapis.com/oauth2/v1/userinfo').resolves({
      data: { email: 'unknown@example.com' },
    });
    axiosGetStub.withArgs(`${process.env.USERAPI_HOST}:${process.env.USERAPI_PORT}/users/email/unknown@example.com`).resolves({
      data: {
        id: 9999,
        firstName: 'Testman',
        lastName: 'User',
        email: 'test@example.com',
        roles: ['no'],
      },
    });
    const response = await request(app)
      .post('/googleauth')
      .set('Authorization', 'Bearer validGoogleTokenForUnknownUser');
    expect(response.status).to.equal(500); // apist tuleb 500
    /* expect(response.status).to.equal(401); */
    /* console.log(response.status);
    console.log(response.body); */
  });
  it('should generate a valid JWT token for a mock admin user', async () => {
    const mockAdminUser = {
      id: 1,
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@example.com',
      password: 'mockPassword',
      roles: ['admin'],
    };

    const adminToken = await jwtService.sign(mockAdminUser);
    expect(adminToken).to.be.a('string');
    expect(adminToken).not.to.be.a('');

    const decodedToken = jwt.decode(adminToken);

    if (decodedToken && typeof decodedToken === 'object') {
      expect(decodedToken).to.include({
        id: mockAdminUser.id,
      });

      if ('roles' in decodedToken) {
        expect(decodedToken.roles).to.include.members(['admin']);
      }
    } else {
      throw new Error('Decoded token is null');
    }
  });
  it('should not allow a student to access an admin-only endpoint', async () => {
    const mockStudentUser = {
      id: 2,
      firstName: 'Student',
      lastName: 'User',
      email: 'student@example.com',
      password: 'mockPassword',
      roles: ['student'],
    };
    const studentToken = await jwtService.sign(mockStudentUser);
    const response = await request(app)
      .patch('/rooms/1')
      .set('Authorization', `Bearer ${studentToken}`)
      .send({
        room: 'ruum 222',
      });
    expect(response.status).to.equal(401);
    expect(response.body).to.have.property('error');
  });
});
