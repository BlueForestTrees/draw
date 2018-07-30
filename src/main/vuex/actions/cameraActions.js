import On from "../../const/on";
import {globalToLocal} from "../../util/util";

export default {
    [On.START_CAMERA]: ({commit, getters, state}, {evt, film, domRef, pen, touch}) => {
        const ctx = {commit, film, domRef, mouseDown: globalToLocal(evt, domRef), touch};

        ctx.onmove = cameraMove.bind(null, ctx);
        ctx.onup = cameraUp.bind(null, ctx);

        cameraMove(ctx, evt);

        touch.on("panmove", ctx.onmove);
        touch.on("panend", ctx.onup);
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
    ctx.touch.off("panmove", ctx.onmove);
    ctx.touch.off("panend", ctx.onpanup);
};