import On from "../../const/on";
import Do from "../../const/do";

export default {
    [On.PLAY]: async ({commit, state}, film) => {
        commit(Do.UNSELECT, film);
        commit(Do.PLAY, film);
    }
};
