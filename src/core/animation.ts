/**
 * @description animation module
 */

import { Ipoint } from '@/common/interface';
import Bezier from '@/core/Bezier';

export default class Animation {
    private begin: number;
    private end: number;
    private time: number;
    private animationType: string;
    private bezier: Bezier;

    /**
     *
     * @param begin 初始value
     * @param end 最终value
     * @param time 持续时间
     * @param animationType 运动类型 etc:ease-in ease-out
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

    public getValue(t: number): number {
        return this.begin + (this.end - this.begin) * this.bezier.getYByTime(t);
    }

    public getList(framePerSecond: number = 60): number[] {
        const list: number[] = [];
        for (let i: number = 0; i <= framePerSecond * this.time; i = i + 1) {
            list.push(this.getValue(i / (this.time * framePerSecond)));
        }

        return list;
    }

    private getBazier(): void {
        let p1: Ipoint;
        let p2: Ipoint;
        switch (this.animationType) {
            case 'liner':
                p1 = {
                    x: 0,
                    y: 0,
                };
                p2 = {
                    x: 1,
                    y: 1,
                };
                break;
            case 'ease':
                p1 = {
                    x: 0.25,
                    y: 0.1,
                };
                p2 = {
                    x: 0.25,
                    y: 1,
                };
                break;
            case 'ease-in':
                p1 = {
                    x: 0.42,
                    y: 0,
                };
                p2 = {
                    x: 1,
                    y: 1,
                };
                break;
            case 'ease-out':
                p1 = {
                    x: 0,
                    y: 0,
                };
                p2 = {
                    x: 0.58,
                    y: 1,
                };
                break;
            case 'ease-in-out':
                p1 = {
                    x: 0.42,
                    y: 0,
                };
                p2 = {
                    x: 0.58,
                    y: 1,
                };
                break;
            case 'in-back-out':
                p1 = {
                    x: 0.68,
                    y: -0.55,
                };
                p2 = {
                    x: 0.27,
                    y: 1.55,
                };
                break;
            default:
                // point str
                const strArr: string[] = this.animationType.split(',');
                if (!strArr || strArr.length !== 4) {
                    throw new Error('The animation type is not right');
                }
                p1 = {
                    x: parseFloat(strArr[0]),
                    y: parseFloat(strArr[1]),
                };
                p2 = {
                    x: parseFloat(strArr[2]),
                    y: parseFloat(strArr[3]),
                };
        }

        this.bezier = new Bezier(p1, p2);
    }
}
