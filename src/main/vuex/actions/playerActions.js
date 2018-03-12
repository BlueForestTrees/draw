import On from "../../const/on";
import Do from "../../const/do";

export default {
    [On.PLAY]: async ({commit, state, getters}, film) => {
        commit(Do.UNSELECT, film);
        commit(Do.PLAY, {film, imageCount: getters.imageCount(film)});
    }
};
