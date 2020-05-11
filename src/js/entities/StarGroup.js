'use strict';

import Phaser from 'phaser';

import BaseCollidableEntity from './BaseCollidable';

import star from '../../assets/star.png';

import logger from '../util/logger';
import { noop } from '../util/function';

class StarGroupEntity extends BaseCollidableEntity {
    constructor(scene, positions = []) {
        super('star', scene);

        this.positions = positions;
    }

    preload() {
        this.scene.load.image('star', star);
    }

    create() {
        this.phaserEntity = this.scene.physics.add.group();

        this.positions.forEach(([x, y, cb = noop]) => {
            const obj = this.phaserEntity.create(x, y, 'star');

            obj.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

            cb(obj);
        });
    }

    update() {
        logger.warn(`Method 'update' not implemented in ${this.name}`);
    }
}

export default StarGroupEntity;
