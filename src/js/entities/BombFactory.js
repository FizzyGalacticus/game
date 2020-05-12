'use strict';

import Phaser from 'phaser';

import CollidableFactory from './CollidableFactory';

class BombFactory extends CollidableFactory {
    constructor(scene, positions = []) {
        super({ asset: 'bomb', scene, positions });
    }

    onCreate(bomb) {
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
    }
}

export default BombFactory;
