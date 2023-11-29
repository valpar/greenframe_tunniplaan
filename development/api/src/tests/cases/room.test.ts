/* eslint-disable import/first */
// require('dotenv').config();

import request from 'supertest';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import app from '../../app';

describe('Room Controller', () => {
  // let token: string;
  let roomId: number;
  const id = 9999;
  const updatedRoomData = {
    room: 'Updated Room Name',
  };
  describe('GET /rooms', () => {
    /* console.log('Database Host:', process.env.DB_HOST);
    console.log('Database Port:', process.env.DB_PORT); */
    it('should fetch all rooms with status 200', async () => {
      const response = await request(app).get('/rooms');
      expect(response.status).to.equal(200);
      expect(response.body).to.be.an('object');
      expect(response.body).to.have.property('rooms');
      expect(response.body.rooms).to.be.an('array');
    });
  });
  describe('GET /rooms/:id', () => {
    it('should return a room for a valid id', async () => {
      const validId = 1;
      const response = await request(app).get(`/rooms/${validId}`);
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('room');
    });
    it('should return an error for an invalid id', async () => {
      const invalidId = 'invalid';
      const response = await request(app).get(`/rooms/${invalidId}`);
      expect(response.status).to.equal(400);
      expect(response.body).to.have.property('error');
    });
  });
  describe('PATCH /rooms/:id', () => {
    /* it('responds with code 204 and empty object', async () => {
      const response = await request(app)
        .patch(`/rooms/${roomId}`)
        // .set('Authorization', `Bearer ${token}`)
        .send({
          room: 'ruum 200',
        });
      expect(response.body).to.be.a('object');
      expect(response.body).to.be.empty;
      expect(response.statusCode).to.equal(204);
    }); */
    /* it('responds with code 400 and error message', async () => {
      const response = await request(app)
        .patch(`/rooms/${roomId}`)
        // .set('Authorization', `Bearer ${token}`)
        .send({});
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.equal('Nothing to update');
    }); */
    /* it('responds with code 400 and error message', async () => {
      const response = await request(app)
        .patch('/rooms/0')
        // .set('Authorization', `Bearer ${token}`)
        .send({
          room: 'ruum 200',
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.equal('No valid id provided');
    }); */
    /* it('responds with code 400 and error message', async () => {
      const response = await request(app)
        .patch(`/rooms/${id}`)
        // .set('Authorization', `Bearer ${token}`)
        .send({
          room: 'ruum 200',
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.equal(`No room found with id: ${id}`);
    }); */
  });
  describe('POST /rooms', () => {
    /* it('should add a new room and return its id', async () => {
      const newRoom = 'newRoom';
      const response = await request(app).post('/rooms').send(newRoom);
      expect(response.status).to.equal(201);
      expect(response.body).to.have.property('id');
    }); */
    it('should return an error for missing room data', async () => {
      const response = await request(app).post('/rooms').send({});
      expect(response.status).to.equal(400);
      expect(response.body).to.have.property('error');
    });
  });
});
