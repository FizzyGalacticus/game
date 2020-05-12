'use strict';

import BaseCollidableEntity from './BaseCollidable';

import { noop } from '../util/function';

import { collidable } from '../util/asset';

class CollidableFactory extends BaseCollidableEntity {
    constructor({ asset, groupType = 'group', scene, positions = [] } = {}) {
        super(asset, scene);

        if (!asset in collidable) {
            throw new Error(`'${asset}' not a valid collidable`);
        }

        if (!['group', 'staticGroup'].includes(groupType)) {
            throw new Error(`'${groupType}' not a valid group type`);
        }

        this.asset = asset;
        this.groupType = groupType;

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
            Object.entries(collidable).forEach(([key, src]) => this.scene.load.image(key, src));

            CollidableFactory.loaded = true;
        }
    }

    create() {
        this.phaserEntity = this.scene.physics.add[this.groupType]();

        this.positions.forEach(([x, y, cb]) => this.new(x, y, cb));
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
