export declare const tryCatch: <TData = unknown, TError = unknown>(fn: () => TData, onError: (error: any) => TError) => TData | TError;
export declare const tryCatchAsync: <TData = unknown, TError = unknown>(fn: () => Promise<TData>, onError: (error: any) => TError | Promise<TError>) => Promise<TData | TError>;
