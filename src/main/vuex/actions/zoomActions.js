import On from "../../const/on";
import {globalToLocal, minus} from "../../util/util";

export default {
    [On.START_ZOOM]: ({commit, state}, {evt, film, domRef, pen}) => {
        const ctx = {
            evt,
            film,
            domRef,
            pen,
            moved: 0,
            state,
            downMouse: globalToLocal(evt, domRef),
        };
        ctx.onup = zoomUp.bind(null, ctx);
        ctx.onmove = zoomMove.bind(null, ctx);

        window.addEventListener("mousemove", ctx.onmove);
        window.addEventListener("mouseup", ctx.onup);
    }
}

const zoomMove = (ctx, e) => {
    ctx.moved++;
    const move = minus(globalToLocal(e, ctx.domRef), ctx.downMouse);
    ctx.film.f.panx -= move.x;
    ctx.film.f.pany -= move.y;
};

const zoomUp = (ctx, evt) => {
    if (ctx.moved < 3) {
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
    }
    window.removeEventListener("mousemove", ctx.onmove);
    window.removeEventListener("mouseup", ctx.onup);
};