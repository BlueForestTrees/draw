import Do from "../../const/do";

export default {
    [Do.TOGGLE_MENU_VISIBILITY]: (state) => {
        state.nav.menuVisible = !state.nav.menuVisible;
    },
    [Do.SET_MENU_VISIBILITY]: (state, visible) => {
        state.nav.menuVisible = !!visible;
    }
};
