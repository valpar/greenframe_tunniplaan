import request from 'supertest';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import app from '../../app.ts';

describe('Ping controller', () => {
  describe('GET /ping', () => {
    it('respondse with code 200 and Alive message', async () => {
      const response = await request(app).get('/ping');
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.have.key('message');
      expect(response.body.message).to.equal('Alive');
    });
  });
});
