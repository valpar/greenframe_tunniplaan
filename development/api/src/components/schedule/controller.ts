import { Request, Response } from "express";
import responseCodes from "../general/responseCodes";
import { ISchedule } from "./interface";
import scheduleService from "./service";
import formatDate from "../../utils/formatDate";

const scheduleController = {
  getEntireSchedule: async (req: Request, res: Response) => {
    let {atDate, toDate}  = req.body;

    if (atDate == undefined) {
      atDate = new Date().toJSON().slice(0,10).replace(/-/g,'-');; // tähtaeg tänasest juhul kui kuupäeva pole
    } else {
      atDate = formatDate.forSql(atDate);
    } 


    if (toDate == undefined) {
      toDate = "3000-12-12"; // tähtaeg kuni selle kuupäevani juhul kui kuupäeva pole
    } else {
      toDate = formatDate.forSql(toDate);
    }
    const schedule = await scheduleService.getEntireSchedule(atDate, toDate);
    if (schedule) {
      return res.status(responseCodes.ok).json({ schedule });
    }
    return res.status(responseCodes.ServerError).json({
      error: "Server error",
    });
  },


createSchedule: async (req: Request, res: Response) => {
  const { rooms, comment, courses, lecturers, subjectCode,
  distanceLink} = req.body;
  let {startTime, endTime, subjectId} = req.body;

  if (!subjectCode && !subjectId) {
    return res.status(responseCodes.badRequest).json({
      error: "subjectCode or subjectId is missing",
    });
  }
  if (!subjectId) {
    const resultSubjectId = await scheduleService.getSubjectByCode(subjectCode);

    subjectId = resultSubjectId.id;
  }

  if (!startTime) {
    return res.status(responseCodes.badRequest).json({
      error: "startTime is missing",
    });
  } else {
    startTime = formatDate.forSql(startTime);
  }

  if (!endTime) {
    return res.status(responseCodes.badRequest).json({
      error: "endTime is missing",
    });
  } else {
    endTime = formatDate.forSql(endTime);
  }

  const scheduleId = await scheduleService.createSchedule(startTime, endTime, rooms, comment, courses, subjectId, 
    lecturers, distanceLink);
  if (scheduleId) {
    return res.status(responseCodes.ok).json({ scheduleId });
  }
  return res.status(responseCodes.ServerError).json({
    error: "Server error",
  });
},

updateSchedule: async (req: Request, res: Response) => {
  const {rooms, comment, courses, subjectCode, lecturers,
  distanceLink} = req.body;
  let {startTime, endTime, subjectId} = req.body;
  const id: number = parseInt(req.params.id, 10);
 
  if (!startTime) {
    return res.status(responseCodes.badRequest).json({
      error: "startTime is missing",
    });
  } else {
    startTime = formatDate.forSql(startTime);
  }

  if (!endTime) {
    return res.status(responseCodes.badRequest).json({
      error: "endTime is missing",
    });
  } else {
    endTime = formatDate.forSql(endTime);
  }

  if (!subjectCode && !subjectId) {
    return res.status(responseCodes.badRequest).json({
      error: "subjectCode or subjectId is missing",
    });
  }
  if (!subjectId) {
    const resultSubjectId = await scheduleService.getSubjectByCode(subjectCode);

    subjectId = resultSubjectId.id;
  }


  const updated = await scheduleService.updateSchedule(id, startTime, endTime, rooms, comment, courses, subjectId, 
    lecturers, distanceLink);
  if (updated) {
    return res.status(responseCodes.ok).json({ updated });
  }
  return res.status(responseCodes.ServerError).json({
    error: "Server error",
  });
},

deleteSchedule: async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);

  if (!id) {
    return res.status(responseCodes.badRequest).json({
      error: "id is missing",
    });
  }

  const scheduleId = await scheduleService.deleteSchedule(id);
  if (scheduleId) {
    return res.status(responseCodes.ok).json({ scheduleId });
  }
  return res.status(responseCodes.ServerError).json({
    error: "Server error",
  });
},

getgcal: async (req: Request, res: Response) => {
  let atDate: string = req.params.atDate;
  let toDate: string = req.params.toDate;
  let courseId: number = Number(req.params.courseId);
  let lecturerId: number = Number(req.params.lecturerId);


  if (atDate == undefined) {
    atDate = new Date().toJSON().slice(0,10).replace(/-/g,'-');; // tähtaeg kuni selle kuupäevani juhul kui kuupäeva pole
  } else {
  atDate = formatDate.forSql(atDate);
  } 
 

  if (toDate == undefined) {
    toDate = "3000-12-12"; // tähtaeg kuni selle kuupäevani juhul kui kuupäeva pole
  } else {
    toDate = formatDate.forSql(toDate);
  }

  const schedule = await scheduleService.getgcal(atDate, toDate, courseId, lecturerId);
  if (schedule) {
    return res.status(responseCodes.ok).json({ schedule });
  }
  return res.status(responseCodes.ServerError).json({
    error: "Server error",
  });
},


};

export default scheduleController;