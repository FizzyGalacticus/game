'use strict';

import BaseEntity from './Base';

import { noop } from '../util/function';

class BaseCollidableEntity extends BaseEntity {
    constructor(name = 'BaseCollidable', scene) {
        super(name, scene);
    }

    addCollider(obj, cb = noop) {
        const collideObj = Array.isArray(obj) ? obj.map(o => o.phaserEntity) : obj.phaserEntity;

        this.scene.physics.add.collider(this.phaserEntity, collideObj, cb);
    }

    addOverlap(obj, cb = noop) {
        const overlapObj = Array.isArray(obj) ? obj.map(o => o.phaserEntity) : obj.phaserEntity;

        this.scene.physics.add.overlap(this.phaserEntity, overlapObj, cb);
    }
}

export default BaseCollidableEntity;
