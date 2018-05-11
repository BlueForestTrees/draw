import On from "../../const/on";
import {globalToLocal} from "../../util/util";

export default {
    [On.START_CAMERA]: ({commit, getters, state}, {evt, film, domRef, pen}) => {
        const ctx = {commit, film, domRef, mouseDown: globalToLocal(evt, domRef)};

        ctx.onmousemove = cameraMove.bind(null, ctx);
        ctx.onmouseup = cameraUp.bind(null, ctx);

        cameraMove(ctx, evt);

        window.addEventListener("mousemove", ctx.onmousemove);
        window.addEventListener("mouseup", ctx.onmouseup);
    }
}

const cameraMove = ({commit, film, domRef, mouseDown}, evt) => {
    const mouseMove = globalToLocal(evt, domRef);
    film.camera.x = Math.round(Math.min(mouseDown.x, mouseMove.x));
    film.camera.y = Math.round(Math.min(mouseDown.y, mouseMove.y));
    film.camera.w = Math.round(Math.abs(mouseDown.x - mouseMove.x));
    film.camera.h = Math.round(Math.abs(mouseDown.y - mouseMove.y));
};

const cameraUp = ctx => {
    window.removeEventListener("mousemove", ctx.onmousemove);
    window.removeEventListener("mouseup", ctx.onmouseup);
};