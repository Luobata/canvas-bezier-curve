/**
 * @description canvas-bezier-curve entry
 */

class Ball {
    private ctx: CanvasRenderingContext2D;
    private radius: number = 20;

    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
    }

    public render(): void {
        this.ctx.save();
        this.ctx.fillStyle = 'red';
        this.ctx.arc(100, 100, this.radius, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.restore();
    }
}

export default (): void => {
    // api
    const canvas: HTMLCanvasElement = document.createElement('canvas');
    const ctx: CanvasRenderingContext2D = canvas.getContext('2d');

    const width: number = 500;
    const height: number = 500;
    const pixelRatio: number = window.devicePixelRatio;

    canvas.width = width * pixelRatio;
    canvas.height = height * pixelRatio;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ball: Ball = new Ball(ctx);
    const animation: FrameRequestCallback = (): void => {
        ctx.clearRect(0, 0, width * pixelRatio, height * pixelRatio);
        ball.render();

        window.requestAnimationFrame(animation);
    };

    window.requestAnimationFrame(animation);

    document.body.appendChild(canvas);
};
