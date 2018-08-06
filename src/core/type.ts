/**
 * @desc animation type
 */

import { Itype, ItypeArr } from '@/common/interface';
import Animation from '@/core/animation';

export default {
    getList(
        begin: number,
        end: number,
        time: number,
        animationType: string,
    ): number[] {
        return new Animation(begin, end, time, animationType).getList();
    },
    getObjList(
        begin: Itype,
        end: Itype,
        time: number,
        animationType: string,
    ): ItypeArr {
        const keys: string[] = Object.keys(begin);
        const res: ItypeArr = {};

        for (const i of keys) {
            res[i] = new Animation(
                begin[i],
                end[i],
                time,
                animationType,
            ).getList();
        }

        return res;
    },
};
