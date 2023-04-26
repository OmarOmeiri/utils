declare class RandExp {
    private regex;
    constructor(regex: RegExp | RegExp[]);
    generate(n?: undefined): string;
    generate(n: number): string[];
    generate(n?: number): string | string[];
}
export default RandExp;
