interface IMemConv {
    bit: (value: number) => {
        toBitHr(opts?: {
            round?: number;
        }): string;
        toB(opts: {
            hr: true;
            round?: number;
        }): string;
        toB(opts?: {
            hr?: false;
            round?: number;
        }): number;
        toKB(opts: {
            hr: true;
            round?: number;
        }): string;
        toKB(opts?: {
            hr?: false;
            round?: number;
        }): number;
        toMB(opts: {
            hr: true;
            round?: number;
        }): string;
        toMB(opts?: {
            hr?: false;
            round?: number;
        }): number;
        toGB(opts: {
            hr: true;
            round?: number;
        }): string;
        toGB(opts?: {
            hr?: false;
            round?: number;
        }): number;
        toTB(opts: {
            hr: true;
            round?: number;
        }): string;
        toTB(opts?: {
            hr?: false;
            round?: number;
        }): number;
        toPB(opts: {
            hr: true;
            round?: number;
        }): string;
        toPB(opts?: {
            hr?: false;
            round?: number;
        }): number;
    };
    B: (value: number) => {
        toBit(opts: {
            hr: true;
            round?: number;
        }): string;
        toBit(opts?: {
            hr?: false;
            round?: number;
        }): number;
        toBHr(opts?: {
            round?: number;
        }): string;
        toKB(opts: {
            hr: true;
            round?: number;
        }): string;
        toKB(opts?: {
            hr?: false;
            round?: number;
        }): number;
        toMB(opts: {
            hr: true;
            round?: number;
        }): string;
        toMB(opts?: {
            hr?: false;
            round?: number;
        }): number;
        toGB(opts: {
            hr: true;
            round?: number;
        }): string;
        toGB(opts?: {
            hr?: false;
            round?: number;
        }): number;
        toTB(opts: {
            hr: true;
            round?: number;
        }): string;
        toTB(opts?: {
            hr?: false;
            round?: number;
        }): number;
        toPB(opts: {
            hr: true;
            round?: number;
        }): string;
        toPB(opts?: {
            hr?: false;
            round?: number;
        }): number;
    };
    KB: (value: number) => {
        toBit(opts: {
            hr: true;
            round?: number;
        }): string;
        toBit(opts?: {
            hr?: false;
            round?: number;
        }): number;
        toB(opts: {
            hr: true;
            round?: number;
        }): string;
        toB(opts?: {
            hr?: false;
            round?: number;
        }): number;
        toKBHr(opts?: {
            round?: number;
        }): string;
        toMB(opts: {
            hr: true;
            round?: number;
        }): string;
        toMB(opts?: {
            hr?: false;
            round?: number;
        }): number;
        toGB(opts: {
            hr: true;
            round?: number;
        }): string;
        toGB(opts?: {
            hr?: false;
            round?: number;
        }): number;
        toTB(opts: {
            hr: true;
            round?: number;
        }): string;
        toTB(opts?: {
            hr?: false;
            round?: number;
        }): number;
        toPB(opts: {
            hr: true;
            round?: number;
        }): string;
        toPB(opts?: {
            hr?: false;
            round?: number;
        }): number;
    };
    MB: (value: number) => {
        toBit(opts: {
            hr: true;
            round?: number;
        }): string;
        toBit(opts?: {
            hr?: false;
            round?: number;
        }): number;
        toB(opts: {
            hr: true;
            round?: number;
        }): string;
        toB(opts?: {
            hr?: false;
            round?: number;
        }): number;
        toKB(opts: {
            hr: true;
            round?: number;
        }): string;
        toKB(opts?: {
            hr?: false;
            round?: number;
        }): number;
        toMBHr(opts?: {
            round?: number;
        }): string;
        toGB(opts: {
            hr: true;
            round?: number;
        }): string;
        toGB(opts?: {
            hr?: false;
            round?: number;
        }): number;
        toTB(opts: {
            hr: true;
            round?: number;
        }): string;
        toTB(opts?: {
            hr?: false;
            round?: number;
        }): number;
        toPB(opts: {
            hr: true;
            round?: number;
        }): string;
        toPB(opts?: {
            hr?: false;
            round?: number;
        }): number;
    };
    GB: (value: number) => {
        toBit(opts: {
            hr: true;
            round?: number;
        }): string;
        toBit(opts?: {
            hr?: false;
            round?: number;
        }): number;
        toB(opts: {
            hr: true;
            round?: number;
        }): string;
        toB(opts?: {
            hr?: false;
            round?: number;
        }): number;
        toKB(opts: {
            hr: true;
            round?: number;
        }): string;
        toKB(opts?: {
            hr?: false;
            round?: number;
        }): number;
        toMB(opts: {
            hr: true;
            round?: number;
        }): string;
        toMB(opts?: {
            hr?: false;
            round?: number;
        }): number;
        toGBHr(opts?: {
            round?: number;
        }): string;
        toTB(opts: {
            hr: true;
            round?: number;
        }): string;
        toTB(opts?: {
            hr?: false;
            round?: number;
        }): number;
        toPB(opts: {
            hr: true;
            round?: number;
        }): string;
        toPB(opts?: {
            hr?: false;
            round?: number;
        }): number;
    };
    TB: (value: number) => {
        toBit(opts: {
            hr: true;
            round?: number;
        }): string;
        toBit(opts?: {
            hr?: false;
            round?: number;
        }): number;
        toB(opts: {
            hr: true;
            round?: number;
        }): string;
        toB(opts?: {
            hr?: false;
            round?: number;
        }): number;
        toKB(opts: {
            hr: true;
            round?: number;
        }): string;
        toKB(opts?: {
            hr?: false;
            round?: number;
        }): number;
        toMB(opts: {
            hr: true;
            round?: number;
        }): string;
        toMB(opts?: {
            hr?: false;
            round?: number;
        }): number;
        toGB(opts: {
            hr: true;
            round?: number;
        }): string;
        toGB(opts?: {
            hr?: false;
            round?: number;
        }): number;
        toTBHr(opts?: {
            round?: number;
        }): string;
        toPB(opts: {
            hr: true;
            round?: number;
        }): string;
        toPB(opts?: {
            hr?: false;
            round?: number;
        }): number;
    };
    PB: (value: number) => {
        toBit(opts: {
            hr: true;
            round?: number;
        }): string;
        toBit(opts?: {
            hr?: false;
            round?: number;
        }): number;
        toB(opts: {
            hr: true;
            round?: number;
        }): string;
        toB(opts?: {
            hr?: false;
            round?: number;
        }): number;
        toKB(opts: {
            hr: true;
            round?: number;
        }): string;
        toKB(opts?: {
            hr?: false;
            round?: number;
        }): number;
        toMB(opts: {
            hr: true;
            round?: number;
        }): string;
        toMB(opts?: {
            hr?: false;
            round?: number;
        }): number;
        toGB(opts: {
            hr: true;
            round?: number;
        }): string;
        toGB(opts?: {
            hr?: false;
            round?: number;
        }): number;
        toTB(opts: {
            hr: true;
            round?: number;
        }): string;
        toTB(opts?: {
            hr?: false;
            round?: number;
        }): number;
        toPBHr(opts?: {
            round?: number;
        }): string;
    };
}
export declare const suffixes: {
    bit: string;
    b: string;
    kb: string;
    mb: string;
    gb: string;
    tb: string;
    pb: string;
};
export declare const multipliers: {
    bit: {
        toBitHr: number;
        toB: number;
        toKB: number;
        toMB: number;
        toGB: number;
        toTB: number;
        toPB: number;
    };
    B: {
        toBit: number;
        toBHr: number;
        toKB: number;
        toMB: number;
        toGB: number;
        toTB: number;
        toPB: number;
    };
    KB: {
        toBit: number;
        toB: number;
        toKBHr: number;
        toMB: number;
        toGB: number;
        toTB: number;
        toPB: number;
    };
    MB: {
        toBit: number;
        toB: number;
        toKB: number;
        toMBHr: number;
        toGB: number;
        toTB: number;
        toPB: number;
    };
    GB: {
        toBit: number;
        toB: number;
        toKB: number;
        toMB: number;
        toGBHr: number;
        toTB: number;
        toPB: number;
    };
    TB: {
        toBit: number;
        toB: number;
        toKB: number;
        toMB: number;
        toGB: number;
        toTBHr: number;
        toPB: number;
    };
    PB: {
        toBit: number;
        toB: number;
        toKB: number;
        toMB: number;
        toGB: number;
        toTB: number;
        toPBHr: number;
    };
};
export declare const MemConv: IMemConv;
export {};
