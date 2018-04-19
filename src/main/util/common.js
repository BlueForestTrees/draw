import {find,now} from 'lodash';

export const debug = (...obj) => console.log(JSON.stringify(obj, null, 4));

export const xor = (left, right) => !!(!!left ^ !!right);

export const formatShort = v => Math.floor(v * 10) / 10;

export const reduced = objID => objID.toString().substr(19, 5);

export const getElement = (film, _id) => find(film.f.elements, {_id});