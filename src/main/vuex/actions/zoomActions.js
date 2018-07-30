import On from "../../const/on";
import {globalToLocal, minus} from "../../util/util";

export default {
    [On.START_ZOOM]: ({commit, state}, {evt, film, domRef, pen, touch}) => {
        const ctx = {
            evt,
            film,
            domRef,
            pen,
            moved: 0,
            state,
            initialMouse: globalToLocal(evt, domRef),
            touch
        };
        ctx.onup = zoomUp.bind(null, ctx);
        ctx.onpanup = zoomPanUp.bind(null, ctx);
        ctx.onmove = zoomMove.bind(null, ctx);

        start(ctx);
    }
}

const zoomMove = (ctx, e) => {
    const move = minus(globalToLocal(e, ctx.domRef), ctx.initialMouse);
    ctx.film.f.panx -= move.x;
    ctx.film.f.pany -= move.y;
};

const zoomPanUp = (ctx) => {
    stop(ctx);
};
const zoomUp = (ctx, evt) => {
    if (ctx.state.nav.zoomSide) {
        if (evt.altKey) {
            ctx.film.f.zoom /= 1.15;
        } else {
            ctx.film.f.zoom *= 1.15;
        }
    } else {
        if (evt.altKey) {
            ctx.film.f.zoom *= 1.15;
        } else {
            ctx.film.f.zoom /= 1.15;
        }
    }
    stop(ctx);
};

const start = ctx => {
    ctx.touch.on("panmove", ctx.onmove);
    ctx.touch.on("panend", ctx.onpanup);
    window.addEventListener("mouseup", ctx.onup);
};
const stop = ctx => {
    ctx.touch.off("panmove", ctx.onmove);
    ctx.touch.off("panend", ctx.onpanup);
    window.removeEventListener("mouseup", ctx.onup);
};