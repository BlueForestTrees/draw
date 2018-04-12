import On from "../../const/on";
import Do from "../../const/do";
import modes from "../../const/modes";
import {cloneElementInstance} from "../state/state";

export default {
    [On.DELETE_ELEMENT]: ({commit}, {ei, film}) => {
        commit(Do.DELETE_ELEMENT, {ei, film});
        commit(Do.UNSELECT_ELEMENT, film);
    },
    [On.CLONE]: ({commit}, {ei, film}) => {
        const clonedEI = cloneElementInstance(ei);
        commit(Do.ADD_ELEMENT_INSTANCE, {clonedEI, film});
        commit(Do.SELECT_ELEMENT, clonedEI);
        commit(Do.SET_MODE, modes.SELECT);
    },
}