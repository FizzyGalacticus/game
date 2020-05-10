'use strict';

import Phaser from 'phaser';

import BaseEntity from './Base';

import sky from '../../assets/sky.png';

import logger from '../util/logger';

class SkyEntity extends BaseEntity {
    constructor(scene) {
        super('Sky', scene);
    }

    preload() {
        this.scene.load.image('sky', sky);
    }

    create() {
        const x = Phaser.Math.FloorTo(this.getGameWidth() / 2);
        const y = Phaser.Math.FloorTo(this.getGameHeight() / 2);

        this.scene.add.image(x, y, 'sky');
    }

    update() {
        logger.warn(`Method 'update' not implemented in ${this.name}`);
    }
}

export default SkyEntity;
