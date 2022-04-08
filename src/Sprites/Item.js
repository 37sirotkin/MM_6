import {Sprite} from "../core/Sprite";
import {app} from "../index";
import {fieldItems} from "../const";
import {clickSound} from "../sounds";
import {hitRectangle} from "../core/utils";

export class Item extends Sprite {
    constructor(config) {
        super(config);
        this.name = config.name;
        this.type = config.type;
        this.select = app.getSprite('select');
        this.parentType = config.parentType;
        this.anchor.set(0.5);
        this.draggable = false;
        this.interactive = true;
        fieldItems.push(this);

        this.on('pointerdown', this.dragStart)
            .on('pointerup', this.dragEnd)
            .on('pointerupoutside', this.dragEnd)
            .on('pointermove', this.dragMove);
    }

    dragStart(event) {
        const field = app.getSprite('field');
        if (!field.locked) {
            clickSound.play();
            this.parent.zIndex = 1000;
            this.draggable = true;
            this.dragStartX = this.x;
            this.dragStartY = this.y;
            this.data = event.data;
            this.parent.addChild(this.select);
            this.select.x = this.x;
            this.select.y = this.y;
            field.isStupid = false;
        }
    }

    dragMove() {
        const field = app.getSprite('field');


        if (this.draggable && !field.locked) {
            const newPosition = this.data.getLocalPosition(this.parent);
            const hand = app.getSprite('hand');
            if (hand.type === 'items') hand.alpha = 0;
            this.x = newPosition.x;
            this.y = newPosition.y;
            this.parent.removeChild(this.select);
        }
    }

    dragEnd() {
        this.parent.zIndex = 0;
        const field = app.getSprite('field');
        if (!field.locked) field.checkMerge(this);
        this.draggable = false;
        this.x = this.dragStartX;
        this.y = this.dragStartY;
        this.draggable = false;
        const hand = app.getSprite('hand');
    }


}