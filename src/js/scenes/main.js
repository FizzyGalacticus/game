'use strict';

import Phaser from 'phaser';

import Sky from '../entities/Sky';
import PlatformGroup from '../entities/PlatformGroup';
import StarGroup from '../entities/StarGroup';
import Dude from '../entities/Dude';

import bomb from '../../assets/bomb.png';

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

        for (let i = 0; i < 1; i++) {
            this.stars.push(i * 70 + 12);
        }

        this.stars = new StarGroup(
            this,
            this.stars.map(x => [x, 0])
        );

        this.player = new Dude(this, 100, 50);

        this.entities = [this.sky, this.platforms, this.stars, this.player];

        this.collectStar = this.collectStar.bind(this);
    }

    preload() {
        this.entities.forEach(entity => entity.preload());
        this.load.image('bomb', bomb);
    }

    create() {
        this.entities.forEach(entity => entity.create());

        this.platforms.addCollider(this.player);

        this.platforms.addCollider(this.stars);

        this.stars.addCollider(this.player, this.collectStar);

        const bombs = this.physics.add.group();
        this.bombs = bombs;

        this.platforms.addCollider({ phaserEntity: bombs });

        this.player.addCollider({ phaserEntity: bombs }, () => {
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

    collectStar(player, star) {
        star.disableBody(true, true);

        this.score += 10;
        this.scoreText.setText('Score: ' + this.score);

        if (this.stars.phaserEntity.countActive(true) === 0) {
            this.stars.phaserEntity.children.iterate(child => {
                child.enableBody(true, child.x, 0, true, true);
            });

            const x = player.x < 400 ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

            const bomb = this.bombs.create(x, 16, 'bomb');
            bomb.setBounce(1);
            bomb.setCollideWorldBounds(true);
            bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
        }
    }
}

export default new MainScene();
