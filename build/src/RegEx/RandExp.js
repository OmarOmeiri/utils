"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const randexp_1 = require("randexp");
const Arrays_1 = require("../Arrays");
class RandExp {
    regex;
    constructor(regex) {
        this.regex = regex;
    }
    generate(n) {
        const isUndefParam = !!(!n && n !== 0);
        const regExps = Array.isArray(this.regex) ? this.regex : [this.regex];
        const ra = (0, Arrays_1.pickRandom)(regExps);
        const data = [...Array(Math.max(n || 1, 1))].map(() => (0, randexp_1.randexp)(ra));
        if (isUndefParam)
            return data[0];
        return data;
    }
}
exports.default = RandExp;
//# sourceMappingURL=RandExp.js.map