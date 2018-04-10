import Do from "../../const/do";
import {cloneElementInstance, createFilm, createFilmInstance} from "../state/state";
import Vue from "vue"
import {getBox, getTxTy, simplifyFilm} from "../../util/geo";
import _ from 'lodash';

export default {
    [Do.CLONE]: ({}, {ei, film}) => {
        let clone = cloneElementInstance(ei);
        film.f.elements.push(clone);
        Vue.nextTick(() => film.f.selection.element = clone);
    },
    [Do.SET_SELECTION_ELEMENT]: (state, {film, element}) => {
        film.f.selection.element = element;
    },
    [Do.SET_SELECTION_BOX]: (state, {element, film, domRef}) => {
        if (element) {
            film.f.selection.box = {
                ...getBox(domRef.svg, element._id),
                ...getTxTy(domRef.svg, element._id)
            };
        }
    },
    [Do.ACTIVATE_NEW_FILM]: state => {
        const newFilm = createFilmInstance();
        state.films.push(newFilm);
        state.activeFilm = newFilm;
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
    }
};
