import { readableTime, TimeConv } from './timeFuncs';

const hundredDaysTwentyHoursFiftyMinutesThirtySeconds = 8715030000;
const oneDayTwoHoursEightMinutesTwelveSeconds = 94092000;
const oneDayTwelveSeconds = 86412000;
const twoHoursFiftyMinutes = 10200000;
const oneMinute = 60000;
const fortySeconds = 40000;
const oneSecond = 1000;
const oneHundresMilliseconds = 100;

describe('Time utils', () => {
  test('ReadableTime: Should convert a milissecond value to a human readable string', () => {
    expect(readableTime(
      hundredDaysTwentyHoursFiftyMinutesThirtySeconds,
    )).toEqual('100 days, 20 hours, 50 minutes, 30 seconds');

    expect(readableTime(
      oneDayTwoHoursEightMinutesTwelveSeconds,
    )).toEqual('1 day, 2 hours, 8 minutes, 12 seconds');

    expect(readableTime(
      twoHoursFiftyMinutes,
    )).toEqual('2 hours, 50 minutes');

    expect(readableTime(
      oneMinute,
    )).toEqual('1 minute');

    expect(readableTime(
      fortySeconds,
    )).toEqual('40 seconds');

    expect(readableTime(
      oneSecond,
    )).toEqual('1 second');

    expect(readableTime(
      oneDayTwelveSeconds,
    )).toEqual('1 day, 12 seconds');

    expect(readableTime(
      oneHundresMilliseconds,
    )).toEqual('100 ms');
  });

  describe('Time conversion', () => {
    test('MS', () => {
      expect(TimeConv.MS(5100).toS()).toBe(5);
      expect(TimeConv.MS(5 * 1000 * 60 + 1000).toMin()).toBe(5);
      expect(TimeConv.MS(5 * 1000 * 60 * 60 + 300).toH()).toBe(5);
      expect(TimeConv.MS(5 * 1000 * 60 * 60 * 24 + 4000).toD()).toBe(5);
    });

    test('Seconds', () => {
      expect(TimeConv.S(5).toMs()).toBe(5000);
      expect(TimeConv.S(5 * 60 + 10).toMin()).toBe(5);
      expect(TimeConv.S(5 * 60 * 60 + 10).toH()).toBe(5);
      expect(TimeConv.S(5 * 60 * 60 * 24 + 30).toD()).toBe(5);
    });

    test('Minutes', () => {
      expect(TimeConv.MIN(5).toMs()).toBe(5 * 1000 * 60);
      expect(TimeConv.MIN(5).toS()).toBe(5 * 60);
      expect(TimeConv.MIN(5 * 60 + 31).toH()).toBe(5);
      expect(TimeConv.MIN(5 * 60 * 24 + 40).toD()).toBe(5);
    });

    test('Hours', () => {
      expect(TimeConv.H(5).toMs()).toBe(5 * 1000 * 60 * 60);
      expect(TimeConv.H(5).toS()).toBe(5 * 60 * 60);
      expect(TimeConv.H(5).toMin()).toBe(5 * 60);
      expect(TimeConv.H(5 * 24 + 10).toD()).toBe(5);
    });

    test('Days', () => {
      expect(TimeConv.D(1).toMs()).toBe(1000 * 60 * 60 * 24);
      expect(TimeConv.D(1).toS()).toBe(60 * 60 * 24);
      expect(TimeConv.D(1).toMin()).toBe(60 * 24);
      expect(TimeConv.D(1).toH()).toBe(24);
    });
  });
});
