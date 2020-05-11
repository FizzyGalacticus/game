'use strict';

import Phaser from 'phaser';

import BaseCollidableEntity from './BaseCollidable';

import star from '../../assets/star.png';

import { noop } from '../util/function';

class StarGroupEntity extends BaseCollidableEntity {
    constructor(scene, positions = []) {
        super('star', scene);

        this.positions = positions;

        this.isEmpty = this.isEmpty.bind(this);
        this.forEach = this.forEach.bind(this);
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

    isEmpty() {
        return this.phaserEntity.countActive(true) === 0;
    }

    forEach(fn = noop) {
        this.phaserEntity.children.iterate(fn);
    }
}

export default StarGroupEntity;
