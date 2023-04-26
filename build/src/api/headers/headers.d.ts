import { CustomHeadersPre } from 'lullo-common-types';
export declare type IHeaders = FixedIncomingHttpHeaders & Partial<CustomHeadersPre>;
declare class Headers {
    headers: IHeaders;
    constructor(head?: IHeaders);
    set<K extends keyof IHeaders>(key: K, value: IHeaders[K]): void;
    setMulti(heads: {
        [K in keyof IHeaders]?: IHeaders[K];
    }): void;
    get(): IHeaders;
    filter<K extends keyof IHeaders>(keysToFilter: K[]): IHeaders;
    del<K extends keyof IHeaders>(key: K): void;
    delMulti(keys: (keyof IHeaders)[]): void;
}
export default Headers;
