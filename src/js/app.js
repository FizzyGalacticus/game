'use strict';

import Phaser from 'phaser';

import mainScene from './scenes/main.js';

const config = {
    type: Phaser.AUTO,
    parent: 'game',
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
        },
    },
    scene: mainScene,
};

// eslint-disable-next-line no-unused-vars
const game = new Phaser.Game(config);
