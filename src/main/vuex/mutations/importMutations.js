import Do from "../../const/do";
import {createElement} from "../state/state";
import {instanciateToFilm} from "../../util/geo";

export default {
    [Do.IMPORT]: (state, e) => {
        instanciateToFilm(createElement(e), state.activeFilm);
    },
    [Do.SHOW_IMPORT_DIALOG]: (state, visible) => {
        state.importDialog.visible = visible;
    }
};
