import config from '../config';
import { PLATFORMS } from '../const';
import { Sprite } from './Sprite';
import { sprites } from '../const';

export class Application extends PIXI.Application {
    constructor() {
        super({
            backgroundColor: 0x000000,
            width: window.innerWidth,
            height: window.innerHeight,
            autoResize: true,
            resolution: window.devicePixelRatio,
        });

        this.loader.baseUrl = './images';
        this.stage.sortableChildren = true;
        this._appendView();
    }

    resizeApp() {
        this.renderer.resize(window.innerWidth, window.innerHeight);
        this.stage.x = window.innerWidth / 2;
        this.stage.y = window.innerHeight / 2;
        this.stage.children.forEach((container) => {
            if (window.innerWidth < window.innerHeight) {
                container.scale.set(window.innerHeight / 1390);
                container.valueScale = window.innerHeight / 1390;
            } else {
                container.scale.set(window.innerWidth / 1390);
                container.valueScale = window.innerWidth / 1390;
            }
        });
    }

    _appendView() {
        document.body.appendChild(this.view);
    }

    getTexture(texture) { //получить текстуру по name в config
        return this.loader.resources[texture].texture;
    }

    getSprite(objectId) { //получить спрайт по objectId в config
        return sprites.find((s) => s.objectId === objectId);
    }

    loadTextures() { //загрузка всех текстур
        config.forEach(texture => {
            if (texture.image) {
                this.loader.add(texture.name, texture.image);
            }
        });
        this.loader.load();
    }

    loadSprites() { //загрузка всех спрайтов
        config.forEach((spriteConfig) => {
            if (spriteConfig.objectId) { //если есть objectId, тогда будет создаваться спрайт
                if (!spriteConfig.class) { // если есть class, тогда будет создаваться спрайт на основе класса
                    spriteConfig.texture = this.getTexture(spriteConfig.name);
                    const sprite = new Sprite(spriteConfig);
                    sprites.push(sprite);
                } else {
                    const spriteClass = spriteConfig.class;
                    spriteConfig.texture = this.getTexture(spriteConfig.name);
                    const sprite = new spriteClass(spriteConfig);
                    sprites.push(sprite);
                }
            }
        });
    }

    toStore(platform, appStore, playMarket) { //метод перехода в стор
        switch (platform) {
            case PLATFORMS.fb:
                FbPlayableAd.onCTAClick();
                break;
            case PLATFORMS.un:
                var userAgent = navigator.userAgent || navigator.vendor;
                var url = appStore;
                var android = playMarket;
                if (/android/i.test(userAgent)) {
                    url = android;
                }
                mraid.open(url);
                break;
            case PLATFORMS.al:
                var userAgent = navigator.userAgent || navigator.vendor;
                var url = appStore;
                var android = playMarket;
                if (/android/i.test(userAgent)) {
                    url = android;
                }
                mraid.open(url);
                break;
            case PLATFORMS.is:
                dapi.openStoreUrl();
                break;
            case PLATFORMS.tt:
                window.openAppStore();
                break;
            case PLATFORMS.mt:
                window.install && window.install();
                gameClose() ;
                break;
        }
    }
}
