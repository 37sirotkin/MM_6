import gsap from 'gsap';
import {app} from "../index";
import {Sprite} from "./Sprite";

export class VideoSprite extends Sprite {
    constructor(config) {
        super(config);
        this.texture = this.createVideo(config.src);
        this.width = 500;
        this.height = 500;

    }

    createVideo(src) {
        const video = document.createElement('video');
        video.muted = true;
        video.src = src;
        return PIXI.Texture.from(video);
    }

    stop() {
        this.texture.baseTexture.source.pause();
    }

    play() {
        this.texture.baseTexture.source.play();
    }

}
