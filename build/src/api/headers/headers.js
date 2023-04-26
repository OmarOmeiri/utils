"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Headers {
    headers = {};
    constructor(head) {
        if (!head?.origin)
            this.headers.origin = '127.0.0.1:3000';
        Object.keys(head ?? []).forEach((h) => {
            const key = h;
            if (head?.[key])
                this.headers[key] = head[key];
        });
    }
    set(key, value) {
        // @ts-ignore
        this.headers[key] = typeof value === 'string' ? value : JSON.stringify(value);
    }
    setMulti(heads) {
        Object.entries(heads).forEach(([key, value]) => {
            this.set(key, value);
        });
    }
    get() {
        return this.headers;
    }
    filter(keysToFilter) {
        return Object.fromEntries(Object
            .entries(this.headers)
            .filter(([key]) => !keysToFilter.includes(key)));
    }
    del(key) {
        delete this.headers[key];
    }
    delMulti(keys) {
        keys.forEach((key) => this.del(key));
    }
}
exports.default = Headers;
//# sourceMappingURL=headers.js.map