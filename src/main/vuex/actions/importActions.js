import Do from "../../const/do";

export default {
    [Do.IMPORT]: ({commit, state}, importData) => {
        if (importData && importData.length > 0) {
            importData = importData.replace(/\s+/g, ' ').trim();

            const e = {pen: {...state.activePen, stroke: false}};
            if (importData.match(/^M.+z$/)) {
                e.d = importData;
                commit(Do.IMPORT, e);
                commit(Do.SHOW_IMPORT_DIALOG, false);
            } else if (importData.match(/\[.*({"x":\d+,"y":\d+})(,.*{"x":\d+,"y":\d+})+.*]/g)) {
                e.points = JSON.parse(importData);
                commit(Do.IMPORT, e);
                commit(Do.SHOW_IMPORT_DIALOG, false);
            } else {
                console.log("format d'import non reconnu (ni d, ni points");
            }
        }
    }
};
