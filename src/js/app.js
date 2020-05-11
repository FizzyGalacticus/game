'use strict';

import Phaser from 'phaser';

import Game from './Game';

import config from './config';

import scenes from './scenes';

const gameConfig = {
    type: Phaser.AUTO,
    ...config.game,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
        },
    },
    scene: scenes,
};

// eslint-disable-next-line no-unused-vars
const game = new Game(gameConfig);
