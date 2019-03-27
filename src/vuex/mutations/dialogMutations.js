import Do from "../../const/do"
import {createDialog} from "../state/dialogState"


const updateDialogVisibility = (state, {dialog, visible}) => {
    if (state.dialogs[dialog]) {
        state.dialogs[dialog].visible = visible
    } else {
        console.error(`dialog ${dialog} not found`)
    }
}
const updateDialog = (state, {dialog, data}) => {
    if (state.dialogs[dialog]) {
        state.dialogs[dialog].data = data
    } else {
        console.error(`state not found : state.dialogs['${dialog}']`)
    }
}
const cleanDialog = (state, dialog) => {
    updateDialog(state, {dialog, data: createDialog(dialog).data})
}

export default {
    [Do.SHOW_DIALOG]: (state, {dialog, data}) => {
        if (!data) {
            cleanDialog(state, dialog)
        } else {
            updateDialog(state, {dialog, data})
        }

        updateDialogVisibility(state, {dialog, visible: true})
    },
    [Do.UPDATE_DIALOG_DATA]: (state, {dialog, data}) => {
        updateDialog(state, {dialog, data})
    },
    [Do.UPDATE_DIALOG_VISIBILITY]: (state, {dialog, visible}) => {
        updateDialogVisibility(state, {dialog, visible})
    },
    [Do.CLEAR_DIALOG_DATA]: (state, dialog) => {
        cleanDialog(state, dialog)
    },
}