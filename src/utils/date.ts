import dayjs from "dayjs";

export const dateUtil = (date: string | number | Date | null = new Date()) => {
  if (typeof date === "string") {
    return dayjs(date.replace(/\s/g, "").replace(/\./g, "-"));
  } else {
    return dayjs(date);
  }
};
