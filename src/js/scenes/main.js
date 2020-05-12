'use strict';

import Phaser from 'phaser';

import Background from '../entities/Background';
import Dude from '../entities/Dude';
import BombFactory from '../entities/BombFactory';
import StarFactory from '../entities/StarFactory';
import PlatformFactory from '../entities/PlatformFactory';

class MainScene extends Phaser.Scene {
    constructor() {
        super('main');

        this.background = new Background(this, 'sky');

        this.platforms = new PlatformFactory(this, [
            [400, 568, platform => platform.setScale(2).refreshBody()],
            [600, 400],
            [50, 250],
            [750, 220],
        ]);

        this.player = new Dude(this, 100, 450);

        this.bombs = new BombFactory(this);
        this.stars = new StarFactory(this);

        this.entities = [this.background, this.platforms, this.stars, this.player, this.bombs];

        this.totalDelta = 0;

        this.createStars = this.createStars.bind(this);
    }

    preload() {
        this.entities.forEach(entity => entity.preload());
    }

    create() {
        this.entities.forEach(entity => entity.create());

        this.platforms.addCollider(this.player);

        this.platforms.addCollider(this.stars);

        this.stars.addCollider(this.player, (player, star) => {
            star.destroy();

            this.score += 10;
            this.scoreText.setText('Score: ' + this.score);

            if (this.stars.isEmpty()) {
                const x = player.x < 400 ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

                this.bombs.new(x, 16);
            }
        });

        this.platforms.addCollider(this.bombs);

        this.player.addCollider(this.bombs, () => {
            this.physics.pause();

            this.player.entity().setTint(0xff0000);

            this.player.entity().anims.play('turn');

            this.game.gameOver();
        });

        this.score = 0;
        this.scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#FFF' });
    }

    update(time, delta) {
        this.entities.forEach(entity => entity.update(time, delta));

        this.totalDelta += delta;

        if (this.totalDelta > 3000) {
            this.totalDelta = 0;

            if (this.stars.count() < 10) {
                this.createStars();
            }
        }
    }

    createStars(num = 1) {
        for (let i = 0; i < num; i++) {
            const x = Phaser.Math.Between(0, this.game.config.width);

            this.stars.new(x, 16);
        }
    }
}

export default new MainScene();
