import On from "../../const/on";
import {createElement, createElementInstance} from "../state/state";
import {globalToLocal} from "../../util/util";
import _ from 'lodash';
import Do from "../../const/do";
import {navTo} from "../../util/playerControl";

export default {
    [On.START_DRAW]: ({commit, getters, state}, {evt, film, domRef, pen}) => {
        const ctx = {
            e: createElement({pen: {...pen, mask: getters.activeMaskId}, points: [], anim: true}),
            startMoment: _.now(),
            film,
            domRef
        };

        const ei = createElementInstance(ctx.e, film);
        commit(Do.ADD_ELEMENT_INSTANCE, {ei, film});

        ctx.onmousemove = drawMove.bind(null, ctx);
        ctx.onmouseup = drawUp.bind(null, ctx);

        drawMove(ctx, evt);

        window.addEventListener("mousemove", ctx.onmousemove);
        window.addEventListener("mouseup", ctx.onmouseup);
        commit(Do.SELECT_ELEMENT, ei);
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