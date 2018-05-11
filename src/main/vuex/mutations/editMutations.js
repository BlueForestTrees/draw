import Do from "../../const/do";
import {createFilm, createSelection} from "../state/state";
import {getBBox, getTranslation, getTxTy, globalToLocal2, simplifyFilm} from "../../util/util";
import _ from 'lodash';

export default {
    [Do.SET_FILM]: (state, film) => {
        state.film = film;
    },
    [Do.SET_FILMS]: (state, films) => {
        state.films = films;
    },
    [Do.UNSELECT_ELEMENT]: (state, film) => {
        Object.assign(film.f.selection, createSelection());
    },
    [Do.SET_SELECTION_ELEMENT]: (state, {film, elementId}) => {
        state.selectionHistory.push(elementId);
        film.f.selection.elementId = elementId;
    },
    [Do.SET_SELECTION_BOX]: (state, {elementId, film, domRef}) => {
        const element = domRef.svg.getElementById(elementId);
        film.f.selection.box = {
            ...getBBox(element),
            ...getTranslation(element, domRef)
        };
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
    [Do.CUT_END]: ({}, film) => {
        film.f.imageCount = film.f.ftz;
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
