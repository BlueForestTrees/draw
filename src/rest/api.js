import {del, get, post} from './rest'

export const getFilms = () => get('api/film/all');
export const getFilm = _id => get(`api/film/_id/${_id}`);
export const deleteFilm = _id => del(`api/film/${_id}`);
export const saveFilm = film => post('api/film', {film});