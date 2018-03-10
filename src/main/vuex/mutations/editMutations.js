import Do from "../../const/do";
import {cloneElementInstance, createFilm} from "../state/state";
import Vue from "vue"
import {simplifyFilm} from "../../util/geo";

export default {
    [Do.ACTIVATE_NEW_FILM]: state => {
        const newFilm = createFilm();
        state.films.push(newFilm);
        state.activeFilm = newFilm;
    },
    [Do.CLONE_SELECTION]: ({}, film) => {
        let clone = cloneElementInstance(film.config.selection);
        film.elements.push(clone);
        Vue.nextTick(() => film.config.selection = clone);
    },
    [Do.CLEAR_FILM]: ({}, film) => {
        Object.assign(film, createFilm());
    },
    [Do.DELETE_SELECTION]: ({}, film) => {
        const selectionIndex = _.findIndex(film.elements, {_id: film.config.selection._id});
        film.config.selection = null;
        film.elements.splice(selectionIndex, 1);
    },
    [Do.APPLY_SIMPLIFICATION]: ({}, film) => {
        simplifyFilm(film, film.config);
        film.config.simplify = false;
    }
};
