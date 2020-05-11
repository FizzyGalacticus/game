'use strict';

import Phaser from 'phaser';

import BaseCollidableEntity from './BaseCollidable';

import bomb from '../../assets/bomb.png';

class BombGroupEntity extends BaseCollidableEntity {
    constructor(scene, positions = []) {
        super('bomb', scene);

        this.positions = positions;

        this.createBomb = this.createBomb.bind(this);
    }

    preload() {
        this.scene.load.image('bomb', bomb);
    }

    create() {
        this.phaserEntity = this.scene.physics.add.group();

        this.positions.forEach(([x, y]) => this.createBomb(x, y));
    }

    createBomb(x, y) {
        const bomb = this.phaserEntity.create(x, y, 'bomb');

        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
    }
}

export default BombGroupEntity;
