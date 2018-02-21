import _ from 'lodash'

export const debug = (...obj) => {
    console.log(JSON.stringify(obj, null, 4));
};

export const xor = (left, right) => !!(!!left ^ !!right);

export const endChrono = chrono => {
    chrono.end = _.now();
    chrono.duration = chrono.end - chrono.start;
};