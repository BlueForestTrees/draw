import appActions from "./appActions";
import surfaceActions from "./editActions";
import playerActions from "./playerActions";
import drawActions from "./drawActions";
import selectActions from "./selectActions";
import importActions from "./importActions";

export default {
    ...appActions,
    ...surfaceActions,
    ...playerActions,
    ...drawActions,
    ...selectActions,
    ...importActions
}