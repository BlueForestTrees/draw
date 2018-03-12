import playerMutations from "./playerMutations";
import navMutations from "./navMutations";
import editMutations from "./editMutations";
import selectMutations from "./selectMutations";

export default {
    ...navMutations,
    ...playerMutations,
    ...editMutations,
    ...selectMutations
};