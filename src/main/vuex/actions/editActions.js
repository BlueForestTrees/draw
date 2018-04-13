import On from "../../const/on";
import Do from "../../const/do";
import modes from "../../const/modes";
import {cloneElementInstance, createElement, createElementInstance} from "../state/state";

export default {
    [On.IMPORT]: ({commit, state, getters}, importData) => {
        if (importData && importData.length > 0) {
            importData = importData.replace(/\s+/g, ' ').trim();

            const e = createElement({
                pen: {...state.activePen, stroke: false, mask: getters.activeMaskId},
                d: (importData.match(/^M.+Z$/) && importData) || (importData.match(/ d="/) && extractD(importData)),
                points: importData.match(/\[.*({"x":\d+,"y":\d+})(,.*{"x":\d+,"y":\d+})+.*]/g) && JSON.parse(importData)
            });

            if (e.d || e.points) {
                const ei = createElementInstance(e, state.activeFilm);
                commit(Do.ADD_ELEMENT_INSTANCE, {ei, film: state.activeFilm});
                commit(Do.SELECT_ELEMENT, ei);
                commit(Do.SET_MODE, modes.SELECT);
            } else {
                console.log("format d'import non reconnu (ni d, ni points");
            }
        }
    },
    [On.CLONE]: ({commit}, {ei, film}) => {
        const clonedEI = cloneElementInstance(ei);
        commit(Do.ADD_ELEMENT_INSTANCE, {clonedEI, film});
        commit(Do.SELECT_ELEMENT, clonedEI);
        commit(Do.SET_MODE, modes.SELECT);
    },
    [On.DELETE_ELEMENT]: ({commit}, {ei, film}) => {
        commit(Do.DELETE_ELEMENT, {ei, film});
        commit(Do.UNSELECT_ELEMENT, film);
    },
}

const extractD = importData => {
    const ds = [];
    const regex = / d="(.+?)"/g;
    let f;
    while ((f = regex.exec(importData)) !== null) {
        ds.push(f[1]);
    }
    return ds.join(" ");
};