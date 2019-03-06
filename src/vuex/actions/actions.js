import surfaceActions from "./editActions";
import playerActions from "./playerActions";
import drawActions from "./drawActions";
import selectActions from "./selectActions";
import maskActions from "./maskActions";
import zoomActions from "./zoomActions";
import appActions from "./appActions";
import cameraActions from "./cameraActions";

export default {
    ...appActions,
    ...surfaceActions,
    ...playerActions,
    ...drawActions,
    ...selectActions,
    ...maskActions,
    ...zoomActions,
    ...cameraActions
}
