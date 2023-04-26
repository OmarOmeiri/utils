import { CustomHeadersPre } from 'lullo-common-types';

export type IHeaders = FixedIncomingHttpHeaders & Partial<CustomHeadersPre>;

class Headers {
  public headers: IHeaders = {} as any;

  constructor(head?: IHeaders) {
    if (!head?.origin) this.headers.origin = '127.0.0.1:3000';

    Object.keys(head ?? []).forEach((h) => {
      const key = h as unknown as keyof IHeaders;
      if (head?.[key]) (this.headers[key] as any) = head[key];
    });
  }

  set<K extends keyof IHeaders>(key: K, value: IHeaders[K]): void {
    // @ts-ignore
    this.headers[key] = typeof value === 'string' ? value : (JSON.stringify(value) as string);
  }

  setMulti(heads: {[K in keyof IHeaders]?: IHeaders[K]}): void {
    Object.entries(heads).forEach(([key, value]) => {
      this.set(key as keyof CustomHeadersPre | keyof FixedIncomingHttpHeaders, value);
    });
  }

  get(): IHeaders {
    return this.headers;
  }

  filter<K extends keyof IHeaders>(keysToFilter: K[]): IHeaders {
    return Object.fromEntries(
      Object
        .entries(this.headers)
        .filter(([key]) => !keysToFilter.includes(key as K)),
    );
  }

  del<K extends keyof IHeaders>(key: K): void {
    delete this.headers[key];
  }

  delMulti(keys: (keyof IHeaders)[]): void {
    keys.forEach((key) => this.del(key));
  }
}
export default Headers;
