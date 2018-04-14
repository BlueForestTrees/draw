import Do from "../../const/do";
import {createFilm} from "../state/state";
import {getBBox, getTxTy, simplifyFilm} from "../../util/geo";
import _ from 'lodash';

export default {
    [Do.SET_FILM]: (state, film) => {
        state.film = film;
    },
    [Do.SET_SELECTION_ELEMENT]: (state, {film, elementId}) => {
        film.f.selection.elementId = elementId;
    },
    [Do.SET_SELECTION_BOX]: (state, {elementId, film, domRef}) => {
        const bBox = getBBox(domRef.svg, elementId);
        const txTy = getTxTy(domRef.svg, elementId);
        if (bBox && txTy) {
            film.f.selection.box = {
                ...bBox,
                ...txTy
            };
        }
    },
    [Do.ACTIVATE_FIRST_PEN]: state => {
        if (state.pens && state.pens[0]) {
            state.activePen = state.pens[0];
        } else {
            console.error("state.pens vide")
        }
    },
    [Do.CLEAR_FILM]: ({}, film) => {
        Object.assign(film.f, createFilm());
    },
    [Do.CLEAR_FILM]: ({}, film) => {
        Object.assign(film.f, createFilm());
    },
    [Do.DELETE_ELEMENT]: ({}, {ei, film}) => {
        film.f.elements.splice(
            _.findIndex(
                film.f.elements,
                {_id: ei._id}),
            1);
    },
    [Do.APPLY_SIMPLIFICATION]: ({}, film) => {
        simplifyFilm(film);
        film.f.config.simplify = false;
    },
};
