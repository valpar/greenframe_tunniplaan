/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-expressions */
import request from 'supertest';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import app from '../../app';

const user = {
  email: 'koviid@mail.ee',
  password: 'Koviid',
};
let token: string;
let roomId: number;
const id = 9999;

describe('Room controller', () => {
  describe('GET /rooms', () => {
    it('responds with code 200 and token after login', async () => {
      const response = await request(app).post('/login').send(user);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.have.key('token');
      expect(response.body.token).to.be.a('string');
      token = response.body.token;
    });
    it('responds with code 200 and rooms information', async () => {
      const response = await request(app)
        .get('/rooms')
        .set('Authorization', `Bearer ${token}`);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.have.key('rooms');
      expect(response.body.rooms).to.be.a('array');
      expect(Object.keys(response.body.rooms).length).to.greaterThan(0);
    });
  });
  describe('POST /rooms', () => {
    it('responds with code 201 and sources id', async () => {
      const response = await request(app)
        .post('/rooms')
        .set('Authorization', `Bearer ${token}`)
        .send({
          room: 'mingruum 200',
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(201);
      expect(response.body).to.have.key('id');
      expect(response.body.id).to.be.a('number');
      roomId = response.body.id;
    });
    it('responds with code 400 and error message', async () => {
      const response = await request(app)
        .post('/rooms')
        .set('Authorization', `Bearer ${token}`)
        .send({});
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.equal('Room is missing');
    });
  });
  describe('PATCH /rooms/:id', () => {
    it('responds with code 204 and empty object', async () => {
      const response = await request(app)
        .patch(`/rooms/${roomId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          room: 'ruum 200',
        });
      expect(response.body).to.be.a('object');
      expect(response.body).to.be.empty;
      expect(response.statusCode).to.equal(204);
    });
    it('responds with code 400 and error message', async () => {
      const response = await request(app)
        .patch(`/rooms/${roomId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({});
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.equal('Nothing to update');
    });
    it('responds with code 400 and error message', async () => {
      const response = await request(app)
        .patch('/rooms/0')
        .set('Authorization', `Bearer ${token}`)
        .send({
          room: 'ruum 200',
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.equal('No valid id provided');
    });
    it('responds with code 400 and error message', async () => {
      const response = await request(app)
        .patch(`/rooms/${id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          room: 'ruum 200',
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.equal(`No room found with id: ${id}`);
    });
  });
  describe('GET /rooms/:id', () => {
    it('responds with code 200 and room information', async () => {
      const response = await request(app)
        .get(`/rooms/${roomId}`)
        .set('Authorization', `Bearer ${token}`);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.have.key('room');
      expect(response.body.room).to.be.a('object');
      expect(response.body.room).to.have.property('room', 'ruum 200');
    });
    it('responds with code 400 and error message', async () => {
      const response = await request(app)
        .get('/rooms/0')
        .set('Authorization', `Bearer ${token}`);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.equal('No valid id provided');
    });
    it('responds with code 400 and error message', async () => {
      const response = await request(app)
        .get(`/rooms/${id}`)
        .set('Authorization', `Bearer ${token}`);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.equal(`No room found with id: ${id}`);
    });
  });
  describe('DELETE /rooms/:id', () => {
    it('responds with code 204 and empty object', async () => {
      const response = await request(app)
        .delete(`/rooms/${roomId}`)
        .set('Authorization', `Bearer ${token}`);
      expect(response.body).to.be.a('object');
      expect(response.body).to.be.empty;
      expect(response.statusCode).to.equal(204);
    });
    it('responds with code 400 and error message', async () => {
      const response = await request(app)
        .delete('/rooms/0')
        .set('Authorization', `Bearer ${token}`);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.equal('No valid id provided');
    });
    it('responds with code 400 and error message', async () => {
      const response = await request(app)
        .delete(`/rooms/${id}`)
        .set('Authorization', `Bearer ${token}`);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('message');
      expect(response.body.message).to.equal(`Room not found with id: ${id}`);
    });
  });
});
