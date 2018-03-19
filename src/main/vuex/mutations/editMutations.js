import Do from "../../const/do";
import {cloneElementInstance, createFilm, createFilmInstance, createPen} from "../state/state";
import Vue from "vue"
import {simplifyFilm} from "../../util/geo";
import _ from 'lodash';

export default {
    [Do.ACTIVATE_NEW_FILM]: state => {
        const newFilm = createFilmInstance();
        state.films.push(newFilm);
        state.activeFilm = newFilm;
    },
    [Do.ACTIVATE_FIRST_PEN]: state => {
        state.pens.push(createPen("basic"));
        state.pens.push(createPen("basic2"));
        state.activePen = state.pens[0];
    },
    [Do.CLONE_SELECTION]: ({}, film) => {
        let clone = cloneElementInstance(film.f.selection.element);
        film.f.elements.push(clone);
        Vue.nextTick(() => film.f.selection.element = clone);
    },
    [Do.CLEAR_FILM]: ({}, film) => {
        Object.assign(film.f, createFilm());
    },
    [Do.DELETE_SELECTED_ELEMENT]: ({}, film) => {
        film.f.elements.splice(
            _.findIndex(
                film.f.elements,
                {_id: film.f.selection.element._id}),
            1);
    },
    [Do.APPLY_SIMPLIFICATION]: ({}, film) => {
        simplifyFilm(film);
        film.f.config.simplify = false;
    }
};
