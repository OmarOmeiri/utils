"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Factory = void 0;
class Factory {
    static build(Cls, ...deps) {
        return new Cls(...deps);
    }
}
exports.Factory = Factory;
//# sourceMappingURL=Factory.js.map