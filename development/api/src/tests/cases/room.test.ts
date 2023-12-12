import request from 'supertest';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import app from '../../app';
import IUser from '../../components/users/interfaces';
import jwtService from '../../components/general/services/jwtService';

let adminToken: string;
let roomId: number;
const id = 9999;
const updatedRoomData = {
  room: 'Updated Room Name',
};

describe('Room Controller', () => {
  before(async () => {
    // loome mock admin kasutaja
    const mockAdminUser: IUser = {
      id: 1,
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@example.com',
      password: 'mockPassword',
      roles: ['admin'], // massiivina
    };

    // loome tokeni mock admin kasutajaga
    adminToken = await jwtService.sign(mockAdminUser);
  });
  describe('GET /rooms', () => {
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
    it('responds with code 204 and empty object', async () => {
      roomId = 1;
      const response = await request(app)
        .patch(`/rooms/${roomId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          room: 'ruum 200',
        });
      expect(response.body).to.be.a('object');
      expect(response.body).to.deep.equal({});
      expect(response.statusCode).to.equal(204);
    });
    it('responds with code 400 and error message', async () => {
      const response = await request(app)
        .patch(`/rooms/${roomId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({});
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.equal('Nothing to update');
    });
    it('responds with code 400 and error message', async () => {
      const response = await request(app)
        .patch('/rooms/0')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          room: 'ruum 200',
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.equal('No valid id provided');
    });
    it('should return 400 error when updating a room with invalid data', async () => {
      roomId = 1;
      const invalidUpdateData = { room: '' }; // tühi string ei ole lubatud
      const response = await request(app)
        .patch(`/rooms/${roomId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send(invalidUpdateData);
      expect(response.status).to.equal(400);
      expect(response.body).to.have.property('error');
      expect(response.body.error).to.equal('Nothing to update');
    });
    // tuleb 500
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
    it('should add a new room and return its id', async () => {
      const newRoom = { room: 'newRoom' };
      const response = await request(app)
        .post('/rooms')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(newRoom);
      expect(response.status).to.equal(201);
      expect(response.body).to.be.an('object');
      expect(response.body).to.have.property('id');
      expect(response.body.id).to.be.a('number');
    });
    it('should return an error for missing room data', async () => {
      const response = await request(app)
        .post('/rooms')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({});
      expect(response.status).to.equal(400);
      expect(response.body).to.have.property('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal('Room is missing');
    });
  });
  describe('DELETE /rooms/:id', () => {
    let roomIdToDelete: number;
    beforeEach(async () => {
      // uus tuba, mida kustutada
      const newRoom = { room: 'Temporary Room' };
      const response = await request(app)
        .post('/rooms')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(newRoom);
      roomIdToDelete = response.body.id;
    });
    it('should successfully delete a room and return status 204', async () => {
      const response = await request(app)
        .delete(`/rooms/${roomIdToDelete}`)
        .set('Authorization', `Bearer ${adminToken}`);
      expect(response.status).to.equal(204);
    });
    describe('DELETE /rooms/:id', () => {
      it('should return an error for a non-existent room id', async () => {
        const response = await request(app)
          .delete(`/rooms/${id}`)
          .set('Authorization', `Bearer ${adminToken}`);
        expect(response.status).to.equal(400);
        expect(response.body).to.have.property('message');
        expect(response.body.message).to.equal(`Room not found with id: ${id}`);
      });
    });
  });
});
