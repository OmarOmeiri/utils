import dayjs, { BusinessHoursMap } from 'dayjs';
import dayjsBusinessTime from 'dayjs-business-time';

dayjs.extend(dayjsBusinessTime);
const currYear = new Date().getFullYear();
const confUniversal = `${currYear}-01-01`;
const tiradentes = `${currYear}-04-21`;
const trab = `${currYear}-05-01`;
const indep = `${currYear}-09-07`;
const crianc = `${currYear}-10-12`;
const finados = `${currYear}-11-02`;
const repub = `${currYear}-11-15`;
const natal = `${currYear}-12-25`;
const holidays = [
  confUniversal,
  tiradentes,
  trab,
  indep,
  crianc,
  finados,
  repub,
  natal,
];
dayjs.setHolidays(holidays);

const businessTimes: BusinessHoursMap = {
  sunday: null,
  monday: [
    { start: '09:00:00', end: '18:00:00' },
  ],
  tuesday: [
    { start: '09:00:00', end: '18:00:00' },
  ],
  wednesday: [
    { start: '09:00:00', end: '18:00:00' },
  ],
  thursday: [
    { start: '09:00:00', end: '18:00:00' },
  ],
  friday: [
    { start: '09:00:00', end: '18:00:00' },
  ],
  saturday: null,
};

dayjs.setBusinessTime(businessTimes);
