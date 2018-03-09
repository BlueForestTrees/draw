import playerMutations from "./playerMutations";
import navMutations from "./navMutations";
import editMutations from "./editMutations";

export default {
    ...navMutations,
    ...playerMutations,
    ...editMutations
};