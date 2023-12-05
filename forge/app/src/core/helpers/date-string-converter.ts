import { t } from 'i18next';

export const convertDateToString = (date: string) => {
  let a = new Date(date);
  let year = a.getFullYear();

  let month: string;
  let getMonth = a.getMonth() + 1;
  if (getMonth <= 9) {
    month = `0${getMonth}`;
  } else {
    month = `${getMonth}`;
  }

  let monthName: string = (
    t('month', {
      returnObjects: true,
    }) as { [key: string]: string }
  )[month as string];

  let day: string;
  if (a.getDate() <= 9) {
    day = `0${a.getDate()}`;
  } else {
    day = `${a.getDate()}`;
  }

  let result = `${day} ${monthName} ${year}`;
  return result;
};
