/**
 * @description Bézier Curve
 */
import { Ipoint } from '@/common/interface';
// import bezierEasing from 'bezier-easing';

const bezierEasing: Function = require('bezier-easing');

// 3次贝塞尔曲线
export default class Bezier {
    private t: number;
    private p0: Ipoint;
    private p1: Ipoint;
    private p2: Ipoint;
    private p3: Ipoint;

    private bezierStr: string;
    private easing: Function;

    private center: Ipoint;
    constructor(p1: Ipoint, p2: Ipoint) {
        this.p0 = {
            x: 0,
            y: 0,
        };
        this.p3 = {
            x: 1,
            y: 1,
        };
        this.p1 = p1;
        this.p2 = p2;

        this.bezierStr = `${p1.x}, ${p1.y}, ${p2.x}, ${p2.y}`;
        this.easing = bezierEasing(p1.x, p1.y, p2.x, p2.y);
    }

    public getPoint(t: number): Ipoint {
        return {
            x:
                this.p0.x * Math.pow(1 - t, 3) +
                this.p1.x * t * Math.pow(1 - t, 2) * 3 +
                this.p2.x * Math.pow(t, 2) * (1 - t) * 3 +
                this.p3.x * Math.pow(t, 3),
            y:
                this.p0.y * Math.pow(1 - t, 3) +
                this.p1.y * t * Math.pow(1 - t, 2) * 3 +
                this.p2.y * Math.pow(t, 2) * (1 - t) * 3 +
                this.p3.y * Math.pow(t, 3),
        };
    }

    public getYByTime(t: number): number {
        return this.easing(t);
    }
}
