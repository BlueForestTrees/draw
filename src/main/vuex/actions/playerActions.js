import On from "../../const/on";
import Do from "../../const/do";

export default {
    [On.PLAY]: async ({commit, state, getters}, film) => {
        commit(Do.UNSELECT_ELEMENT, film);
        commit(Do.PLAY, film);
    }
};
