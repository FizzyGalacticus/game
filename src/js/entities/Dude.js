'use strict';

import BaseCollidableEntity from './BaseCollidable';

import { players } from '../util/asset';

const { dude } = players;

class DudeEntity extends BaseCollidableEntity {
    constructor(scene, x, y) {
        super('Dude', scene);

        this.x = x;
        this.y = y;
    }

    preload() {
        this.scene.load.spritesheet('dude', dude, { frameWidth: 32, frameHeight: 48 });
    }

    create() {
        this.phaserEntity = this.scene.physics.add.sprite(this.x, this.y, 'dude');

        this.phaserEntity.setBounce(0.2);
        this.phaserEntity.setCollideWorldBounds(true);

        this.scene.anims.create({
            key: 'left',
            frames: this.scene.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1,
        });

        this.scene.anims.create({
            key: 'turn',
            frames: [{ key: 'dude', frame: 4 }],
            frameRate: 20,
        });

        this.scene.anims.create({
            key: 'right',
            frames: this.scene.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1,
        });
    }

    update() {
        const cursors = this.scene.input.keyboard.createCursorKeys();

        if (cursors.left.isDown) {
            this.phaserEntity.setVelocityX(-160);

            this.phaserEntity.anims.play('left', true);
        } else if (cursors.right.isDown) {
            this.phaserEntity.setVelocityX(160);

            this.phaserEntity.anims.play('right', true);
        } else {
            this.phaserEntity.setVelocityX(0);

            this.phaserEntity.anims.play('turn');
        }

        if (cursors.up.isDown && this.phaserEntity.body.touching.down) {
            this.phaserEntity.setVelocityY(-330);
        }
    }
}

export default DudeEntity;
