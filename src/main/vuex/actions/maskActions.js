import On from "../../const/on";
import Do from "../../const/do";
import modes from "../../const/modes";
import {cloneElementInstance} from "../state/state";

export default {
    [On.MASK_CONVERT]: ({commit, state}, {ei, film}) => {
        commit(Do.DELETE_ELEMENT, {ei, film});
        commit(Do.ADD_MASK_TO_FILM, {ei, film});
        commit(Do.UNSELECT_ELEMENT, film);
    }
}