import On from "../../const/on";
import Do from "../../const/do";
import modes from "../../const/modes";

export default {
    [On.DELETE_ELEMENT]: ({commit}, {ei,film}) => {
        commit(Do.DELETE_ELEMENT, {ei,film});
        commit(Do.UNSELECT, film);
    },
    [On.CLONE]: ({commit}, {ei, film}) => {
        commit(Do.CLONE, {ei, film});
        commit(Do.SET_MODE, modes.SELECT)
    }
}