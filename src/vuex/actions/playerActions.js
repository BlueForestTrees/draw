import On from "../../const/on";
import Do from "../../const/do";

export default {
    [On.PLAY]: async ({commit, state, getters}, film) => {
        commit(Do.UNSELECT_ELEMENT, film);
        commit(Do.PLAY, film);
    },
    [On.TOGGLE_PLAY]: async ({dispatch, commit, state, getters}, film) => {
        if (film.f.player.playing) {
            commit(Do.PAUSE, film);
        } else {
            dispatch(On.PLAY, film);
        }
    }
};
