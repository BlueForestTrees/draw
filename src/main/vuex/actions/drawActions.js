import On from "../../const/on";
import {createElement} from "../state/state";
import {addToFilm, globalToLocal} from "../../util/geo";
import _ from 'lodash';
import {navTo} from "../mutations/playerMutations";

export default {
    [On.START_DRAW]: ({commit}, {e, film, domRef, pen}) => {
        const ctx = {
            ei: addToFilm(createElement({pen, points: []}), film),
            startMoment: _.now(),
            film,
            domRef
        };
        ctx.onmousemove = drawMove.bind(null, ctx);
        ctx.onmouseup = drawUp.bind(null, ctx);


        drawMove(ctx, e);

        window.addEventListener("mousemove", ctx.onmousemove);
        window.addEventListener("mouseup", ctx.onmouseup);
    }
}

const drawMove = (ctx, e) => {
    const newImage = ctx.film.f.ftz + 1;
    ctx.ei.e.points.push(globalToLocal(e, ctx.domRef));
    ctx.film.f.imageCount = Math.max(ctx.film.f.imageCount, newImage);
    navTo(ctx.film, newImage);
};

const drawUp = ctx => {
    window.removeEventListener("mousemove", ctx.onmousemove);
    window.removeEventListener("mouseup", ctx.onmouseup);
};