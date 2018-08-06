/**
 * @description canvas-bezier-curve entry
 */
import Animation from '@/core/animation';
import type from '@/core/type';

class Ball {
    public renderList: number[];

    private ctx: CanvasRenderingContext2D;
    private radius: number = 20;
    private animation: Animation;

    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
        // this.animation = new Animation(200, 400, 2, 'in-back-out');
        this.animation = new Animation(200, 400, 2, '.68,0 ,1, 1');
        this.renderList = this.animation.getList();

        // this.renderList = type.getList({ x: 0, y: 0 }, { x: 400, y: 400 }, 2);
    }

    public render(): void {
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.fillStyle = 'red';
        if (this.renderList.length) {
            const item: number = this.renderList.shift();
            this.ctx.arc(200, item, this.radius, 0, Math.PI * 2);
        } else {
            this.ctx.arc(200, 200, this.radius, 0, Math.PI * 2);
        }
        this.ctx.fill();
        this.ctx.restore();
    }
}

export default (): void => {
    // api
    const canvas: HTMLCanvasElement = document.createElement('canvas');
    const ctx: CanvasRenderingContext2D = canvas.getContext('2d');

    const width: number = 500;
    const height: number = 800;
    const pixelRatio: number = window.devicePixelRatio;

    canvas.width = width * pixelRatio;
    canvas.height = height * pixelRatio;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ball: Ball = new Ball(ctx);
    document.body.appendChild(canvas);

    const render: FrameRequestCallback = (): void => {
        ctx.clearRect(0, 0, width * pixelRatio, height * pixelRatio);
        ball.render();

        if (ball.renderList.length) {
            window.requestAnimationFrame(render);
        }
    };

    window.requestAnimationFrame(render);
};
