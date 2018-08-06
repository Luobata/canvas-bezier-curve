declare class Animation {
    constructor(
        begin: number,
        end: number,
        time: number,
        animationType: string,
    );

    getValue(t: number): number;

    getList(framePerSecond: number): number[];
}

export = Animation;
