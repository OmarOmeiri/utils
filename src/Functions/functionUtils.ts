export const tryCatch = <TData = unknown, TError = unknown>(
  fn: () => TData,
  onError: (error: any) => TError,
): TData | TError => {
  try {
    const res = fn();
    return res;
  } catch (error) {
    return onError(error);
  }
};

export const tryCatchAsync = async <TData = unknown, TError = unknown>(
  fn: () => Promise<TData>,
  onError: (error: any) => Promise<TError> | TError,
): Promise<TData | TError> => {
  try {
    const res = await fn();
    return res;
  } catch (error) {
    const errRes = await onError(error);
    return errRes;
  }
};
