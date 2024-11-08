import moment from "moment/min/moment-with-locales";

export const formatDate = (date) => {
  return moment(date).locale("th").format("lll");
};
