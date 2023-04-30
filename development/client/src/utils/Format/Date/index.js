const { format } = require("date-fns");
const { utcToZonedTime } = require("date-fns-tz");
const { et } = require("date-fns/locale");

export const dateParser = (date) => {
  if (date.toString().includes(".000Z")) return new Date(date.substring(0, 10));
  return date;
};

export const formatDateTime = (date) => {
  return new Intl.DateTimeFormat("et-EE", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Europe/Riga",
  }).format(new Date(date));
};

export const formatHoursMinutes = (date) => {
  return format(utcToZonedTime(new Date(date), "Europe/Tallinn"), "HH:mm", {
    locale: et,
  });
};

export const formatDate = (date) => {
  return new Intl.DateTimeFormat("et-EE", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: "Europe/Riga",
  }).format(new Date(date));
};

export const formatDayLongMonth = (date) => {
  return new Intl.DateTimeFormat("et-EE", {
    month: "long",
    day: "2-digit",
    timeZone: "Europe/Riga",
  }).format(new Date(date));
};

export const formatYear = (date) => {
  return new Intl.DateTimeFormat("et-EE", {
    year: "numeric",
    timeZone: "Europe/Riga",
  }).format(new Date(date));
};

export const formatWeekday = (date) => {
  return new Intl.DateTimeFormat("et-EE", {
    weekday: "long",
  }).format(new Date(date));
};

export const formatMilliseconds = (date) => {
  return new Date(date).getTime();
};

export const formatDateForCalendar = (date) => {
  return new Intl.DateTimeFormat("et-EE", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour12: false,
    timeZone: "Europe/Riga",
  }).format(new Date(date));
};
