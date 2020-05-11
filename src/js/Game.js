'use strict';

import Phaser from 'phaser';

class Game extends Phaser.Game {
    constructor(config) {
        super(config);

        this.getCurrentScene = this.getCurrentScene.bind(this);
        this.gameOver = this.gameOver.bind(this);
    }

    getCurrentScene() {
        return Object.keys(this.scene.keys).find(scene => this.scene.isActive(scene));
    }

    startMain() {
        const currentScene = this.getCurrentScene();

        this.scene.stop(currentScene);

        this.scene.start('main');
    }

    gameOver() {
        const currentScene = this.getCurrentScene();

        this.scene.pause(currentScene);

        this.scene.start('gameOver');
    }
}

export default Game;
