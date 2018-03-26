import playerMutations from "./playerMutations";
import navMutations from "./navMutations";
import editMutations from "./editMutations";
import selectMutations from "./selectMutations";
import importDialogMutations from "./importDialogMutations";
import filmMutations from "./filmMutations";

export default {
    ...navMutations,
    ...playerMutations,
    ...editMutations,
    ...selectMutations,
    ...importDialogMutations,
    ...filmMutations
};