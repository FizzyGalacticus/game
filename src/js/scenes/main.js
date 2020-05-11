'use strict';

import Phaser from 'phaser';

import Sky from '../entities/Sky';
import PlatformGroup from '../entities/PlatformGroup';
import StarGroup from '../entities/StarGroup';
import Dude from '../entities/Dude';
import BombFactory from '../entities/BombFactory';

class MainScene extends Phaser.Scene {
    constructor() {
        super('game');

        this.gameOver = false;

        this.sky = new Sky(this);

        this.platforms = new PlatformGroup(this, [
            [400, 568, platform => platform.setScale(2).refreshBody()],
            [600, 400],
            [50, 250],
            [750, 220],
        ]);

        this.stars = [];

        for (let i = 0; i < 12; i++) {
            this.stars.push(i * 70 + 12);
        }

        this.stars = new StarGroup(
            this,
            this.stars.map(x => [x, 0])
        );

        this.player = new Dude(this, 100, 450);

        this.bombs = new BombFactory(this, [[350, 16]]);

        this.entities = [this.sky, this.platforms, this.stars, this.player, this.bombs];
    }

    preload() {
        this.entities.forEach(entity => entity.preload());
    }

    create() {
        this.entities.forEach(entity => entity.create());

        this.platforms.addCollider(this.player);

        this.platforms.addCollider(this.stars);

        this.stars.addCollider(this.player, (player, star) => {
            star.disableBody(true, true);

            this.score += 10;
            this.scoreText.setText('Score: ' + this.score);

            if (this.stars.isEmpty()) {
                this.stars.forEach(child => {
                    child.enableBody(true, child.x, 0, true, true);
                });

                const x = player.x < 400 ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

                this.bombs.createBomb(x, 16);
            }
        });

        this.platforms.addCollider(this.bombs);

        this.player.addCollider(this.bombs, () => {
            this.physics.pause();

            this.player.phaserEntity.setTint(0xff0000);

            this.player.phaserEntity.anims.play('turn');

            this.gameOver = true;
        });

        this.score = 0;
        this.scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#FFF' });
    }

    update() {
        this.entities.forEach(entity => entity.update());
    }
}

export default new MainScene();
