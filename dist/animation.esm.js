var _createClass$1 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck$1(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// import bezierEasing from 'bezier-easing';
var bezierEasing = require('bezier-easing');
// 3次贝塞尔曲线

var Bezier = function () {
    function Bezier(p1, p2) {
        _classCallCheck$1(this, Bezier);

        this.p0 = {
            x: 0,
            y: 0
        };
        this.p3 = {
            x: 1,
            y: 1
        };
        this.p1 = p1;
        this.p2 = p2;
        this.bezierStr = p1.x + ', ' + p1.y + ', ' + p2.x + ', ' + p2.y;
        this.easing = bezierEasing(p1.x, p1.y, p2.x, p2.y);
    }

    _createClass$1(Bezier, [{
        key: 'getPoint',
        value: function getPoint(t) {
            return {
                x: this.p0.x * Math.pow(1 - t, 3) + this.p1.x * t * Math.pow(1 - t, 2) * 3 + this.p2.x * Math.pow(t, 2) * (1 - t) * 3 + this.p3.x * Math.pow(t, 3),
                y: this.p0.y * Math.pow(1 - t, 3) + this.p1.y * t * Math.pow(1 - t, 2) * 3 + this.p2.y * Math.pow(t, 2) * (1 - t) * 3 + this.p3.y * Math.pow(t, 3)
            };
        }
    }, {
        key: 'getYByTime',
        value: function getYByTime(t) {
            return this.easing(t);
        }
    }]);

    return Bezier;
}();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @description animation module
 */
var Animation = function () {
    /**
     *
     * @param begin 初始value
     * @param end 最终value
     * @param time 持续时间
     * @param animationType 运动类型 etc:ease-in ease-out
     */
    function Animation(begin, end, time) {
        var animationType = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'liner';

        _classCallCheck(this, Animation);

        this.begin = begin;
        this.end = end;
        this.time = time;
        this.animationType = animationType;
        this.getBazier();
    }

    _createClass(Animation, [{
        key: 'getValue',
        value: function getValue(t) {
            return this.begin + this.end * this.bezier.getYByTime(t);
        }
    }, {
        key: 'getList',
        value: function getList() {
            var framePerSecond = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 60;

            var list = [];
            for (var i = 0; i <= framePerSecond * this.time; i = i + 1) {
                list.push(this.getValue(i / (this.time * framePerSecond)));
            }
            return list;
        }
    }, {
        key: 'getBazier',
        value: function getBazier() {
            var p1 = void 0;
            var p2 = void 0;
            switch (this.animationType) {
                case 'liner':
                    p1 = {
                        x: 0,
                        y: 0
                    };
                    p2 = {
                        x: 1,
                        y: 1
                    };
                    break;
                case 'ease':
                    p1 = {
                        x: 0.25,
                        y: 0.1
                    };
                    p2 = {
                        x: 0.25,
                        y: 1
                    };
                    break;
                case 'ease-in':
                    p1 = {
                        x: 0.42,
                        y: 0
                    };
                    p2 = {
                        x: 1,
                        y: 1
                    };
                    break;
                case 'ease-out':
                    p1 = {
                        x: 0,
                        y: 0
                    };
                    p2 = {
                        x: 0.58,
                        y: 1
                    };
                    break;
                case 'ease-in-out':
                    p1 = {
                        x: 0.42,
                        y: 0
                    };
                    p2 = {
                        x: 0.58,
                        y: 1
                    };
                    break;
                case 'in-back-out':
                    p1 = {
                        x: 0.68,
                        y: -0.55
                    };
                    p2 = {
                        x: 0.27,
                        y: 1.55
                    };
                    break;
                default:
                    // point str
                    var strArr = this.animationType.split(',');
                    if (!strArr || strArr.length !== 4) {
                        throw new Error('The animation type is not right');
                    }
                    p1 = {
                        x: parseFloat(strArr[0]),
                        y: parseFloat(strArr[1])
                    };
                    p2 = {
                        x: parseFloat(strArr[2]),
                        y: parseFloat(strArr[3])
                    };
            }
            this.bezier = new Bezier(p1, p2);
        }
    }]);

    return Animation;
}();

export default Animation;
//# sourceMappingURL=animation.esm.js.map
