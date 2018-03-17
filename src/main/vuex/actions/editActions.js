import On from "../../const/on";
import Do from "../../const/do";

export default {
    [On.DELETE_SELECTED_ELEMENT]: ({commit}, film) => {
        commit(Do.DELETE_SELECTED_ELEMENT, film);
        commit(Do.UNSELECT, film);
    }
}