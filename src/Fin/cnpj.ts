import { getRandomInt } from '../Math';

/**
 * Formats a CNPJ
 * @param cnpj
 */
export function formatCNPJ(cnpj: string): string {
  const onlyDigCnpj = cnpj.replace(/[^\d]/g, '');
  if (onlyDigCnpj.length !== 14) throw new Error('Invalid CNPJ');
  return (
    `${onlyDigCnpj.slice(0, 2)
    }.${
      onlyDigCnpj.slice(2, 5)
    }.${onlyDigCnpj.slice(5, 8)
    }/${
      onlyDigCnpj.slice(8, 12)
    }-${
      onlyDigCnpj.slice(12, 14)}`
  );
}

/**
 * Validates a CNPJ
 * @param cnpj
 * @returns
 */
export function validateCNPj(cnpj: string): boolean {
  if (!cnpj) return false;

  // eslint-disable-next-line no-param-reassign
  cnpj = cnpj.replace(/[^\d]+/g, '');

  if (cnpj.replace(/(.)\1+/g, '$1').length <= 1) return false;

  let tamanho = cnpj.length - 2;
  let numeros = cnpj.substring(0, tamanho);
  const digitos = cnpj.substring(tamanho);
  let soma = 0;
  let pos = tamanho - 7;

  for (let i = tamanho; i >= 1; i -= 1) {
    // eslint-disable-next-line no-plusplus
    soma += Number(numeros.charAt(tamanho - i)) * pos--;
    if (pos < 2) {
      pos = 9;
    }
  }

  let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado !== Number(digitos.charAt(0))) return false;

  tamanho += 1;
  numeros = cnpj.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;
  for (let k = tamanho; k >= 1; k -= 1) {
    // eslint-disable-next-line no-plusplus
    soma += Number(numeros.charAt(tamanho - k)) * pos--;
    if (pos < 2) {
      pos = 9;
    }
  }

  resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado !== Number(digitos.charAt(1))) return false;

  return true;
}

const mod = (numerator: number, denominator: number) => Math.round(numerator - (Math.floor(numerator / denominator) * denominator));

/**
 * Generates a random CNPJ
 * @returns
 */
export function randomCNPJ(format = true): string {
  const maxDigit = 8;
  const n = 9;
  const [n1, n2, n3, n4, n5, n6, n7, n8] = Array(n)
    .fill(null)
    .map(() => getRandomInt(0, maxDigit));
  const n9 = 0;
  const n10 = 0;
  const n11 = 0;
  const n12 = 1;

  let d1 = n12 * 2 + n11 * 3 + n10 * 4 + n9 * 5 + n8 * 6 + n7 * 7 + n6 * 8 + n5 * 9 + n4 * 2 + n3 * 3 + n2 * 4 + n1 * 5;
  d1 = 11 - (mod(d1, 11));
  if (d1 >= 10) d1 = 0;

  let d2 = d1 * 2 + n12 * 3 + n11 * 4 + n10 * 5 + n9 * 6 + n8 * 7 + n7 * 8 + n6 * 9 + n5 * 2 + n4 * 3 + n3 * 4 + n2 * 5 + n1 * 6;
  d2 = 11 - (mod(d2, 11));
  if (d2 >= 10) d2 = 0;

  if (format) return `${n1}${n2}.${n3}${n4}${n5}.${n6}${n7}${n8}/${n9}${n10}${n11}${n12}-${d1}${d2}`;
  return `${n1}${n2}${n3}${n4}${n5}${n6}${n7}${n8}${n9}${n10}${n11}${n12}${d1}${d2}`;
}
