import {Sprite} from "../core/Sprite";
import {app, toPackshot} from "../index";
import {gsap} from "gsap/gsap-core";


export class Timer extends Sprite {
    constructor(config) {
        super(config);
        this.addProgress();
        // this.startTimer();
    }

    addProgress() {
        const progress = new Sprite({
            name: 'progress',
            texture: app.getTexture('timer_progress'),
            position: {x: -85, y: -8},
            anchor: {x: 0, y: 0}
        })
        this.progress = progress;
        this.addChild(progress);
    }

    startTimer() {
        const field = app.getSprite('field');
        this.timerCount = setInterval(() => {
            this.progress.width -= 5;
        }, 1000)
        setTimeout(() => {
            const field = app.getSprite('field');
            if (!field.locked)toPackshot();
        }, 35000)
    }

    stopTimer() {
        console.log('here');
        clearInterval(this.timerCount);
    }
}