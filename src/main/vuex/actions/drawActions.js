import On from "../../const/on";
import {createElement, createElementInstance} from "../state/state";
import {globalToLocal} from "../../util/geo";
import _ from 'lodash';
import {navTo} from "../mutations/playerMutations";

export default {
    [On.START_DRAW]: ({commit}, {e, film, domRef}) => {
        const ctx = {
            ei: createElementInstance(createElement(), film.currentImage),
            startMoment: _.now(),
            film,
            domRef
        };
        ctx.onmousemove = drawMove.bind(null, ctx);
        ctx.onmouseup = drawUp.bind(null, ctx);

        film.elements.push(ctx.ei);

        drawMove(ctx, e);

        window.addEventListener("mousemove", ctx.onmousemove);
        window.addEventListener("mouseup", ctx.onmouseup);
    }
}

const drawMove = (ctx, e) => {
    ctx.ei.e.points.push(globalToLocal(e, ctx.domRef));
    navTo(ctx.film, ctx.film.currentImage + 1);
    if (ctx.film.currentImage > ctx.film.imageCount) {
        ctx.film.imageCount = ctx.film.currentImage;
    }
};

const drawUp = ctx => {
    window.removeEventListener("mousemove", ctx.onmousemove);
    window.removeEventListener("mouseup", ctx.onmouseup);
};