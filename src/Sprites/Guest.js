import {Sprite} from "../core/Sprite";
import {Timer} from "./Timer";
import {app, toPackshot} from "../index";
import {gsap} from "gsap/gsap-core";
import {hitRectangle} from "../core/utils";
import {itemsConfig} from "../const";


export class Guest extends Sprite {
    constructor(config) {
        super(config);
        this.iconOrder = null;
        this.addTimer();
        this.addIconOrder();
    }

    addTimer() {
        const timer = new Timer({
            texture: app.getTexture('timer_main'),
            name: 'timer',
        })
        this.timer = timer;
        this.addChild(timer);
    }

    addIconOrder() {
        const icon = new Sprite({
            texture: app.getTexture('iconOrder'),
            name: 'icon',
            position: { x: -200, y: 0 },
            scale: { x: 1.3, y: 1.3 }
        })
        this.addChild(icon);
        this.iconOrder = icon;
        gsap.timeline({ repeat: -1, yoyo: true })
            .to(icon, { x: -220, duration: 1, ease: 'power1.inOut' })
    }
}