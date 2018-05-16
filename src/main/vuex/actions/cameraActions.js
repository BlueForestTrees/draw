import On from "../../const/on";
import {globalToLocal} from "../../util/util";

export default {
    [On.START_CAMERA]: ({commit, getters, state}, {evt, film, domRef, pen}) => {
        const ctx = {commit, film, domRef, mouseDown: globalToLocal(evt, domRef)};

        ctx.onmove = cameraMove.bind(null, ctx);
        ctx.onup = cameraUp.bind(null, ctx);

        cameraMove(ctx, evt);

        window.addEventListener("mousemove", ctx.onmove);
        window.addEventListener("mouseup", ctx.onup);
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
    window.removeEventListener("mousemove", ctx.onmove);
    window.removeEventListener("mouseup", ctx.onup);
};