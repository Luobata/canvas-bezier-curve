/**
 * @description interface collection
 */

export interface Ipoint {
    x: number;
    y: number;
}

export interface Itype {
    [key: string]: number;
}

export interface ItypeArr {
    [key: string]: number[];
}

export type Iinput = number | Itype;
