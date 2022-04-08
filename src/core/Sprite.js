import gsap from 'gsap';
import {app} from "../index";

export class Sprite extends PIXI.Sprite {
    constructor(config) {
        super(config.texture);
        this.x = config.position ? config.position.x : 0;
        this.y = config.position ? config.position.y : 0;
        this.alpha = config.alpha || 1;
        config.anchor ? this.anchor.set(config.anchor.x, config.anchor.y) : this.anchor.set(.5, .5);
        if (config.scale) this.scale.set(config.scale.x, config.scale.y);
        this.objectId = config.objectId || null;
        this.portraitX = config.portraitX || this.x;
        this.portraitY = config.portraitY || this.y;
        this.adaptivePosition = config.adaptivePosition || false;
        this.width = config.width || this.width;
        this.height = config.height || this.height;
        this.devMode = config.devMode || false;
        this.devMode ? this.setDevAnchor() : null;
        this.devMode ? this.setDevPosition() : null;
        window.addEventListener('orientationchange', () =>
            this._changeOrientation(this.x, this.y, config.portraitX, config.portraitY)
        );
    }

    setDevAnchor() {
        const devAnchor = new Sprite({
            name: 'dev',
            texture: app.getTexture('devAnchor'),
            objectId: 'devAnchor'
        });
        devAnchor.anchor.set(.5);
        devAnchor.scale.set(.5);
        this.addChild(devAnchor);
    }

    setDevPosition() {
        this.interactive = true;
        this.on('pointerdown', dragStart)
            .on('pointerup', dragEnd)
            .on('pointermove', dragMove);

        function dragStart(event) {
            this.data = event.data;
        }

        function dragMove() {
            const newPosition = this.data.getLocalPosition(this.parent);
            this.x = newPosition.x;
            this.y = newPosition.y;
        }

        function dragEnd() {
            this.data = null;
            console.log(this.position);
        }
    }

    onClick(func) { //по клику на спрайт, выполняется функция func
        this.interactive = true;
        this.buttonMode = true;
        this.on('pointerdown', func);
    }

    _changeOrientation(x, y, portraitX, portraitY) {
        if (this.adaptivePosition) {
            if (window.innerWidth < window.innerHeight) {
                this.x = portraitX;
                this.y = portraitY;
            } else {
                this.x = x;
                this.y = y;
            }
        }
    }

    getAnchor() {
        return {x: this.anchor.x, y: this.anchor.y};
    }

    show() { //плавное появление спрайта
        this.visible = true;
        gsap.to(
            this,
            {
                alpha: 1,
                duration: 0.3,
                ease: 'easeInOut'
            }
        );
    }

    hide() { //плавное исчезновение спрайта
        gsap.to(
            this,
            {
                alpha: 0,
                duration: 0.3,
                ease: 'easeInOut',
                onComplete: () => (this.visible = false),
            }
        );
    }
}
