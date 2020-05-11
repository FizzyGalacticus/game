'use strict';

import Phaser from 'phaser';

class GameOverScene extends Phaser.Scene {
    constructor() {
        super('gameOver');
    }

    create() {
        this.input.keyboard.on('keydown-ENTER', () => {
            this.game.startMain();
        });
    }
}

export default new GameOverScene();
