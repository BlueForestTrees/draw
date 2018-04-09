import Do from "../../const/do";
import {createElement} from "../state/state";
import {addToFilm} from "../../util/geo";

export default {
    [Do.IMPORT]: (state, pastedData) => {
        if (pastedData && pastedData.length > 0) {
            const eDef = {pen: state.activePen};

            pastedData = pastedData.replace(/\s+/g, ' ').trim();

            if (pastedData.startsWith("M")) {
                eDef.d = pastedData;
            } else if (pastedData.match(/^.*svg.*$/)) {
                eDef.svg = pastedData;
            } else if (pastedData.match(/\[.*({"x":\d+,"y":\d+})(,.*{"x":\d+,"y":\d+})+.*]/g)) {
                eDef.points = JSON.parse(pastedData);
            } else {
                console.log("format d'import non reconnu (ni d, ni svg, ni points");
            }

            addToFilm(createElement(eDef), state.activeFilm);

            state.importDialog.visible = false;
        }
    },
    [Do.SHOW_IMPORT_DIALOG]: (state, visible) => {
        state.importDialog.visible = visible;
    }
};
