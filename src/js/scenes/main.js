'use strict';

import Phaser from 'phaser';

import Sky from '../entities/Sky';
import PlatformGroup from '../entities/PlatformGroup';

import star from '../../assets/star.png';
import bomb from '../../assets/bomb.png';
import dude from '../../assets/dude.png';

class MainScene extends Phaser.Scene {
    constructor() {
        super('game');

        this.sky = new Sky(this);

        this.platforms = new PlatformGroup(this, [
            [400, 568, platform => platform.setScale(2).refreshBody()],
            [600, 400],
            [50, 250],
            [750, 220],
        ]);

        this.entities = [this.sky, this.platforms];

        this.collectStar = this.collectStar.bind(this);
        this.hitBomb = this.hitBomb.bind(this);
    }

    preload() {
        this.entities.forEach(entity => entity.preload());
        this.load.image('star', star);
        this.load.image('bomb', bomb);
        this.load.spritesheet('dude', dude, { frameWidth: 32, frameHeight: 48 });
    }

    create() {
        this.entities.forEach(entity => entity.create());
        this.gameOver = false;

        this.player = this.physics.add.sprite(100, 450, 'dude');
        const player = this.player;

        player.setBounce(0.2);
        player.setCollideWorldBounds(true);

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1,
        });

        this.anims.create({
            key: 'turn',
            frames: [{ key: 'dude', frame: 4 }],
            frameRate: 20,
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1,
        });

        this.platforms.addCollider({ phaserEntity: player });

        const stars = this.physics.add.group({
            key: 'star',
            repeat: 11,
            setXY: { x: 12, y: 0, stepX: 70 },
        });

        this.stars = stars;

        stars.children.iterate(function (child) {
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        });

        this.platforms.addCollider({ phaserEntity: stars });

        this.physics.add.overlap(player, stars, this.collectStar, null, this);

        const bombs = this.physics.add.group();
        this.bombs = bombs;

        this.platforms.addCollider({ phaserEntity: bombs });

        this.physics.add.collider(player, bombs, this.hitBomb, null, this);

        this.score = 0;
        this.scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#FFF' });
    }

    update() {
        this.entities.forEach(entity => entity.update());
        const cursors = this.input.keyboard.createCursorKeys();
        const player = this.player;

        if (cursors.left.isDown) {
            player.setVelocityX(-160);

            player.anims.play('left', true);
        } else if (cursors.right.isDown) {
            player.setVelocityX(160);

            player.anims.play('right', true);
        } else {
            player.setVelocityX(0);

            player.anims.play('turn');
        }

        if (cursors.up.isDown && player.body.touching.down) {
            player.setVelocityY(-330);
        }
    }

    collectStar(player, star) {
        star.disableBody(true, true);

        this.score += 10;
        this.scoreText.setText('Score: ' + this.score);

        if (this.stars.countActive(true) === 0) {
            this.stars.children.iterate(child => {
                child.enableBody(true, child.x, 0, true, true);
            });

            const x = player.x < 400 ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

            const bomb = this.bombs.create(x, 16, 'bomb');
            bomb.setBounce(1);
            bomb.setCollideWorldBounds(true);
            bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
        }
    }

    hitBomb(player /* , bomb */) {
        this.physics.pause();

        player.setTint(0xff0000);

        player.anims.play('turn');

        this.gameOver = true;
    }
}

export default new MainScene();
