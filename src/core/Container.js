export class Container extends PIXI.Container {
    constructor() {
        super({
            sortableChildren: true  //важное свойство для работы с zIndex в container
        })
        this.sortableChildren = true;
    }
}