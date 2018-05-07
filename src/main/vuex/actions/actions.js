import surfaceActions from "./editActions";
import playerActions from "./playerActions";
import drawActions from "./drawActions";
import selectActions from "./selectActions";
import maskActions from "./maskActions";
import On from "../../const/on";
import Do from "../../const/do";
import zoomActions from "./zoomActions";
import test from "../../const/test";
import appActions from "./appActions";

export default {
    ...appActions,
    ...surfaceActions,
    ...playerActions,
    ...drawActions,
    ...selectActions,
    ...maskActions,
    ...zoomActions
}
