/* eslint-disable import/first */
require('dotenv').config();

import request from 'supertest';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import app from '../../app';

describe('Room Controller', () => {
  describe('GET /rooms', () => {
    console.log('Database Host:', process.env.DB_HOST);
    console.log('Database Port:', process.env.DB_PORT);
    it('should fetch all rooms with status 200', async () => {
      const response = await request(app).get('/rooms');
      expect(response.status).to.equal(200);
      expect(response.body).to.be.an('object');
      // expect(response.body).to.have.property('rooms');
      // expect(response.body.rooms).to.be.an('array');
      console.log(response.body);
    });
  });
});
