import Do from "../../const/do";
import {createSelection} from "../state/state";
import {findIndex} from 'lodash';

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
    [Do.UNSELECT]: (state, film) => {
        Object.assign(film.f.selection, createSelection());
    },
    [Do.SET_MODE]: (state, mode) => {
        state.activeFilm.f.config.activeModeIdx = findIndex(state.modes,{name:mode});
    }
};
