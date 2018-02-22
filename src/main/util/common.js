import _ from 'lodash'

export const debug = (...obj) => {
    console.log(JSON.stringify(obj, null, 4));
};

export const xor = (left, right) => !!(!!left ^ !!right);

export const endChrono = (chrono) => {
    chrono.drawEnd = _.now();
    chrono.duration = chrono.drawEnd - chrono.start;
    return chrono.duration;
};

export const formatShort = v => Math.floor(v * 10) / 10;