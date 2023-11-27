import request from 'supertest';
import { expect } from 'chai';
import sinon from 'sinon';
import axios from 'axios';
import app from '../../app';

describe('Auth Controller', () => {
  let axiosGetStub: sinon.SinonStub;
  beforeEach(() => {
    axiosGetStub = sinon.stub(axios, 'get');
  });
  afterEach(() => {
    axiosGetStub.restore();
  });
  it('should handle successful Google authentication', async () => {
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
          roles: ['user'],
        },
      },
    });
    const response = await request(app)
      .post('/googleauth')
      .set('Authorization', 'Bearer mockGoogleToken');
    expect(response.status).to.equal(200);
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
  /* it('should respond with 401 Unauthorized for user not found in User API', async () => {
    axiosGetStub.withArgs('https://www.googleapis.com/oauth2/v1/userinfo').resolves({
      data: { email: 'unknown@example.com' },
    });
    axiosGetStub.withArgs(`${process.env.USERAPI_HOST}:${process.env.USERAPI_PORT}/users/email/unknown@example.com`).resolves({
      data: null, // User not found
    });
    const response = await request(app)
      .post('/googleauth')
      .set('Authorization', 'Bearer validGoogleTokenForUnknownUser');
    expect(response.status).to.equal(401);
    expect(response.body).to.have.property('error', 'Authentication failed. User not found.');
  }); */
});
