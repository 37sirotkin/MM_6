import gsap from 'gsap';
import {Application} from './core/Application';
import {Container} from './core/Container';
import * as particles from '@pixi/particle-emitter'
import confetiConfig from './particlesConfigs/confetiConfig';
import {log, PLATFORMS, APP_STORE, PLAY_MARKET, sprites, fieldItems} from './const';
import {musicSound, timerSound, whooshSound} from "./sounds";

const container = new Container(),
    containerLogo = new Container(),
    containerBackground = new Container(),
    containerStart = new Container(),
    containerMainGame = new Container(),
    containerEmitter = new Container(),
    containerPackshot = new Container();

export const app = new Application();

app.loadTextures();
app.loader.onComplete.add(doneLoading);

window.addEventListener('resize', () => app.resizeApp());

// document.addEventListener('visibilitychange', function () {
//     if (document.visibilityState === 'visible') {
//         Howler.volume(1);
//     } else {
//         Howler.volume(0);
//     }
// });

function onReadyCallback() {
    //No need to listen to this event anymore
    dapi.removeEventListener('ready', onReadyCallback);
    let isAudioEnabled = !!dapi.getAudioVolume();
    //If the ad is visible start the game
    dapi.isViewable() ? startGame() : false;

    //Use dapi functions
    dapi.addEventListener('viewableChange', viewableChangeCallback);
    dapi.addEventListener("audioVolumeChange", audioVolumeChangeCallback);
    dapi.addEventListener('adResized', adResizeCallback);
}

function adResizeCallback(event){
    const screenSize = event;
}

function startGame() {
    var screenSize = dapi.getScreenSize();
    musicSound.play();
}

function pause() {
    musicSound.pause();
}

function audioVolumeChangeCallback(volume){
    let isAudioEnabled = !!volume;
    if (isAudioEnabled){
        musicSound.play()
    } else {
        musicSound.pause();
    }
}


function viewableChangeCallback(event){
    if (event.isViewable){
        const screenSize = dapi.getScreenSize();
        musicSound.play();
    } else {
        pause();
    }
}

function doneLoading() {
    log('DONE LOADING!');
    addContainers();
    app.loadSprites();
    createBack();
    app.resizeApp();
    app.ticker.add(update);
    dapi.isReady() ? onReadyCallback() : dapi.addEventListener('ready', onReadyCallback);
}

function addContainers() {
    app.stage.addChild(container);
    app.stage.addChild(containerLogo);
    app.stage.addChild(containerPackshot);
    app.stage.addChild(containerBackground);
    container.addChild(containerStart);
    container.addChild(containerMainGame, containerEmitter);
    container.zIndex = 100;
    containerLogo.zIndex = 100;
    containerPackshot.zIndex = 1000;
}

function createBack() {
    const blackRect = new PIXI.Graphics();
    const stage = app.getSprite('stage');
    const logo = app.getSprite('logo');
    gsap.from([logo], {y: -100, duration: 1, ease: 'power1.easeInOut'})

    containerLogo.addChild(logo);
    blackRect.beginFill(0x000, 1);
    blackRect.drawRect(-695, -695, 1390, 1390);
    blackRect.endFill();

    containerBackground.addChild(stage);
    containerPackshot.addChild(blackRect);
    gsap.to(blackRect, {alpha: 0, duration: 1.5});
    gsap.delayedCall(0.5, startPlayable);
}

function startPlayable() {
    musicSound.play();
    startStage();
}

function startStage() {
    const backBlack = app.getSprite('back_black');
    const startPlate = app.getSprite('start_plate');
    startPlate.isMainStage = false;
    const buttonLetsGo = app.getSprite('button_letsGo');
    const arinStartContainer = new Container();
    arinStartContainer.position.set(0, -220);
    const arinStartBody = app.getSprite('arin_start_body');
    const arinStartHand = app.getSprite('arin_start_hand');
    arinStartContainer.addChild(arinStartBody, arinStartHand);
    containerStart.addChild(backBlack, arinStartContainer, startPlate, buttonLetsGo);
    gsap.from(containerStart, {alpha: 0, duration: 1, ease: 'power1.onOut'})

    buttonLetsGo.onClick(() => {
        gsap.to(containerStart, {
            alpha: 0, duration: .5, ease: 'power1.onOut', onComplete: () => {
                container.removeChild(containerStart);
            }
        })
        startMainGame();
    });
    arinHandAnimation(arinStartHand);
    startButtonAnimation(buttonLetsGo);
}

function arinHandAnimation(hand) {
    const animation = gsap.timeline({repeat: -1, yoyo: true});
    animation
        .to(hand, {angle: -5, duration: 1, ease: 'power1.inOut'})
}

function startButtonAnimation(button) {
    const animation = gsap.timeline({repeat: -1, yoyo: true});
    animation
        .to(button.scale, {x: 1.15, y: 1.15, duration: 1, ease: 'power1.inOut'})
}

function startMainGame() {
    const table = app.getSprite('table');
    const field = app.getSprite('field');
    const italian = app.getSprite('italian');
    const startPlate = app.getSprite('start_plate');
    const hand = app.getSprite('hand');
    timerSound.play();
    startPlate.isMainStage = true;
    startPlate.position.set(100, -580);
    startPlate.scale.set(.7);
    container.addChild(startPlate)
    italian.timer.startTimer();
    containerMainGame.addChild(italian, table, field);

    hand.tutorialMachine = handTutorialMachine;
    hand.tutorialItems = handItemsTutorial;
    field.waitTutorial();
}

function handTutorialMachine() {
    console.log('tutorMachine')
    const hand = app.getSprite('hand');
    const field = app.getSprite('field');
    hand.position.set(90, -60);
    hand.zIndex = 1000;
    field.addChild(hand);
    hand.visible = true;
    const animation = gsap.timeline({repeat: -1})
        .from(hand, {x: 1000, y: 50, alpha: 50, duration: 1})
        .to(hand.scale, {x: .8, y: .8, duration: .5})
        .to(hand.scale, {x: 1, y: 1, duration: .5})
        .to(hand, {duration: 1})
        .to(hand, {alpha: 0, duration: .5})
    animation.pause();
    hand.animation = animation;
    return animation;
}

function handItemsTutorial() {
    let item1, item2;
    console.log('tutoritems')
    const field = app.getSprite('field');
    const hand = app.getSprite('hand');
    field.addChild(hand);
    hand.visible = true;
    hand.alpha = 1;
    if (field.itemsOnBoard.filter(i => i.type === 'marshmello').length > 1) {
        item1 = field.itemsOnBoard.find(i => i.parent && i.type === 'marshmello');
        item2 = field.itemsOnBoard.find(i => i.parent && i !== item1 && i.type === 'marshmello');
    } else if (field.itemsOnBoard.filter(i => i.type === 'latte').length > 1) {
        item1 = field.itemsOnBoard.find(i => i.parent && i.type === 'latte');
        item2 = field.itemsOnBoard.find(i => i.parent && i !== item1 && i.type === 'latte');
    } else if (field.itemsOnBoard.filter(i => i.type === 'americano').length > 1) {
        item1 = field.itemsOnBoard.find(i => i.parent && i.type === 'americano');
        item2 = field.itemsOnBoard.find(i => i.parent && i !== item1 && i.type === 'americano');
    }
    console.log(item1, item2);
    const pos1 = field.toLocal(item1.position, item1.parent);
    const pos2 = field.toLocal(item2.position, item2.parent);
    hand.scale.set(1);
    hand.alpha = 1;
    hand.position.set(pos1.x + 30, pos1.y + 30);
    const animation = gsap.timeline({repeat: -1})
        .to(hand.scale, {x: .8, y: .8, duration: .5})
        .to(hand.scale, {x: 1, y: 1, duration: .5})
        .to(hand, {x: pos2.x + 30, y: pos2.y + 30, duration: .5})
        .to(hand.scale, {x: .8, y: .8, duration: .5})
        .to(hand.scale, {x: 1, y: 1, duration: .5})
        .to(hand, {x: pos1.x + 30, y: pos1.y + 30, duration: .5})
    animation.pause();
    hand.animation = animation;
    return animation;
}

export function toPackshot() {
    timerSound.stop();
    whooshSound.play();
    musicSound.fade(1, 0, 1000);
    const black = app.getSprite('back_black');
    const field = app.getSprite('field');
    const btnDownload = app.getSprite('btnDownload');
    const logo = app.getSprite('logo2');
    const logoText = app.getSprite('logoText');
    field.locked = true;
    gsap.from([black, btnDownload, logo, logoText], {alpha: 0, duration: .5});
    gsap.to(btnDownload.scale, {x: 1.8, y: 1.8, duration: 1, yoyo: true, repeat: -1})
    containerPackshot.addChild(black, btnDownload, logo, logoText);
    btnDownload.onClick(() => app.toStore(PLATFORMS.is, APP_STORE, PLAY_MARKET));
    gsap.delayedCall(2, () => {
        emitter.emit = false;
    })
}

function ratioSettings() {
    containerLogo.x = -window.innerWidth / 2;
    containerLogo.y = -window.innerHeight / 2;
    const table = app.getSprite('table');
    const italian = app.getSprite('italian');
    const field = app.getSprite('field');
    const btnDownload = app.getSprite('btnDownload');
    const logo = app.getSprite('logo2');
    const logoText = app.getSprite('logoText');
    const startPlate = app.getSprite('start_plate');
    if (window.innerWidth < window.innerHeight) {
        containerStart.position.set(0);
        field.position.set(0, 330);
        table.position.set(0, 300);
        italian.position.set(50, -250);
        logo.position.set(0, -300);
        btnDownload.position.set(0, 350);
        logoText.position.set();
        startPlate.isMainStage && startPlate.position.set(100, -580);
    } else {
        containerStart.position.set(0, 80);
        field.position.set(330, 0);
        table.position.set(0, 500);
        italian.position.set(-150, -50);
        logo.position.set(380, 0);
        btnDownload.position.set(60, 0);
        logoText.position.set(-340, 0);
        startPlate.isMainStage && startPlate.position.set(-460, 200);
    }
}

function update(delta) {
    ratioSettings();

    var now = Date.now();
    emitter.update((now - elapsed) * 0.001);
    elapsed = now;
}

export var emitter = new particles.Emitter(containerEmitter, confetiConfig);
// Calculate the current time
var elapsed = Date.now();

emitter.emit = false;




