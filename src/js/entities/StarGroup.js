'use strict';

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

            cb(obj);
        });
    }

    update() {
        logger.warn(`Method 'update' not implemented in ${this.name}`);
    }
}

export default StarGroupEntity;
