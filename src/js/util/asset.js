'use strict';

// Collidable
import bomb from '../../assets/collidable/bomb.png';
import dude from '../../assets/collidable/dude.png';
import platform from '../../assets/collidable/platform.png';
import star from '../../assets/collidable/star.png';

import sky from '../../assets/sky.png';

export const collidable = { bomb, /* dude, */ platform, star };

export const players = { dude };

export const background = { sky };

export default {
    collidable,
    background,
    players,
};
