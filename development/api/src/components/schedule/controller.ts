import { Request, Response } from "express";
import responseCodes from "../general/responseCodes";
import { ISchedule } from "./interface";
import scheduleService from "./service";


const scheduleController = {
  getEntireSchedule: async (req: Request, res: Response) => {
    let atDate: string = req.params.atDate;
    let toDate: string = req.params.toDate;

    if (atDate == undefined) {
      atDate = new Date().toJSON().slice(0,10).replace(/-/g,'-');; // tähtaeg tänasest juhul kui kuupäeva pole
    } else {
      if (atDate.includes("T")) {
        const splitatDate = atDate.split("T");
        atDate = splitatDate[0];
      }
      if (atDate.includes(" ")) {
        const splitatDate = atDate.split(" ");
        atDate = atDate[0];
      }
    } 


    if (toDate == undefined) {
      toDate = "3000-12-12"; // tähtaeg kuni selle kuupäevani juhul kui kuupäeva pole
    } else {
      if (toDate.includes("T")) {
        const splittoDate = toDate.split("T");
        toDate = splittoDate[0];
      }
      if (toDate.includes(" ")) {
        const splittoDate = toDate.split(" ");
        toDate = splittoDate[0];
      }
    }
    console.log(atDate);
    console.log(toDate);




    const schedule = await scheduleService.getEntireSchedule(atDate, toDate);
    if (schedule) {
      return res.status(responseCodes.ok).json({ schedule });
    }
    return res.status(responseCodes.ServerError).json({
      error: "Server error",
    });
  },


createSchedule: async (req: Request, res: Response) => {
  const { startTime, endTime, rooms, comment, courses, subjectId, lecturers,
  distanceLink} = req.body;
  let startTimeFormatted:string ;
  let endTimeFormatted:string ;

  if (startTime.length>19){
    startTimeFormatted = startTime.substr(0, 19);
    startTimeFormatted = startTimeFormatted.replace("T"," ");
  }  else { startTimeFormatted = startTime.replace("T"," ");  }
  
  if (endTime.length>19){
    endTimeFormatted = endTime.substr(0, 19);
    endTimeFormatted = endTimeFormatted.replace("T"," ");
  } else { endTimeFormatted = endTime.replace("T"," "); }

  console.log(startTimeFormatted, endTimeFormatted);

  if (!startTime) {
    return res.status(responseCodes.badRequest).json({
      error: "startTime is missing",
    });
  }

  if (!endTime) {
    return res.status(responseCodes.badRequest).json({
      error: "endTime is missing",
    });
  }
  // const lecturerName = lecturer.split(" ");
  // const lecturerFist = lecturerName[0];
  // const lecturerLast = lecturerName[1];

  const scheduleId = await scheduleService.createSchedule(startTimeFormatted, endTimeFormatted, rooms, comment, courses, subjectId, 
    lecturers, distanceLink);
  if (scheduleId) {
    return res.status(responseCodes.ok).json({ scheduleId });
  }
  return res.status(responseCodes.ServerError).json({
    error: "Server error",
  });
},

updateSchedule: async (req: Request, res: Response) => {
  const {startTime, endTime, rooms, comment, courses, subjectId, lecturers,
  distanceLink} = req.body;
  const id: number = parseInt(req.params.id, 10);
  let startTimeFormatted:string ;
  let endTimeFormatted:string ;

  if (startTime.length>19){
    startTimeFormatted = startTime.substr(0, 19);
    startTimeFormatted = startTimeFormatted.replace("T"," ");
  }  else { startTimeFormatted = startTime.replace("T"," ");  }
  
  if (endTime.length>19){
    endTimeFormatted = endTime.substr(0, 19);
    endTimeFormatted = endTimeFormatted.replace("T"," ");
  } else { endTimeFormatted = endTime.replace("T"," "); }

  console.log(startTimeFormatted, endTimeFormatted);

  if (!startTime) {
    return res.status(responseCodes.badRequest).json({
      error: "startTime is missing",
    });
  }

  if (!endTime) {
    return res.status(responseCodes.badRequest).json({
      error: "endTime is missing",
    });
  }
  // const lecturerName = lecturer.split(" ");
  // const lecturerFist = lecturerName[0];
  // const lecturerLast = lecturerName[1];

  const scheduleId = await scheduleService.updateSchedule(id, startTimeFormatted, endTimeFormatted, rooms, comment, courses, subjectId, 
    lecturers, distanceLink);
  if (scheduleId) {
    return res.status(responseCodes.ok).json({ scheduleId });
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
    if (atDate.includes("T")) {
      const splitatDate = atDate.split("T");
      atDate = splitatDate[0];
    }
    if (atDate.includes(" ")) {
      const splitatDate = atDate.split(" ");
      atDate = atDate[0];
    }
  } 
 

  if (toDate == undefined) {
    toDate = "3000-12-12"; // tähtaeg kuni selle kuupäevani juhul kui kuupäeva pole
  } else {
    if (toDate.includes("T")) {
      const splittoDate = toDate.split("T");
      toDate = splittoDate[0];
    }
    if (toDate.includes(" ")) {
      const splittoDate = toDate.split(" ");
      toDate = splittoDate[0];
    }
  }
  console.log(atDate);
  console.log(toDate);




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