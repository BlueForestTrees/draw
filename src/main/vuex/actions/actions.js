import appActions from "./appActions";
import surfaceActions from "./editActions";
import playerActions from "./playerActions";
import drawActions from "./drawActions";
import selectActions from "./selectActions";
import importActions from "./importActions";
import maskActions from "./maskActions";

export default {
    ...appActions,
    ...surfaceActions,
    ...playerActions,
    ...drawActions,
    ...selectActions,
    ...importActions,
    ...maskActions
}