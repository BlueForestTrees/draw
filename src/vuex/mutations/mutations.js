import playerMutations from "./playerMutations";
import navMutations from "./navMutations";
import editMutations from "./editMutations";
import maskMutations from "./maskMutations";
import zoomMutations from "./zoomMutations";
import selectMutations from "./selectMutations";

export default {
    ...navMutations,
    ...playerMutations,
    ...editMutations,
    ...maskMutations,
    ...zoomMutations,
    ...selectMutations
};