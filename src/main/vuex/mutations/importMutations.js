import Do from "../../const/do";

export default {
    [Do.SHOW_IMPORT_DIALOG]: (state, visible) => {
        state.importDialog.visible = visible;
    }
};
