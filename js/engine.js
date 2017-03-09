/**
 * Created by Pie 5 on 01/03/2017.
 */

/**
 * References:
 * https://blogs.msdn.microsoft.com/lukeh/2007/04/03/a-ray-tracer-in-c3-0/
 */

class Engine{
    constructor(canvas){
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");

        this.width = this.canvas.width;
        this.height = this.canvas.height;

        this.backbuffer = this.ctx.getImageData(0, 0, this.width, this.height);

        this.fullscreen = false;

        this.start = this.start.bind(this);
        this.stop = this.stop.bind(this);

        this.onResize = this.onResize.bind(this);

        this.clear = this.clear.bind(this);
        this.present = this.present.bind(this);

        this.gameLoop = this.gameLoop.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
        this.onDraw = this.onDraw.bind(this);

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
        this.onDraw();

        if(this.running){
            window.requestAnimationFrame(this.gameLoop);
        }
    }

    onUpdate(timestamp){

    }

    clear(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.backbuffer = this.ctx.getImageData(0, 0, this.width, this.height);
    }

    putPixel(x, y, color){
        this.backbufferdata = this.backbuffer.data;
        var index = ((x >> 0) + (y >> 0) * this.width) * 4;
        this.backbufferdata[index] = color.r * 255;
        this.backbufferdata[index + 1] = color.g * 255;
        this.backbufferdata[index + 2] = color.b * 255;
        this.backbufferdata[index + 3] = color.a * 255;
    }

    present(){
        this.ctx.putImageData(this.backbuffer, 0, 0);
    }

    onDraw(){
        this.clear();

        this.present();
    }

    onResize(){
        if(this.fullscreen){
            this.canvas.width  = document.width || document.body.clientWidth;
            this.canvas.height = document.height || document.body.clientHeight;
        }
    }
}