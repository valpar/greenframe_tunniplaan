import { Request, Response } from 'express';
import responseCodes from '../general/responseCodes';
import roomService from './service';

const roomController = {
  // try catch proov
  getAllRooms: async (req: Request, res: Response) => {
    try {
      const rooms = await roomService.getAllRooms();
      return res.status(responseCodes.ok).json({ rooms });
    } catch (error) {
      console.error('Error in getAllRooms controller:', error);
      return res.status(responseCodes.ServerError).json({ error: 'Server error' });
    }
  },
  /* getAllRooms: async (req: Request, res: Response) => {
    const rooms = await roomService.getAllRooms();
    if (rooms) {
      return res.status(responseCodes.ok).json({
        rooms,
      });
    }
    return res.status(responseCodes.ServerError).json({
      error: 'Server error',
    });
  }, */
  getRoomById: async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    const room = await roomService.getRoomId(id);
    if (!id) {
      return res.status(responseCodes.badRequest).json({
        error: 'No valid id provided',
      });
    }
    if (!room) {
      return res.status(responseCodes.badRequest).json({
        error: `No room found with id: ${id}`,
      });
    }
    return res.status(responseCodes.ok).json({
      room,
    });
  },
  addRoom: async (req: Request, res: Response) => {
    const { room } = req.body;
    if (!room) {
      return res.status(responseCodes.badRequest).json({
        error: 'Room is missing',
      });
    }
    const id = await roomService.createRoom(room);
    if (id) {
      return res.status(responseCodes.created).json({
        id,
      });
    }
    return res.status(responseCodes.ServerError).json({
      error: 'Server error',
    });
  },
  deleteRoom: async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    if (!id) {
      return res.status(responseCodes.badRequest).json({
        error: 'No valid id provided',
      });
    }
    const roomExists = await roomService.getRoomId(id);
    if (roomExists === undefined) {
      return res.status(responseCodes.badRequest).json({
        message: `Room not found with id: ${id}`,
      });
    }
    const deleteRoom = await roomService.deleteRoom(id);
    if (deleteRoom) {
      return res.status(responseCodes.noContent).send();
    }
    return res.status(responseCodes.ServerError).json({
      error: 'Server error',
    });
  },
  updateRoomById: async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    const { room } = req.body;
    if (!id) {
      return res.status(responseCodes.badRequest).json({
        error: 'No valid id provided',
      });
    }
    if (!room) {
      return res.status(responseCodes.badRequest).json({
        error: 'Nothing to update',
      });
    }
    const roomExists = await roomService.updateRoom({
      id,
      room,
    });
    if (roomExists === undefined) {
      return res.status(responseCodes.badRequest).json({
        error: `No room found with id: ${id}`,
      });
    }
    if (roomExists) {
      return res.status(responseCodes.noContent).send();
    }
    return res.status(responseCodes.ServerError).json({
      error: 'Server error',
    });
  },
};

export default roomController;
