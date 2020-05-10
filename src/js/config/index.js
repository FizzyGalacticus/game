'use strict';

import pkg from '../../../package.json';

const getEnvVar = (name, defaultValue = undefined) => process.env[name] || defaultValue;
const getEnvInt = (name, defaultValue) => parseInt(getEnvVar(name, defaultValue));

const env = getEnvVar('NODE_ENV', 'dev');

const title = getEnvVar('TITLE', 'Game');

const game = {
    title: env !== 'prod' ? `${title} - ${env}` : title,
    version: pkg.version,
    autoFocus: true,
    disableContextMenu: env === 'production',
    parent: 'game',
    width: getEnvInt('WIDTH', 800),
    height: getEnvInt('HEIGHT', 600),
};

export default {
    env,
    game,
};
