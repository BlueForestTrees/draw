import Do from "../../const/do";
import {createSelection} from "../state/state";
import {findIndex} from 'lodash';
import Vue from 'vue';

export default {
    [Do.TOGGLE_MENU_VISIBILITY]: (state) => {
        state.nav.menuVisible = !state.nav.menuVisible;
    },
    [Do.SET_MENU_VISIBILITY]: (state, visible) => {
        state.nav.menuVisible = !!visible;
    },
    [Do.SELECT_FILM]: (state, film) => {
        state.activeFilm = film;
    },
    [Do.SELECT_PEN]: (state, pen) => {
        state.activePen = pen;
    },
    [Do.SELECT_ELEMENT]: (state, ei) => {
        Vue.nextTick(() => state.activeFilm.f.selection.elementId = ei._id);
    },
    [Do.UNSELECT_ELEMENT]: (state, film) => {
        Object.assign(film.f.selection, createSelection());
    },
    [Do.SET_MODE]: (state, mode) => {
        state.activeFilm.f.config.activeModeIdx = findIndex(state.panels, {name: mode});
    }
};
