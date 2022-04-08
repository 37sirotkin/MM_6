import {Sprite} from "../core/Sprite";
import {fieldItems, itemsConfig} from "../const";
import {app} from "../index";
import {gsap} from "gsap/gsap-core";
import {clickSound} from "../sounds";


export class SpawnItem extends Sprite {
    constructor(config) {
        super(config);
        this.locked = false;
        this.onClick(this.spawnItems)
    }

    lock() {
        this.locked = true;
    }

    unlock() {
        this.locked = false;
    }

    spawnItems() {
        clickSound.play();
        const hand = app.getSprite('hand');
        const field = app.getSprite('field');
        const coffeeMachine = app.getSprite('coffee_machine');
        coffeeMachine.parent.zIndex = 100;
        if (!this.locked) {
            for (let i = 0; i < 3; i++) {
                const item = field.createItem(itemsConfig.americano);
                field.itemsOnBoard.push(item);
                item.newParent = field.setItemOnField(item);
                item.newParent.addChild(item);
                this.addNewItemToBoard(item);
            }
            if (field.isStupid) {

            }
            hand.visible = false;
            field.waitTutorial2();
            field.isStupid = true;
            this.lock();
        }

    }

    addNewItemToBoard(item) {
        const coffeeMachine = app.getSprite('coffee_machine');
        const newPos = item.toLocal(coffeeMachine.position, coffeeMachine.parent);
        item.position.set(newPos.x, newPos.y);
        const animation = gsap.timeline();
        animation
            .from(item.scale, {x: 0, y: 0, duration: .2})
            .to(item, {
                x: 0, y: 0, duration: .5, onComplete: () => {
                    item.position.set(0);
                }
            })

    }
}