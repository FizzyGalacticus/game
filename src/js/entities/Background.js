'use strict';

import Phaser from 'phaser';

import BaseEntity from './Base';

import { background } from '../util/asset';

import logger from '../util/logger';

class BackgroundEntity extends BaseEntity {
    constructor(scene, asset) {
        super(asset, scene);

        this.asset = asset;
    }

    preload() {
        this.scene.load.image(this.asset, background[this.asset]);
    }

    create() {
        const x = Phaser.Math.FloorTo(this.getGameWidth() / 2);
        const y = Phaser.Math.FloorTo(this.getGameHeight() / 2);

        this.scene.add.image(x, y, this.asset);
    }

    update() {
        logger.warn(`Method 'update' not implemented in ${this.name}`);
    }
}

export default BackgroundEntity;
