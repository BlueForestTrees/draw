import Do from "../../const/do";
import On from "../../const/on";
import {createElement, createElementInstance} from "../state/state";
import modes from "../../const/modes";

export default {
    [On.IMPORT]: ({commit, state}, importData) => {
        if (importData && importData.length > 0) {
            importData = importData.replace(/\s+/g, ' ').trim();

            const e = createElement({
                pen: {...state.activePen, stroke: false},
                d: importData.match(/^M.+z$/) && importData,
                points: importData.match(/\[.*({"x":\d+,"y":\d+})(,.*{"x":\d+,"y":\d+})+.*]/g) && JSON.parse(importData)
            });

            if (e.d || e.points) {
                const ei = createElementInstance(e, state.activeFilm);
                commit(Do.ADD_ELEMENT_INSTANCE, {ei, film: state.activeFilm});
                commit(Do.SELECT_ELEMENT, ei);
                commit(Do.SET_MODE, modes.SELECT);
                commit(Do.SHOW_IMPORT_DIALOG, false);
            } else {
                console.log("format d'import non reconnu (ni d, ni points");
            }
        }
    }
};
