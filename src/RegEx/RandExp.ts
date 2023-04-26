import { randexp } from 'randexp';
import { pickRandom } from '../Arrays';

class RandExp {
  constructor(
    private regex: RegExp | RegExp[],
  ) {}

  generate(n?: undefined): string
  generate(n: number): string[]
  generate(n?: number): string | string[]
  generate(n?: number): string | string[] {
    const isUndefParam = !!(!n && n !== 0);

    const regExps = Array.isArray(this.regex) ? this.regex : [this.regex];
    const ra = pickRandom(regExps);
    const data = [...Array(Math.max(n || 1, 1))].map(() => randexp(ra));
    if (isUndefParam) return data[0];
    return data;
  }
}

export default RandExp;
