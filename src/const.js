import cup_americano from '../dist/images/items/cup_ameriacano.png';
import {app} from "./index";

export const log = console.log;

export const APP_STORE = 'https://apps.apple.com/th/app/merge-mystery-lost-island/id1572829821';
export const PLAY_MARKET = 'https://play.google.com/store/apps/details?id=com.fwaygames.lostmerge&hl=ru&gl=US';
export const PLATFORM = '';

export const PLATFORMS = {
    fb: 'facebook',
    is: 'ironsource',
    al: 'applovin',
    un: 'unity',
    tt: 'tiktok',
    vg: 'vungle',
    mt: 'mintegral'
}

export let sprites = [];
export let fieldItems = [];

export const itemsConfig = {
    americano: {
        name: 'cup_americano',
        type: 'americano',
        parentType: 'latte',
    },
    latte: {
        name: 'cup_latte',
        type: 'latte',
        parentType: 'marshmello',
    },
    marshmello: {
        name: 'cup_marshmello',
        type: 'marshmello',
        parentType: 'coffee',
    },
    coffee: {
        name: 'cup_coffee',
        type: 'coffee',
        parentType: null,
    }
}

