import dayjs from 'dayjs';
import minMax from 'dayjs/plugin/minMax';
import utc from 'dayjs/plugin/utc';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import {
  isDate,
  excludeWeekends,
  minMaxDate,
  fillMissingDaysObj,
  fillMissingDays,
  getBusinessDay,
  getLastWeekend,
  isBusinessDay,
  manipulateBusinessDays,
  randomDate,
  validateDate,
} from './date';
import { getRandomInt } from '../Math/mathFuncs';
import { formatDate, isInstanceofDate } from '..';

dayjs.extend(utc);
dayjs.extend(customParseFormat);
dayjs.extend(minMax);

describe('Date function test', () => {
  test('[fillMissingDays]', () => {
    const daysSubtract = [1, 1, 1, 2, 3, 4];

    const dateArr: Date[] = [];

    Array(20).fill(0).forEach((_, i) => {
      if (!i) {
        dateArr.push(dayjs().toDate());
      } else {
        dateArr.push(dayjs(dateArr[i - 1]).subtract(daysSubtract[getRandomInt(0, daysSubtract.length)], 'days').toDate());
      }
    });

    const dayJsArr = dateArr.map((d) => dayjs(d));
    const maxDate = dayjs.max(dayJsArr).startOf('day');
    const minDate = dayjs.min(dayJsArr).startOf('day');

    const dateRange = maxDate.diff(minDate, 'day') + 1;

    const filledAsc = fillMissingDays(dateArr, 'asc');
    const filledDesc = fillMissingDays(dateArr, 'desc');

    const diffDatesAsc = filledAsc.map((d, i, arr) => {
      if (!i) return 1;
      return dayjs(d).diff(dayjs(arr[i - 1]), 'day');
    });

    const diffDatesDesc = filledDesc.map((d, i, arr) => {
      if (!i) return 1;
      return dayjs(arr[i - 1]).diff(dayjs(d), 'day');
    });

    expect(diffDatesAsc.filter((d) => d !== 1)).toHaveLength(0);
    expect(diffDatesDesc.filter((d) => d !== 1)).toHaveLength(0);

    expect((filledAsc[0])).toEqual(minDate.toDate());
    expect(filledAsc[filledAsc.length - 1]).toEqual(maxDate.toDate());

    expect(filledDesc[0]).toEqual(maxDate.toDate());
    expect(filledDesc[filledDesc.length - 1]).toEqual(minDate.toDate());

    expect(filledAsc.length).toBe(dateRange);
    expect(filledDesc.length).toBe(dateRange);

    expect(filledAsc[0].getTime()).toBeLessThan(filledAsc[filledAsc.length - 1].getTime());
    expect(filledDesc[0].getTime()).toBeGreaterThan(filledDesc[filledAsc.length - 1].getTime());
  });

  test('[fillMissingdaysObj]', () => {
    const daysSubtract = [1, 1, 1, 2, 3, 4];

    const dateArr: {
      date: Date,
      a: number | null,
      b: string | null
    }[] = [];

    Array(20).fill(0).forEach((_, i) => {
      if (!i) {
        dateArr.push({
          date: dayjs().toDate(),
          a: getRandomInt(1, 10),
          b: 'a',
        });
      } else {
        dateArr.push({
          date: dayjs(dateArr[i - 1].date).subtract(daysSubtract[getRandomInt(0, daysSubtract.length)], 'days').toDate(),
          a: getRandomInt(1, 10),
          b: 'a',
        });
      }
    });

    const dayJsArr = dateArr.map((d) => dayjs(d.date));
    const maxDate = dayjs.max(dayJsArr);
    const minDate = dayjs.min(dayJsArr);

    const dateRange = maxDate.diff(minDate, 'day') + 1;

    const filledAsc = fillMissingDaysObj(dateArr, 'date', 'asc', {
      a: null,
      b: null,
    });

    const filledDesc = fillMissingDaysObj(dateArr, 'date', 'desc', {
      a: null,
      b: null,
    });

    const datesAsc = filledAsc.map((d) => d.date);
    const datesDesc = filledDesc.map((d) => d.date);

    const diffDatesAsc = datesAsc.map((d, i, arr) => {
      if (!i) return 1;
      return dayjs(d).startOf('day').diff(dayjs(arr[i - 1]).startOf('day'), 'day');
    });
    const diffDatesDesc = datesDesc.map((d, i, arr) => {
      if (!i) return 1;
      return dayjs(arr[i - 1]).startOf('day').diff(dayjs(d).startOf('day'), 'day');
    });

    expect(diffDatesAsc.filter((d) => d !== 1)).toHaveLength(0);
    expect(diffDatesDesc.filter((d) => d !== 1)).toHaveLength(0);

    expect(filledAsc[0].date).toEqual(minDate.toDate());
    expect(filledAsc[filledAsc.length - 1].date).toEqual(maxDate.toDate());

    expect(filledDesc[0].date).toEqual(maxDate.toDate());
    expect(filledDesc[filledDesc.length - 1].date).toEqual(minDate.toDate());

    expect(filledAsc.length).toBe(dateRange);
    expect(filledDesc.length).toBe(dateRange);

    expect(filledAsc[0].date.getTime()).toBeLessThan(filledAsc[filledAsc.length - 1].date.getTime());
    expect(filledDesc[0].date.getTime()).toBeGreaterThan(filledDesc[filledDesc.length - 1].date.getTime());
  });

  test('[excludeWeekends] Should exclude weekends from an array of dates', () => {
    const dateArr: Date[] = [];
    Array(20).fill(0).forEach((_, i) => {
      if (!i) {
        dateArr.push(dayjs().toDate());
      } else {
        dateArr.push(dayjs(dateArr[i - 1]).subtract(1, 'days').toDate());
      }
    });

    const dates = excludeWeekends(dateArr);
    const isWeekEndArr = dates.map((d) => {
      const weekDay = d.getDay();
      return weekDay === 0 || weekDay === 6;
    });
    expect(isWeekEndArr).not.toContain(true);
  });

  test('[minMaxDates]', () => {
    const dateArr: Date[] = [];
    Array(20).fill(0).forEach((_, i) => {
      if (!i) {
        dateArr.push(dayjs().toDate());
      } else {
        dateArr.push(dayjs(dateArr[i - 1]).subtract(1, 'days').toDate());
      }
    });

    const { min, max } = minMaxDate(dateArr);

    expect(max).toEqual(dateArr[0]);
    expect(min).toEqual(dateArr[dateArr.length - 1]);
  });

  test('[getLastWeekend]', () => {
    const pastDate = {
      year: 2020,
      month: 2,
      day: 20,
    };
    const today = new Date();
    const [lastSaturday, lastSunday] = getLastWeekend({ endOfWeekend: false });
    const lastSunday2 = getLastWeekend();
    const lastSunday3 = getLastWeekend({ date: new Date(pastDate.year, pastDate.month, pastDate.day) });

    expect(lastSaturday.getDay()).toEqual(6);
    expect(lastSunday.getDay()).toEqual(0);
    expect(
      lastSunday.getTime(),
    ).toEqual(
      dayjs(today.setDate(today.getDate() - today.getDay()))
        .startOf('day')
        .toDate()
        .getTime(),
    );
    expect(lastSaturday.getTime())
      .toEqual(
        dayjs(today.setDate(today.getDate() - today.getDay()))
          .startOf('day')
          .subtract(1, 'days')
          .toDate()
          .getTime(),
      );

    expect(lastSunday2).toEqual(lastSunday);

    expect(lastSunday3.getFullYear()).toEqual(pastDate.year);
    expect(isBusinessDay(lastSunday3)).toBe(false);
  });

  test('[manipulateBusinessDays]', () => {
    const [lastSaturday, lastSunday] = getLastWeekend({ endOfWeekend: false });
    const nextBusinessDayFromSunday = manipulateBusinessDays(lastSunday, 1);
    const nextBusinessDayFromSaturday = manipulateBusinessDays(lastSaturday, 1);

    expect(nextBusinessDayFromSunday.getDay()).toEqual(1);
    expect(nextBusinessDayFromSaturday.getDay()).toEqual(1);
  });

  test('[getBusinessDay]', () => {
    const lastSunday = getLastWeekend({ endOfWeekend: true });
    const nextBusinessDay = getBusinessDay(lastSunday, 'next');
    const lastBusinessDay = getBusinessDay(lastSunday, 'prev');

    expect(nextBusinessDay.getDay()).toEqual(1);
    expect(lastBusinessDay.getDay()).toEqual(5);
  });

  test('[isBusinessDay]', () => {
    const lastSunday = getLastWeekend({ endOfWeekend: true });
    const lastBusinessDay = getBusinessDay(lastSunday, 'prev');

    const shouldBeBusinessDay = isBusinessDay(lastBusinessDay);
    const shouldNotBeBusinessDay = isBusinessDay(lastSunday);

    expect(shouldBeBusinessDay).toEqual(true);
    expect(shouldNotBeBusinessDay).toEqual(false);
  });

  test('[randomDate]', () => {
    const repeat = 100;
    for (const _ of Array(repeat).keys()) {
      const rndDateNoRng = randomDate();

      expect(rndDateNoRng).toBeInstanceOf(Date);
      expect(validateDate(rndDateNoRng)).toEqual(true);

      const yRngLow = getRandomInt(1970, new Date().getFullYear() - 1);
      const yRngHigh = getRandomInt(yRngLow, new Date().getFullYear());

      const rndDateWithRngNoBusDay = randomDate({
        yearRng: [yRngLow, yRngHigh],
      });

      expect(rndDateWithRngNoBusDay).toBeInstanceOf(Date);
      expect(validateDate(rndDateWithRngNoBusDay)).toEqual(true);

      expect(rndDateWithRngNoBusDay.getFullYear()).toBeGreaterThanOrEqual(yRngLow);
      expect(rndDateWithRngNoBusDay.getFullYear()).toBeLessThanOrEqual(yRngHigh);

      const rndDateWithRngBusDay = randomDate({
        yearRng: [yRngLow, yRngHigh],
        businessDay: true,
      });

      expect(rndDateWithRngBusDay).toBeInstanceOf(Date);
      expect(validateDate(rndDateWithRngBusDay)).toEqual(true);

      expect(rndDateWithRngBusDay.getFullYear()).toBeGreaterThanOrEqual(yRngLow);
      expect(rndDateWithRngBusDay.getFullYear()).toBeLessThanOrEqual(yRngHigh);

      expect(isBusinessDay(rndDateWithRngBusDay)).toEqual(true);
    }
  });

  test('[isDate] Checks if a value is a date', () => {
    const nonExistentDate = '2022-02-29';
    expect(isDate(new Date())).toEqual(true);

    expect(isDate(new Date().toString())).toEqual(true);

    expect(isDate(nonExistentDate, true, 'YYYY-MM-DD')).toEqual(false);
    expect(isDate(nonExistentDate, false)).toEqual(true);

    expect(isDate('01/01/2020', true, 'DD/MM/YYYY')).toEqual(true);
    expect(isDate('30/02/2022', true, 'DD/MM/YYYY')).toEqual(false);
  });

  test('[formatDate] Checks if a value is a date', () => {
    expect(formatDate(new Date(), 'DD-MM-YYYY')).toMatch(/\d{2}-\d{2}-\d{4}/);
    expect(formatDate(new Date(), 'YYYY-MM-DD')).toMatch(/\d{4}-\d{2}-\d{2}/);
    expect(formatDate(new Date(), 'DD/MM/YYYY')).toMatch(/\d{2}\/\d{2}\/\d{4}/);

    expect(formatDate(dayjs(new Date()), 'DD-MM-YYYY')).toMatch(/\d{2}-\d{2}-\d{4}/);
    expect(formatDate(dayjs(new Date()), 'YYYY-MM-DD')).toMatch(/\d{4}-\d{2}-\d{2}/);
    expect(formatDate(dayjs(new Date()), 'DD/MM/YYYY')).toMatch(/\d{2}\/\d{2}\/\d{4}/);

    expect(formatDate('2022-10-02', 'YYYY-MM-DD', 'DD/MM/YYYY')).toMatch(/\d{2}\/\d{2}\/\d{4}/);
    expect(formatDate('2022/10/02', 'YYYY/MM/DD', 'YYYY-MM-DD')).toMatch(/\d{4}-\d{2}-\d{2}/);
    expect(formatDate('02-10-2022', 'DD-MM-YYYY', 'DD/MM/YYYY')).toMatch(/\d{2}\/\d{2}\/\d{4}/);
  });

  test('[isInstanceofDate] Checks if a date object is valid', () => {
    expect(isInstanceofDate(new Date())).toEqual(true);
    expect(isInstanceofDate(new Date('2022-10-02'))).toEqual(true);
    expect(isInstanceofDate(new Date('2022/10/02'))).toEqual(true);
    expect(isInstanceofDate(new Date('02-10-2022'))).toEqual(true);
    expect(isInstanceofDate(new Date('02/10/2022'))).toEqual(true);
    expect(isInstanceofDate(new Date('02.10.2022'))).toEqual(true);
    expect(isInstanceofDate(new Date(''))).toEqual(false);
    expect(isInstanceofDate(new Date('aa'))).toEqual(false);
    expect(isInstanceofDate(new Date('2021-13-01'))).toEqual(false);
    expect(isInstanceofDate(new Date('2021-1-32'))).toEqual(false);
  });
});
