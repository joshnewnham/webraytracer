/**
 * Created by Pie 5 on 01/03/2017.
 */

/**
 * References:
 * https://blogs.msdn.microsoft.com/lukeh/2007/04/03/a-ray-tracer-in-c3-0/
 */

class RayTracer{
    constructor(canvas){
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");

        this.fullscreen = false;

        this.start = this.start.bind(this);
        this.stop = this.stop.bind(this);

        this.onResize = this.onResize.bind(this);

        this.gameLoop = this.gameLoop.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
        this.onDraw = this.onDraw.bind(this);

        this.width = this.canvas.width;
        this.height = this.canvas.height;

        window.addEventListener("resize", () => {
            this.onResize();
        });

        this.running = false;
    }

    start(){
        if(this.running){
            return;
        }
        this.running = true;
        window.requestAnimationFrame(this.gameLoop);
    }

    stop(){
        this.running = false;
    }

    gameLoop(timestamp){

        this.onUpdate(timestamp);
        this.onDraw(this.canvas, this.ctx);

        if(this.running){
            window.requestAnimationFrame(this.gameLoop);
        }
    }

    onUpdate(timestamp){


    }

    onDraw(canvas, ctx){
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.rect(10, 10, 100, 100);
        ctx.fill();
    }

    onResize(){
        if(this.fullscreen){
            this.canvas.width  = document.width || document.body.clientWidth;
            this.canvas.height = document.height || document.body.clientHeight;
        }
    }
}