import Bezier from '@/core/Bezier';

/**
 * @description animation module
 */

export default class Animation {
    private begin: number;
    private end: number;
    private time: number;
    private animationType: number | string;
    private bezier: Bezier;

    /**
     *
     * @param begin 初始value
     * @param end 最终value
     * @param time 持续时间
     * @param animationType 运动类型 ease-in ease-out
     */
    constructor(
        begin: number,
        end: number,
        time: number,
        animationType: string = 'liner',
    ) {
        this.begin = begin;
        this.end = end;
        this.time = time;
        this.animationType = animationType;

        this.getBazier();
    }

    private getBazier(): void {
        if (this.animationType === 'liner') {
            this.bezier = new Bezier(
                {
                    x: 0,
                    y: 1,
                },
                {
                    x: 1,
                    y: 0,
                },
            );
        }
    }
}
