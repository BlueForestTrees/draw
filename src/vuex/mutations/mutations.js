import playerMutations from "./playerMutations";
import navMutations from "./navMutations";
import editMutations from "./editMutations";
import maskMutations from "./maskMutations";
import zoomMutations from "./zoomMutations";
import selectMutations from "./selectMutations";
import userMutation from "./userMutation"
import dialogMutations from "./dialogMutations"
import snackbarMutations from "./snackbarMutations"

export default {
    ...snackbarMutations,
    ...dialogMutations,
    ...userMutation,
    ...navMutations,
    ...playerMutations,
    ...editMutations,
    ...maskMutations,
    ...zoomMutations,
    ...selectMutations
};