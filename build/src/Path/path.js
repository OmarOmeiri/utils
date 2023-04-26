"use strict";
/**
 * Path utility functions
 * @module PathUtils
 * @category Path
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pathToPosix = void 0;
const path_1 = __importDefault(require("path"));
/**
 * Converts a path to posix format.
 * @param pathStr
 * @returns
 */
function pathToPosix(pathStr) {
    return pathStr.split(path_1.default.sep).join(path_1.default.posix.sep);
}
exports.pathToPosix = pathToPosix;
//# sourceMappingURL=path.js.map