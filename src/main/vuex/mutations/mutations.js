import playerMutations from "./playerMutations";
import navMutations from "./navMutations";
import editMutations from "./editMutations";
import importDialogMutations from "./importDialogMutations";
import filmMutations from "./filmMutations";

export default {
    ...navMutations,
    ...playerMutations,
    ...editMutations,
    ...importDialogMutations,
    ...filmMutations
};