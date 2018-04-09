import Do from "../../const/do";
import {createElementFromExternal} from "../state/state";
import {addElementInstance} from "../../util/geo";

export default {
    [Do.IMPORT]: (state, svg) => {
        addElementInstance(createElementFromExternal(svg), state.activeFilm);
        state.importDialog.visible = false;
    },
    [Do.SHOW_IMPORT_DIALOG]: (state, visible) => {
        state.importDialog.visible = visible;
    }
};
