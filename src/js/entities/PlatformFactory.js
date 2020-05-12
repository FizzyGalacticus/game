'use strict';

import Phaser from 'phaser';

import CollidableFactory from './CollidableFactory';

class StarFactory extends CollidableFactory {
    constructor(scene, positions = []) {
        super({ asset: 'platform', groupType: 'staticGroup', scene, positions });
    }

    onCreate(star) {
        star.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    }
}

export default StarFactory;
