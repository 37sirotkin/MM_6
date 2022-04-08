import { Howl } from 'howler';
import music from '../dist/sounds/music.mp3';
import click from '../dist/sounds/click.mp3';
import merge from '../dist/sounds/merge.mp3';
import whoosh from '../dist/sounds/whoosh.mp3';
import timer from '../dist/sounds/timer.mp3';

export const musicSound = new Howl({
    src: music,
    loop: true,
    volume: .6
})

export const clickSound = new Howl({
    src: click,
})

export const mergeSound = new Howl({
    src: merge,
})

export const whooshSound = new Howl({
    src: whoosh,
})

export const timerSound = new Howl({
    src: timer,
    loop: true,
    volume: .07
})
