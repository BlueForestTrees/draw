import surfaceActions from "./editActions";
import playerActions from "./playerActions";
import drawActions from "./drawActions";
import selectActions from "./selectActions";
import maskActions from "./maskActions";
import zoomActions from "./zoomActions";
import appActions from "./appActions";
import cameraActions from "./cameraActions";
import userActions from "./userActions"
import snackbarActions from "./snackbarActions"

export default {
    ...snackbarActions,
    ...userActions,
    ...appActions,
    ...surfaceActions,
    ...playerActions,
    ...drawActions,
    ...selectActions,
    ...maskActions,
    ...zoomActions,
    ...cameraActions
}
