import On from "../../const/on";
import {createElement, createElementInstance} from "../state/state";
import {globalToLocal} from "../../util/util";
import Do from "../../const/do";
import {navTo} from "../../util/playerControl";

export default {
    [On.START_DRAW]: ({commit, getters, state}, {evt, film, domRef, pen, touch}) => {
        const ctx = {
            ei: createElementInstance(createElement({pen: {...pen, mask: getters.activeMaskId}, points: [], anim: true}), film),
            film, domRef, state, touch
        };

        commit(Do.ADD_ELEMENT_INSTANCE, {ei: ctx.ei, film});
        commit(Do.SET_SELECTION_ELEMENT, {film, elementId: ctx.ei._id});

        ctx.onmove = drawMove.bind(null, ctx);
        ctx.onup = drawUp.bind(null, ctx);

        drawMove(ctx, evt);

        touch.on("panmove", ctx.onmove);
        touch.on("panend", ctx.onup);
        touch.on("pressup", ctx.onup);
    }
}

const drawMove = (ctx, evt) => {
    const newImage = ctx.film.f.ftz + 1;
    ctx.ei.e.points.push(globalToLocal(evt, ctx.domRef));
    ctx.film.f.imageCount = Math.max(ctx.film.f.imageCount, newImage);
    navTo(ctx.film, newImage);
};

const drawUp = ({touch, state, onmove, onup, ei, film}) => {
    touch.off("panmove", onmove);
    touch.off("panend", onup);
    touch.off("pressup", onup);
    if (state.nav.autoreturn) {
        navTo(film, ei.tz);
    }
};