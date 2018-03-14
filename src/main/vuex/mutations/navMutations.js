import Do from "../../const/do";
import {createSelection} from "../state/state";

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
    [Do.UNSELECT]: (state, film) => {
        Object.assign(film.f.selection, createSelection());
    }
};
