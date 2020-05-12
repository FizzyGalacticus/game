'use strict';

import logger from '../util/logger';

class BaseEntity {
    constructor(name = 'Base', scene = null) {
        this.name = name + 'Entity';
        this.scene = scene;

        this.preload = this.preload.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);

        this.phaserEntity;

        this.getGameConfig = this.getGameConfig.bind(this);
        this.getGameWidth = this.getGameWidth.bind(this);
        this.getGameHeight = this.getGameHeight.bind(this);
        this.entity = this.entity.bind(this);
    }

    getGameConfig() {
        return this.scene.game.config;
    }

    getGameWidth() {
        return this.getGameConfig().width;
    }

    getGameHeight() {
        return this.getGameConfig().height;
    }

    entity() {
        return this.phaserEntity;
    }

    preload() {
        logger.warn(`Method 'preload' not implemented in ${this.name}`);
    }

    create() {
        logger.warn(`Method 'create' not implemented in ${this.name}`);
    }

    update() {
        logger.warn(`Method 'update' not implemented in ${this.name}`);
    }
}

export default BaseEntity;
