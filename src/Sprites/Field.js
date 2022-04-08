import {Sprite} from "../core/Sprite";
import {app, emitter, toPackshot} from "../index";
import {gsap} from "gsap/gsap-core";
import {Item} from "./Item";
import {getRandomValue, hitRectangle} from "../core/utils";
import {itemsConfig} from "../const";
import {Container} from "../core/Container";
import {mergeSound, timerSound} from "../sounds";

export default class Field extends Sprite {
    constructor(config) {
        super(config);
        this.cellSize = 130;
        this.fieldCells = [];
        this.itemsOnBoard = []
        this.sortableChildren = true;
        this.locked = false;
        this.isStupid = false;
        this.isItemFound = false;
        this.createGrid();
    }

    createGrid() {
        const gridSize = 4;
        const startX = -this.cellSize - this.cellSize / 2;
        const startY = -this.cellSize - this.cellSize / 2;
        for (let row = 0; row < gridSize; row++) {
            this.fieldCells.push([]);
            for (let column = 0; column < gridSize; column++) {
                const position = {
                    x: startX + this.cellSize * row,
                    y: startY + this.cellSize * column,
                };
                this.addCell(position.x, position.y, row, column);
            }
        }
        gsap.delayedCall(.2, () => {
            this.addCoffeeMachine();
        })
    }

    addCell(x, y, indexRow, indexColumn) {
        const cell = new Container();
        cell.position.set(x, y);
        cell.indexInArray = {
            row: indexRow,
            indexColumn: indexColumn
        }
        this.fieldCells[indexRow].push(cell);
        this.addChild(cell);
    }

    addCoffeeMachine() {
        const coffeeMachine = app.getSprite('coffee_machine');
        this.fieldCells[2][1].addChild(coffeeMachine);
    }

    createItem(itemConfig) {
        itemConfig.texture = app.getTexture(itemConfig.name);
        return new Item(itemConfig);
    }

    setItemOnField(item) {
        const freeCells = this.checkFreeCells(item);
        const rowIndex = getRandomValue(0, this.fieldCells.length);
        const columnIndex = getRandomValue(0, freeCells[rowIndex].length);
        return freeCells[rowIndex][columnIndex];
    }

    checkFreeCells() {
        let freeCells = [];
        this.fieldCells.forEach(row => {
            freeCells.push(row.filter(item => !item.children[0]))
        })
        return freeCells;
    }

    checkMerge(dragObject) {
        this.itemsOnBoard.forEach(item => {
            const newPos = item.toLocal(dragObject.position, dragObject.parent);
            const newItem = new Sprite({
                position: {x: newPos.x, y: newPos.y},
                width: dragObject.width,
                height: dragObject.height
            })
            if (
                hitRectangle(item, newItem, 0) &&
                dragObject.draggable &&
                item !== dragObject &&
                item.type === dragObject.type
            ) {
                console.log('MERGE!');
                mergeSound.play();
                const spawnItem = app.getSprite('coffee_machine');
                const field = app.getSprite('field');
                this.createParentItem(itemsConfig[item.parentType], item.parent);
                item.parent.removeChild(item);
                dragObject.parent.removeChild(dragObject);
                spawnItem.unlock();
                const hand = app.getSprite('hand');
                // hand.animation.pause();
                hand.visible = false;
                this.deleteFromArray(item);
                this.deleteFromArray(dragObject);
                if (!this.isItemFound) {
                    if (field.itemsOnBoard.filter(i => i.type === 'marshmello').length > 1) {
                        this.waitTutorial2()
                    } else if (field.itemsOnBoard.filter(i => i.type === 'latte').length > 1) {
                        this.waitTutorial2()
                    } else if (field.itemsOnBoard.filter(i => i.type === 'americano').length > 1) {
                        this.waitTutorial2()
                    } else {
                        this.waitTutorial()
                    }
                }
            } else {
                console.log('no merge');
            }
        })
    }

    deleteFromArray(item) {
        this.itemsOnBoard = this.itemsOnBoard.filter((i => i !== item));
        console.log(this.itemsOnBoard);
    }

    createParentItem(configItem, cell) {
        const item = this.createItem(configItem);
        this.itemsOnBoard.push(item);
        cell.addChild(item);
        this.checkLastItem(item);
        gsap.to(item.scale, {x: 1.3, y: 1.3, duration: .3, yoyo: true, repeat: 1})
    }

    checkLastItem(item) {
        if (item.type === 'coffee') {
            this.isItemFound = true;
            emitter.emit = true;
            timerSound.stop();
            this.locked = true;
            const italian = app.getSprite('italian');
            const coffee_machine = app.getSprite('coffee_machine');
            italian.timer.stopTimer();
            item.interactive = false;
            coffee_machine.interactive = false;
            gsap.delayedCall(.5, () => {
                const iconPos = item.toLocal(italian.position, italian.parent);
                gsap.timeline()
                    .to(item.scale, {x: 1.3, y: 1.3, duration: 1})
                    .to(item, {x: 0, y: 0, duration: .5})
                    .to(item, {
                        x: iconPos.x, y: iconPos.y + 30, duration: .5, onComplete: () => {
                            italian.iconOrder.hide();
                            item.hide();
                            gsap.delayedCall(1, toPackshot);
                        }
                    })
            })
        }
    }

    waitTutorial() {
        console.log('wait1')
        const field = app.getSprite('field');
        const hand = app.getSprite('hand');
        hand.animation && hand.animation.pause();
        gsap.delayedCall(1, () => {
            if (!field.isStupid) {
                hand.alpha = 1;
                hand.tutorialMachine().play();
                hand.type = 'machine';
            }
        })
    }

    waitTutorial2() {
        console.log('wait2')
        const hand = app.getSprite('hand');
        hand.animation && hand.animation.pause();
        gsap.delayedCall(1, () => {
            hand.visible = true;
            hand.alpha = 1;
            hand.tutorialItems().play();
            hand.type = 'items';
        })
    }

}