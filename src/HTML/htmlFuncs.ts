const hasProp = <V extends object, P extends string>(
  value: object,
  property: P,
): value is V & {[K in P]: unknown} => {
  if (
    value !== null
    && property in value
  ) {
    return true;
  }

  return false;
};

/**
 * Check if a value is an HTML element
 * @param value
 * @param view
 * @returns
 */
export function isHtmlElement(value: unknown): value is HTMLElement {
  if (value instanceof HTMLElement) return true;

  return !!(
    value
    && typeof value === 'object'
    && value !== null
    && hasProp(value, 'nodeType')
    && hasProp(value, 'nodeName')
    && value.nodeType === 1
    && typeof value.nodeName === 'string'
  );
}
