import Do from "../../const/do";
import {cloneElementInstance, createFilm} from "../state/state";
import Vue from "vue"
import {simplifyFilm} from "../../util/geo";
import _ from 'lodash';

export default {
    [Do.ACTIVATE_NEW_FILM]: state => {
        const newFilm = createFilm();
        state.films.push(newFilm);
        state.activeFilm = newFilm;
    },
    [Do.CLONE_SELECTION]: ({}, film) => {
        let clone = cloneElementInstance(film.selection.element);
        film.elements.push(clone);
        Vue.nextTick(() => film.selection.element = clone);
    },
    [Do.CLEAR_FILM]: ({}, film) => {
        Object.assign(film, createFilm());
    },
    [Do.DELETE_SELECTED_ELEMENT]: ({}, film) => {
        film.elements.splice(
            _.findIndex(
                film.elements,
                {_id: film.selection.element._id}),
            1);
    },
    [Do.APPLY_SIMPLIFICATION]: ({}, film) => {
        simplifyFilm(film, film.config);
        film.config.simplify = false;
    }
};
