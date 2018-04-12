import playerMutations from "./playerMutations";
import navMutations from "./navMutations";
import editMutations from "./editMutations";
import importMutations from "./importMutations";
import maskMutations from "./maskMutations";

export default {
    ...navMutations,
    ...playerMutations,
    ...editMutations,
    ...importMutations,
    ...maskMutations
};