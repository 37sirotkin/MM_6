import stage from '../dist/images/stage.jpg';
import devAnchor from '../dist/images/devAnchor.jpg';
import logo from '../dist/images/logo.png';
import back_black from '../dist/images/back_black.png';
import start_plate from '../dist/images/plate.png';
import arin_start_body from '../dist/images/arin/arin_start_body.png'
import arin_start_hand from '../dist/images/arin/arin_start_hand.png'
import button_letsGo from '../dist/images/button_letsGo.png';
import table from '../dist/images/table.jpg';
import fieldSprite from '../dist/images/field.png';
import devCell from '../dist/images/devCell.jpg';
import select from '../dist/images/select.png';
import coffee_machine from '../dist/images/items/coffee_machine.png';
import cup_americano from '../dist/images/items/cup_ameriacano.png';
import cup_latte from '../dist/images/items/cup_latte.png';
import cup_marshmello from '../dist/images/items/cup_marshmello.png';
import cup_coffee from '../dist/images/items/cup_coffee.png';

import guest_arin from '../dist/images/arin/arin_main.png';
import italian from '../dist/images/italian.png';

import timer_main from '../dist/images/timer_bar/main.png';
import timer_progress from '../dist/images/timer_bar/progress.png';
import hand from '../dist/images/hand.png';
import iconOrder from '../dist/images/icon_order.png';
import logo2 from '../dist/images/logo_1.png';
import logoText from '../dist/images/logoText.png';
import btnDownload from '../dist/images/download.png';

import Field from './Sprites/Field';
import {Item} from "./Sprites/Item";
import {SpawnItem} from "./Sprites/SpawnItem";
import {Guest} from "./Sprites/Guest";

export default [
    {
        name: 'stage',
        image: stage,
        objectId: 'stage',
    },
    {
        name: 'devAnchor',
        image: devAnchor,
    },
    {
        name: 'devCell',
        image: devCell
    },
    {
        name: 'logo',
        image: logo,
        objectId: 'logo',
        position: { x: 100, y: 100 },
    },
    {
        name: 'back_black',
        image: back_black,
        objectId: 'back_black',
        alpha: 0.7
    },
    {
        name: 'start_plate',
        image: start_plate,
        objectId: 'start_plate'
    },
    {
        name: 'arin_start_body',
        image: arin_start_body,
        objectId: 'arin_start_body'
    },
    {
        name: 'arin_start_hand',
        image: arin_start_hand,
        objectId: 'arin_start_hand',
        position: { x: -95, y: 86 },
        anchor: { x: .6, y: 0.9 }
    },
    {
        name: 'button_letsGo',
        image: button_letsGo,
        objectId: 'button_letsGo',
        position: { x: 0, y: 160 }
    },
    {
        name: 'table',
        image: table,
        objectId: 'table',
        position: { x: 0, y: 300 }
    },
    {
        name: 'field',
        image: fieldSprite,
        class: Field,
        objectId: 'field'
    },
    {
        name: 'select',
        image: select,
        objectId: 'select'
    },
    {
        name: 'coffee_machine',
        image: coffee_machine,
        objectId: 'coffee_machine',
        class: SpawnItem
    },
    {
        name: 'cup_americano',
        image: cup_americano
    },
    {
        name: 'cup_latte',
        image: cup_latte
    },
    {
        name: 'cup_marshmello',
        image: cup_marshmello
    },
    {
        name: 'cup_coffee',
        image: cup_coffee
    },
    {
        name: 'timer_main',
        image: timer_main
    },
    {
        name: 'timer_progress',
        image: timer_progress
    },
    {
        name: 'italian',
        image: italian,
        objectId: 'italian',
        class: Guest,
        position: { x: 50, y: -250 },
    },
    {
        name: 'hand',
        image: hand,
        objectId: 'hand'
    },
    {
        name: 'iconOrder',
        image: iconOrder
    },
    {
        name: 'logo2',
        image: logo2,
        objectId: 'logo2',
        position: { x: 0, y: -300 }
    },
    {
        name: 'logoText',
        image: logoText,
        objectId: 'logoText',
        scale: { x: .9, y: .9 }
    },
    {
        name: 'btnDownload',
        image: btnDownload,
        objectId: 'btnDownload',
        position: { x: 0, y: 350 },
        scale: { x: 2, y: 2 }
    }
];
