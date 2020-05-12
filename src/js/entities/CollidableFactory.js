'use strict';

import BaseCollidableEntity from './BaseCollidable';

import { noop } from '../util/function';

import bomb from '../../assets/bomb.png';
import star from '../../assets/star.png';

const collidables = { bomb, star };

class CollidableFactory extends BaseCollidableEntity {
    constructor(asset, scene, positions = []) {
        super(asset, scene);

        if (!asset in collidables) {
            throw new Error(`'${asset}' not a valid collidable`);
        }

        this.asset = asset;

        this.positions = positions;

        this.preload = this.preload.bind(this);
        this.create = this.create.bind(this);
        this.count = this.count.bind(this);
        this.isEmpty = this.isEmpty.bind(this);
        this.onCreate = this.onCreate.bind(this);
        this.new = this.new.bind(this);
        this.forEach = this.forEach.bind(this);
    }

    preload() {
        if (!CollidableFactory.loaded) {
            this.scene.load.image('bomb', bomb);
            this.scene.load.image('star', star);

            CollidableFactory.loaded = true;
        }
    }

    create() {
        this.phaserEntity = this.scene.physics.add.group();

        this.positions.forEach(([x, y]) => this.new(x, y));
    }

    count() {
        return this.phaserEntity.countActive(true);
    }

    isEmpty() {
        return this.count() === 0;
    }

    onCreate() {
        // NOOP
    }

    new(x, y, cb = noop) {
        const collidable = this.phaserEntity.create(x, y, this.asset);

        this.onCreate(collidable);
        cb(collidable);
    }

    forEach(fn = noop) {
        this.phaserEntity.children.iterate(fn);
    }
}

CollidableFactory.loaded = false;

export default CollidableFactory;
