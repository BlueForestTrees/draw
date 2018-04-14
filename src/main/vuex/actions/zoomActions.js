import On from "../../const/on";
import Do from "../../const/do";

export default {
    [On.START_ZOOM]: ({commit, state}, {evt, film, domRef, pen}) => {

        if (evt.altKey) {
            commit(Do.ZOOM_OUT, film);
        } else {
            commit(Do.ZOOM_IN, film);
        }
    }
}