import On from "../../const/on";
import {createChrono, createElement, createElementInstance} from "../state/state";
import {globalToLocal} from "../../util/geo";
import {endChrono} from "../../util/common";

export default {
    [On.START_DRAW]: ({}, {e, film, domRef}) => {
        const ctx = createDrawCtx(film, domRef);
        ctx.onmousemove = drawMove.bind(null, ctx);
        ctx.onmouseup = drawUp.bind(null, ctx);
        film.elements.push(ctx.ei);
        drawMove(ctx, e);
        window.addEventListener("mousemove", ctx.onmousemove);
        window.addEventListener("mouseup", ctx.onmouseup);
    }
}

const createDrawCtx = (film, domRef) => ({
    ei: createElementInstance(createElement(), film.index),
    chrono: createChrono(),
    film,
    domRef
});


const drawMove = (ctx, e) => {
    ctx.ei.e.points.push(globalToLocal(e, ctx.domRef));
    ctx.film.index++;
    if (ctx.film.index > ctx.film.length) {
        ctx.film.length = ctx.film.index;
    }
};

const drawUp = ctx => {
    ctx.ei.e.duration = endChrono(ctx.chrono);
    window.removeEventListener("mousemove", ctx.onmousemove);
    window.removeEventListener("mouseup", ctx.onmouseup);
};