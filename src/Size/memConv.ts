/* eslint-disable arrow-body-style */
/* eslint-disable require-jsdoc */
import assert from 'assert';
import { round } from '../Math';

interface IMemConv {
  bit: (value: number) => {
    toBitHr(opts?: {round?: number}): string;
    toB(opts: {hr: true, round?: number}): string;
    toB(opts?: {hr?: false, round?: number}): number;
    toKB(opts: {hr: true, round?: number}): string;
    toKB(opts?: {hr?: false, round?: number}): number;
    toMB(opts: {hr: true, round?: number}): string;
    toMB(opts?: {hr?: false, round?: number}): number;
    toGB(opts: {hr: true, round?: number}): string;
    toGB(opts?: {hr?: false, round?: number}): number;
    toTB(opts: {hr: true, round?: number}): string;
    toTB(opts?: {hr?: false, round?: number}): number;
    toPB(opts: {hr: true, round?: number}): string;
    toPB(opts?: {hr?: false, round?: number}): number;
  };
  B: (value: number) => {
    toBit(opts: {hr: true, round?: number}): string;
    toBit(opts?: {hr?: false, round?: number}): number;
    toBHr(opts?: {round?: number}): string;
    toKB(opts: {hr: true, round?: number}): string;
    toKB(opts?: {hr?: false, round?: number}): number;
    toMB(opts: {hr: true, round?: number}): string;
    toMB(opts?: {hr?: false, round?: number}): number;
    toGB(opts: {hr: true, round?: number}): string;
    toGB(opts?: {hr?: false, round?: number}): number;
    toTB(opts: {hr: true, round?: number}): string;
    toTB(opts?: {hr?: false, round?: number}): number;
    toPB(opts: {hr: true, round?: number}): string;
    toPB(opts?: {hr?: false, round?: number}): number;
  }
  KB: (value: number) => {
    toBit(opts: {hr: true, round?: number}): string;
    toBit(opts?: {hr?: false, round?: number}): number;
    toB(opts: {hr: true, round?: number}): string;
    toB(opts?: {hr?: false, round?: number}): number;
    toKBHr(opts?: {round?: number}): string;
    toMB(opts: {hr: true, round?: number}): string;
    toMB(opts?: {hr?: false, round?: number}): number;
    toGB(opts: {hr: true, round?: number}): string;
    toGB(opts?: {hr?: false, round?: number}): number;
    toTB(opts: {hr: true, round?: number}): string;
    toTB(opts?: {hr?: false, round?: number}): number;
    toPB(opts: {hr: true, round?: number}): string;
    toPB(opts?: {hr?: false, round?: number}): number;
  };
  MB: (value: number) => {
    toBit(opts: {hr: true, round?: number}): string;
    toBit(opts?: {hr?: false, round?: number}): number;
    toB(opts: {hr: true, round?: number}): string;
    toB(opts?: {hr?: false, round?: number}): number;
    toKB(opts: {hr: true, round?: number}): string;
    toKB(opts?: {hr?: false, round?: number}): number;
    toMBHr(opts?: {round?: number}): string;
    toGB(opts: {hr: true, round?: number}): string;
    toGB(opts?: {hr?: false, round?: number}): number;
    toTB(opts: {hr: true, round?: number}): string;
    toTB(opts?: {hr?: false, round?: number}): number;
    toPB(opts: {hr: true, round?: number}): string;
    toPB(opts?: {hr?: false, round?: number}): number;
  }
  GB: (value: number) => {
    toBit(opts: {hr: true, round?: number}): string;
    toBit(opts?: {hr?: false, round?: number}): number;
    toB(opts: {hr: true, round?: number}): string;
    toB(opts?: {hr?: false, round?: number}): number;
    toKB(opts: {hr: true, round?: number}): string;
    toKB(opts?: {hr?: false, round?: number}): number;
    toMB(opts: {hr: true, round?: number}): string;
    toMB(opts?: {hr?: false, round?: number}): number;
    toGBHr(opts?: {round?: number}): string;
    toTB(opts: {hr: true, round?: number}): string;
    toTB(opts?: {hr?: false, round?: number}): number;
    toPB(opts: {hr: true, round?: number}): string;
    toPB(opts?: {hr?: false, round?: number}): number;
  }
  TB: (value: number) => {
    toBit(opts: {hr: true, round?: number}): string;
    toBit(opts?: {hr?: false, round?: number}): number;
    toB(opts: {hr: true, round?: number}): string;
    toB(opts?: {hr?: false, round?: number}): number;
    toKB(opts: {hr: true, round?: number}): string;
    toKB(opts?: {hr?: false, round?: number}): number;
    toMB(opts: {hr: true, round?: number}): string;
    toMB(opts?: {hr?: false, round?: number}): number;
    toGB(opts: {hr: true, round?: number}): string;
    toGB(opts?: {hr?: false, round?: number}): number;
    toTBHr(opts?: {round?: number}): string;
    toPB(opts: {hr: true, round?: number}): string;
    toPB(opts?: {hr?: false, round?: number}): number;
  }
  PB: (value: number) => {
    toBit(opts: {hr: true, round?: number}): string;
    toBit(opts?: {hr?: false, round?: number}): number;
    toB(opts: {hr: true, round?: number}): string;
    toB(opts?: {hr?: false, round?: number}): number;
    toKB(opts: {hr: true, round?: number}): string;
    toKB(opts?: {hr?: false, round?: number}): number;
    toMB(opts: {hr: true, round?: number}): string;
    toMB(opts?: {hr?: false, round?: number}): number;
    toGB(opts: {hr: true, round?: number}): string;
    toGB(opts?: {hr?: false, round?: number}): number;
    toTB(opts: {hr: true, round?: number}): string;
    toTB(opts?: {hr?: false, round?: number}): number;
    toPBHr(opts?: {round?: number}): string;
  }
}
const bitBase = 8;
export const suffixes = {
  bit: 'b',
  b: 'B',
  kb: 'KB',
  mb: 'MB',
  gb: 'GB',
  tb: 'TB',
  pb: 'PB',
};
export const multipliers = {
  bit: {
    toBitHr: 1,
    toB: 1 / bitBase,
    toKB: 1 / (bitBase * 1e3),
    toMB: 1 / (bitBase * 1e6),
    toGB: 1 / (bitBase * 1e9),
    toTB: 1 / (bitBase * 1e12),
    toPB: 1 / (bitBase * 1e15),
  },
  B: {
    toBit: bitBase,
    toBHr: 1,
    toKB: 1 / 1e3,
    toMB: 1 / 1e6,
    toGB: 1 / 1e9,
    toTB: 1 / 1e12,
    toPB: 1 / 1e15,
  },
  KB: {
    toBit: 1 / (bitBase * 1e3),
    toB: 1e3,
    toKBHr: 1,
    toMB: 1 / 1e3,
    toGB: 1 / 1e6,
    toTB: 1 / 1e9,
    toPB: 1 / 1e12,
  },
  MB: {
    toBit: bitBase * 1e6,
    toB: 1e6,
    toKB: 1e3,
    toMBHr: 1,
    toGB: 1 / 1e3,
    toTB: 1 / 1e6,
    toPB: 1 / 1e9,
  },
  GB: {
    toBit: bitBase * 1e9,
    toB: 1e9,
    toKB: 1e6,
    toMB: 1e3,
    toGBHr: 1,
    toTB: 1 / 1e3,
    toPB: 1 / 1e6,
  },
  TB: {
    toBit: bitBase * 1e12,
    toB: 1e12,
    toKB: 1e9,
    toMB: 1e6,
    toGB: 1e3,
    toTBHr: 1,
    toPB: 1 / 1e3,
  },
  PB: {
    toBit: bitBase * 1e15,
    toB: 1e15,
    toKB: 1e12,
    toMB: 1e9,
    toGB: 1e6,
    toTB: 1e3,
    toPBHr: 1,
  },
};

function conv(
  value: number,
  hr: boolean,
  rnd: number | false,
  multiplier: number,
  suffix: string,
) {
  let val = value * multiplier;
  if ((value * multiplier) > Number.MAX_SAFE_INTEGER) {
    val = Number.MAX_SAFE_INTEGER;
  }
  if (val < Number.MIN_VALUE) val = 0;
  if ((rnd || rnd === 0) && val < Number.MAX_SAFE_INTEGER) {
    val = round(val, rnd);
  }
  if (hr) return `${val}${suffix}`;
  return val;
}

export const MemConv = (function _(): IMemConv {
  return {
    bit(value: number) {
      return {
        toBitHr(opts: {round?: number} = {}) {
          return conv(
            value,
            true,
            opts.round || false,
            multipliers.bit.toBitHr,
            suffixes.bit,
          );
        },
        toB(opts: {hr?: boolean, round?: number} = {}) {
          return conv(
            value,
            opts.hr || false,
            opts.round || false,
            multipliers.bit.toB,
            suffixes.b,
          );
        },
        toKB(opts: {hr?: boolean, round?: number} = {}) {
          return conv(
            value,
            opts.hr || false,
            opts.round || false,
            multipliers.bit.toKB,
            suffixes.kb,
          );
        },
        toMB(opts: {hr?: boolean, round?: number} = {}) {
          return conv(
            value,
            opts.hr || false,
            opts.round || false,
            multipliers.bit.toMB,
            suffixes.mb,
          );
        },
        toGB(opts: {hr?: boolean, round?: number} = {}) {
          return conv(
            value,
            opts.hr || false,
            opts.round || false,
            multipliers.bit.toGB,
            suffixes.gb,
          );
        },
        toTB(opts: {hr?: boolean, round?: number} = {}) {
          return conv(
            value,
            opts.hr || false,
            opts.round || false,
            multipliers.bit.toTB,
            suffixes.tb,
          );
        },
        toPB(opts: {hr?: boolean, round?: number} = {}) {
          return conv(
            value,
            opts.hr || false,
            opts.round || false,
            multipliers.bit.toPB,
            suffixes.pb,
          );
        },
      } as ReturnType<IMemConv['bit']>;
    },
    B(value: number) {
      return {
        toBit(opts: {hr?: boolean, round?: number} = {}) {
          return conv(
            value,
            opts.hr || false,
            opts.round || false,
            multipliers.B.toBit,
            suffixes.bit,
          );
        },
        toBHr(opts: {round?: number} = {}) {
          return conv(
            value,
            true,
            opts.round || false,
            multipliers.B.toBHr,
            suffixes.b,
          );
        },
        toKB(opts: {hr?: boolean, round?: number} = {}) {
          return conv(
            value,
            opts.hr || false,
            opts.round || false,
            multipliers.B.toKB,
            suffixes.kb,
          );
        },
        toMB(opts: {hr?: boolean, round?: number} = {}) {
          return conv(
            value,
            opts.hr || false,
            opts.round || false,
            multipliers.B.toMB,
            suffixes.mb,
          );
        },
        toGB(opts: {hr?: boolean, round?: number} = {}) {
          return conv(
            value,
            opts.hr || false,
            opts.round || false,
            multipliers.B.toGB,
            suffixes.gb,
          );
        },
        toTB(opts: {hr?: boolean, round?: number} = {}) {
          return conv(
            value,
            opts.hr || false,
            opts.round || false,
            multipliers.B.toTB,
            suffixes.tb,
          );
        },
        toPB(opts: {hr?: boolean, round?: number} = {}) {
          return conv(
            value,
            opts.hr || false,
            opts.round || false,
            multipliers.B.toPB,
            suffixes.pb,
          );
        },
      } as ReturnType<IMemConv['B']>;
    },
    KB(value: number) {
      return {
        toBit(opts: {hr?: boolean, round?: number} = {}) {
          return conv(
            value,
            opts.hr || false,
            opts.round || false,
            multipliers.KB.toBit,
            suffixes.bit,
          );
        },
        toB(opts: {hr?: boolean, round?: number} = {}) {
          return conv(
            value,
            opts.hr || false,
            opts.round || false,
            multipliers.KB.toB,
            suffixes.b,
          );
        },
        toKBHr(opts: {round?: number} = {}) {
          return conv(
            value,
            true,
            opts.round || false,
            multipliers.KB.toKBHr,
            suffixes.kb,
          );
        },
        toMB(opts: {hr?: boolean, round?: number} = {}) {
          return conv(
            value,
            opts.hr || false,
            opts.round || false,
            multipliers.KB.toMB,
            suffixes.mb,
          );
        },
        toGB(opts: {hr?: boolean, round?: number} = {}) {
          return conv(
            value,
            opts.hr || false,
            opts.round || false,
            multipliers.KB.toGB,
            suffixes.gb,
          );
        },
        toTB(opts: {hr?: boolean, round?: number} = {}) {
          return conv(
            value,
            opts.hr || false,
            opts.round || false,
            multipliers.KB.toTB,
            suffixes.tb,
          );
        },
        toPB(opts: {hr?: boolean, round?: number} = {}) {
          return conv(
            value,
            opts.hr || false,
            opts.round || false,
            multipliers.KB.toPB,
            suffixes.pb,
          );
        },
      } as ReturnType<IMemConv['KB']>;
    },
    MB(value: number) {
      return {
        toBit(opts: {hr?: boolean, round?: number} = {}) {
          return conv(
            value,
            opts.hr || false,
            opts.round || false,
            multipliers.MB.toBit,
            suffixes.bit,
          );
        },
        toB(opts: {hr?: boolean, round?: number} = {}) {
          return conv(
            value,
            opts.hr || false,
            opts.round || false,
            multipliers.MB.toB,
            suffixes.b,
          );
        },
        toKB(opts: {hr?: boolean, round?: number} = {}) {
          return conv(
            value,
            opts.hr || false,
            opts.round || false,
            multipliers.MB.toKB,
            suffixes.kb,
          );
        },
        toMBHr(opts: {round?: number} = {}) {
          return conv(
            value,
            true,
            opts.round || false,
            multipliers.MB.toMBHr,
            suffixes.mb,
          );
        },
        toGB(opts: {hr?: boolean, round?: number} = {}) {
          return conv(
            value,
            opts.hr || false,
            opts.round || false,
            multipliers.MB.toGB,
            suffixes.gb,
          );
        },
        toTB(opts: {hr?: boolean, round?: number} = {}) {
          return conv(
            value,
            opts.hr || false,
            opts.round || false,
            multipliers.MB.toTB,
            suffixes.tb,
          );
        },
        toPB(opts: {hr?: boolean, round?: number} = {}) {
          return conv(
            value,
            opts.hr || false,
            opts.round || false,
            multipliers.MB.toPB,
            suffixes.pb,
          );
        },
      } as ReturnType<IMemConv['MB']>;
    },
    GB(value: number) {
      return {
        toBit(opts: {hr?: boolean, round?: number} = {}) {
          return conv(
            value,
            opts.hr || false,
            opts.round || false,
            multipliers.GB.toBit,
            suffixes.bit,
          );
        },
        toB(opts: {hr?: boolean, round?: number} = {}) {
          return conv(
            value,
            opts.hr || false,
            opts.round || false,
            multipliers.GB.toB,
            suffixes.b,
          );
        },
        toKB(opts: {hr?: boolean, round?: number} = {}) {
          return conv(
            value,
            opts.hr || false,
            opts.round || false,
            multipliers.GB.toKB,
            suffixes.kb,
          );
        },
        toMB(opts: {hr?: boolean, round?: number} = {}) {
          return conv(
            value,
            opts.hr || false,
            opts.round || false,
            multipliers.GB.toMB,
            suffixes.mb,
          );
        },
        toGBHr(opts: {round?: number} = {}) {
          return conv(
            value,
            true,
            opts.round || false,
            multipliers.GB.toGBHr,
            suffixes.gb,
          );
        },
        toTB(opts: {hr?: boolean, round?: number} = {}) {
          return conv(
            value,
            opts.hr || false,
            opts.round || false,
            multipliers.GB.toTB,
            suffixes.tb,
          );
        },
        toPB(opts: {hr?: boolean, round?: number} = {}) {
          return conv(
            value,
            opts.hr || false,
            opts.round || false,
            multipliers.GB.toPB,
            suffixes.pb,
          );
        },
      } as ReturnType<IMemConv['GB']>;
    },
    TB(value: number) {
      return {
        toBit(opts: {hr?: boolean, round?: number} = {}) {
          return conv(
            value,
            opts.hr || false,
            opts.round || false,
            multipliers.TB.toBit,
            suffixes.bit,
          );
        },
        toB(opts: {hr?: boolean, round?: number} = {}) {
          return conv(
            value,
            opts.hr || false,
            opts.round || false,
            multipliers.TB.toB,
            suffixes.b,
          );
        },
        toKB(opts: {hr?: boolean, round?: number} = {}) {
          return conv(
            value,
            opts.hr || false,
            opts.round || false,
            multipliers.TB.toKB,
            suffixes.kb,
          );
        },
        toMB(opts: {hr?: boolean, round?: number} = {}) {
          return conv(
            value,
            opts.hr || false,
            opts.round || false,
            multipliers.TB.toMB,
            suffixes.mb,
          );
        },
        toGB(opts: {hr?: boolean, round?: number} = {}) {
          return conv(
            value,
            opts.hr || false,
            opts.round || false,
            multipliers.TB.toGB,
            suffixes.gb,
          );
        },
        toTBHr(opts: {round?: number} = {}) {
          return conv(
            value,
            true,
            opts.round || false,
            multipliers.TB.toTBHr,
            suffixes.tb,
          );
        },
        toPB(opts: {hr?: boolean, round?: number} = {}) {
          return conv(
            value,
            opts.hr || false,
            opts.round || false,
            multipliers.TB.toPB,
            suffixes.pb,
          );
        },
      } as ReturnType<IMemConv['TB']>;
    },
    PB(value: number) {
      return {
        toBit(opts: {hr?: boolean, round?: number} = {}) {
          return conv(
            value,
            opts.hr || false,
            opts.round || false,
            multipliers.PB.toBit,
            suffixes.bit,
          );
        },
        toB(opts: {hr?: boolean, round?: number} = {}) {
          return conv(
            value,
            opts.hr || false,
            opts.round || false,
            multipliers.PB.toB,
            suffixes.b,
          );
        },
        toKB(opts: {hr?: boolean, round?: number} = {}) {
          return conv(
            value,
            opts.hr || false,
            opts.round || false,
            multipliers.PB.toKB,
            suffixes.kb,
          );
        },
        toMB(opts: {hr?: boolean, round?: number} = {}) {
          return conv(
            value,
            opts.hr || false,
            opts.round || false,
            multipliers.PB.toMB,
            suffixes.mb,
          );
        },
        toGB(opts: {hr?: boolean, round?: number} = {}) {
          return conv(
            value,
            opts.hr || false,
            opts.round || false,
            multipliers.PB.toGB,
            suffixes.gb,
          );
        },
        toTB(opts: {hr?: boolean, round?: number} = {}) {
          return conv(
            value,
            opts.hr || false,
            opts.round || false,
            multipliers.PB.toTB,
            suffixes.tb,
          );
        },
        toPBHr(opts: {round?: number} = {}) {
          return conv(
            value,
            true,
            opts.round || false,
            multipliers.TB.toTBHr,
            suffixes.pb,
          );
        },
      } as ReturnType<IMemConv['PB']>;
    },
  };
}());
