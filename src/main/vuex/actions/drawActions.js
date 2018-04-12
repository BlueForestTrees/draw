import On from "../../const/on";
import {createElement} from "../state/state";
import {globalToLocal, instanciateToFilm} from "../../util/geo";
import _ from 'lodash';
import {navTo} from "../mutations/playerMutations";

export default {
    [On.START_DRAW]: ({commit, getters}, {evt, film, domRef, pen}) => {
        const ctx = {
            e: createElement({pen, points: [], anim: true, mask: pen.mask}),
            startMoment: _.now(),
            film,
            domRef
        };
        instanciateToFilm(ctx.e, film);
        ctx.onmousemove = drawMove.bind(null, ctx);
        ctx.onmouseup = drawUp.bind(null, ctx);

        drawMove(ctx, evt);

        window.addEventListener("mousemove", ctx.onmousemove);
        window.addEventListener("mouseup", ctx.onmouseup);
    }
}

const drawMove = (ctx, evt) => {
    const newImage = ctx.film.f.ftz + 1;
    ctx.e.points.push(globalToLocal(evt, ctx.domRef));
    ctx.film.f.imageCount = Math.max(ctx.film.f.imageCount, newImage);
    navTo(ctx.film, newImage);
};

const drawUp = ctx => {
    window.removeEventListener("mousemove", ctx.onmousemove);
    window.removeEventListener("mouseup", ctx.onmouseup);
};