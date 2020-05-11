'use strict';

import BaseCollidableEntity from './BaseCollidable';

import platform from '../../assets/platform.png';

import logger from '../util/logger';
import { noop } from '../util/function';

class PlatformGroupEntity extends BaseCollidableEntity {
    constructor(scene, positions = []) {
        super('platform', scene);

        this.positions = positions;
    }

    preload() {
        this.scene.load.image('platform', platform);
    }

    create() {
        this.phaserEntity = this.scene.physics.add.staticGroup();

        this.positions.forEach(([x, y, cb = noop]) => {
            const obj = this.phaserEntity.create(x, y, 'platform');

            cb(obj);
        });
    }

    update() {
        logger.warn(`Method 'update' not implemented in ${this.name}`);
    }
}

export default PlatformGroupEntity;
