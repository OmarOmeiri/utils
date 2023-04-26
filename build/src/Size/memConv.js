"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemConv = exports.multipliers = exports.suffixes = void 0;
const Math_1 = require("../Math");
const bitBase = 8;
exports.suffixes = {
    bit: 'b',
    b: 'B',
    kb: 'KB',
    mb: 'MB',
    gb: 'GB',
    tb: 'TB',
    pb: 'PB',
};
exports.multipliers = {
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
function conv(value, hr, rnd, multiplier, suffix) {
    let val = value * multiplier;
    if ((value * multiplier) > Number.MAX_SAFE_INTEGER) {
        val = Number.MAX_SAFE_INTEGER;
    }
    if (val < Number.MIN_VALUE)
        val = 0;
    if ((rnd || rnd === 0) && val < Number.MAX_SAFE_INTEGER) {
        val = (0, Math_1.round)(val, rnd);
    }
    if (hr)
        return `${val}${suffix}`;
    return val;
}
exports.MemConv = (function _() {
    return {
        bit(value) {
            return {
                toBitHr(opts = {}) {
                    return conv(value, true, opts.round || false, exports.multipliers.bit.toBitHr, exports.suffixes.bit);
                },
                toB(opts = {}) {
                    return conv(value, opts.hr || false, opts.round || false, exports.multipliers.bit.toB, exports.suffixes.b);
                },
                toKB(opts = {}) {
                    return conv(value, opts.hr || false, opts.round || false, exports.multipliers.bit.toKB, exports.suffixes.kb);
                },
                toMB(opts = {}) {
                    return conv(value, opts.hr || false, opts.round || false, exports.multipliers.bit.toMB, exports.suffixes.mb);
                },
                toGB(opts = {}) {
                    return conv(value, opts.hr || false, opts.round || false, exports.multipliers.bit.toGB, exports.suffixes.gb);
                },
                toTB(opts = {}) {
                    return conv(value, opts.hr || false, opts.round || false, exports.multipliers.bit.toTB, exports.suffixes.tb);
                },
                toPB(opts = {}) {
                    return conv(value, opts.hr || false, opts.round || false, exports.multipliers.bit.toPB, exports.suffixes.pb);
                },
            };
        },
        B(value) {
            return {
                toBit(opts = {}) {
                    return conv(value, opts.hr || false, opts.round || false, exports.multipliers.B.toBit, exports.suffixes.bit);
                },
                toBHr(opts = {}) {
                    return conv(value, true, opts.round || false, exports.multipliers.B.toBHr, exports.suffixes.b);
                },
                toKB(opts = {}) {
                    return conv(value, opts.hr || false, opts.round || false, exports.multipliers.B.toKB, exports.suffixes.kb);
                },
                toMB(opts = {}) {
                    return conv(value, opts.hr || false, opts.round || false, exports.multipliers.B.toMB, exports.suffixes.mb);
                },
                toGB(opts = {}) {
                    return conv(value, opts.hr || false, opts.round || false, exports.multipliers.B.toGB, exports.suffixes.gb);
                },
                toTB(opts = {}) {
                    return conv(value, opts.hr || false, opts.round || false, exports.multipliers.B.toTB, exports.suffixes.tb);
                },
                toPB(opts = {}) {
                    return conv(value, opts.hr || false, opts.round || false, exports.multipliers.B.toPB, exports.suffixes.pb);
                },
            };
        },
        KB(value) {
            return {
                toBit(opts = {}) {
                    return conv(value, opts.hr || false, opts.round || false, exports.multipliers.KB.toBit, exports.suffixes.bit);
                },
                toB(opts = {}) {
                    return conv(value, opts.hr || false, opts.round || false, exports.multipliers.KB.toB, exports.suffixes.b);
                },
                toKBHr(opts = {}) {
                    return conv(value, true, opts.round || false, exports.multipliers.KB.toKBHr, exports.suffixes.kb);
                },
                toMB(opts = {}) {
                    return conv(value, opts.hr || false, opts.round || false, exports.multipliers.KB.toMB, exports.suffixes.mb);
                },
                toGB(opts = {}) {
                    return conv(value, opts.hr || false, opts.round || false, exports.multipliers.KB.toGB, exports.suffixes.gb);
                },
                toTB(opts = {}) {
                    return conv(value, opts.hr || false, opts.round || false, exports.multipliers.KB.toTB, exports.suffixes.tb);
                },
                toPB(opts = {}) {
                    return conv(value, opts.hr || false, opts.round || false, exports.multipliers.KB.toPB, exports.suffixes.pb);
                },
            };
        },
        MB(value) {
            return {
                toBit(opts = {}) {
                    return conv(value, opts.hr || false, opts.round || false, exports.multipliers.MB.toBit, exports.suffixes.bit);
                },
                toB(opts = {}) {
                    return conv(value, opts.hr || false, opts.round || false, exports.multipliers.MB.toB, exports.suffixes.b);
                },
                toKB(opts = {}) {
                    return conv(value, opts.hr || false, opts.round || false, exports.multipliers.MB.toKB, exports.suffixes.kb);
                },
                toMBHr(opts = {}) {
                    return conv(value, true, opts.round || false, exports.multipliers.MB.toMBHr, exports.suffixes.mb);
                },
                toGB(opts = {}) {
                    return conv(value, opts.hr || false, opts.round || false, exports.multipliers.MB.toGB, exports.suffixes.gb);
                },
                toTB(opts = {}) {
                    return conv(value, opts.hr || false, opts.round || false, exports.multipliers.MB.toTB, exports.suffixes.tb);
                },
                toPB(opts = {}) {
                    return conv(value, opts.hr || false, opts.round || false, exports.multipliers.MB.toPB, exports.suffixes.pb);
                },
            };
        },
        GB(value) {
            return {
                toBit(opts = {}) {
                    return conv(value, opts.hr || false, opts.round || false, exports.multipliers.GB.toBit, exports.suffixes.bit);
                },
                toB(opts = {}) {
                    return conv(value, opts.hr || false, opts.round || false, exports.multipliers.GB.toB, exports.suffixes.b);
                },
                toKB(opts = {}) {
                    return conv(value, opts.hr || false, opts.round || false, exports.multipliers.GB.toKB, exports.suffixes.kb);
                },
                toMB(opts = {}) {
                    return conv(value, opts.hr || false, opts.round || false, exports.multipliers.GB.toMB, exports.suffixes.mb);
                },
                toGBHr(opts = {}) {
                    return conv(value, true, opts.round || false, exports.multipliers.GB.toGBHr, exports.suffixes.gb);
                },
                toTB(opts = {}) {
                    return conv(value, opts.hr || false, opts.round || false, exports.multipliers.GB.toTB, exports.suffixes.tb);
                },
                toPB(opts = {}) {
                    return conv(value, opts.hr || false, opts.round || false, exports.multipliers.GB.toPB, exports.suffixes.pb);
                },
            };
        },
        TB(value) {
            return {
                toBit(opts = {}) {
                    return conv(value, opts.hr || false, opts.round || false, exports.multipliers.TB.toBit, exports.suffixes.bit);
                },
                toB(opts = {}) {
                    return conv(value, opts.hr || false, opts.round || false, exports.multipliers.TB.toB, exports.suffixes.b);
                },
                toKB(opts = {}) {
                    return conv(value, opts.hr || false, opts.round || false, exports.multipliers.TB.toKB, exports.suffixes.kb);
                },
                toMB(opts = {}) {
                    return conv(value, opts.hr || false, opts.round || false, exports.multipliers.TB.toMB, exports.suffixes.mb);
                },
                toGB(opts = {}) {
                    return conv(value, opts.hr || false, opts.round || false, exports.multipliers.TB.toGB, exports.suffixes.gb);
                },
                toTBHr(opts = {}) {
                    return conv(value, true, opts.round || false, exports.multipliers.TB.toTBHr, exports.suffixes.tb);
                },
                toPB(opts = {}) {
                    return conv(value, opts.hr || false, opts.round || false, exports.multipliers.TB.toPB, exports.suffixes.pb);
                },
            };
        },
        PB(value) {
            return {
                toBit(opts = {}) {
                    return conv(value, opts.hr || false, opts.round || false, exports.multipliers.PB.toBit, exports.suffixes.bit);
                },
                toB(opts = {}) {
                    return conv(value, opts.hr || false, opts.round || false, exports.multipliers.PB.toB, exports.suffixes.b);
                },
                toKB(opts = {}) {
                    return conv(value, opts.hr || false, opts.round || false, exports.multipliers.PB.toKB, exports.suffixes.kb);
                },
                toMB(opts = {}) {
                    return conv(value, opts.hr || false, opts.round || false, exports.multipliers.PB.toMB, exports.suffixes.mb);
                },
                toGB(opts = {}) {
                    return conv(value, opts.hr || false, opts.round || false, exports.multipliers.PB.toGB, exports.suffixes.gb);
                },
                toTB(opts = {}) {
                    return conv(value, opts.hr || false, opts.round || false, exports.multipliers.PB.toTB, exports.suffixes.tb);
                },
                toPBHr(opts = {}) {
                    return conv(value, true, opts.round || false, exports.multipliers.TB.toTBHr, exports.suffixes.pb);
                },
            };
        },
    };
}());
//# sourceMappingURL=memConv.js.map