import Do from "../../const/do";
import {createElementFromSvg} from "../state/state";
import {addElementInstance} from "../../util/geo";

export default {
    [Do.IMPORT]: (state, svg) => {
        addElementInstance(createElementFromSvg(svg), state.activeFilm);
        state.importDialog.visible = false;
    },
    [Do.SHOW_IMPORT_DIALOG]: (state, visible) => {
        state.importDialog.visible = visible;
    }
};
