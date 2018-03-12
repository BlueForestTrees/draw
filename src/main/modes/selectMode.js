import {globalToLocal, minus} from "../util/geo";
import _ from 'lodash';
import Vue from 'vue';
import {createDrag} from "../vuex/state/state";

const init = ({e, film, domRef}) => {
    const currentElementSvg = e.target;
    if (currentElementSvg.id && currentElementSvg.id !== "surface") {
        const ctx = {film, domRef};
        ctx.onmousemove = selectMove.bind(null, ctx);
        ctx.onmouseup = selectUp.bind(null, ctx);

        film.selection.element = _.find(film.elements, {_id: currentElementSvg.id});

        Vue.nextTick(() => {
            window.addEventListener("mousemove", ctx.onmousemove);
            window.addEventListener("mouseup", ctx.onmouseup);
        });
    }
};

export const select = ({element, film, domRef}) => {
    const elementSvg = domRef.svg.getElementById(element._id);
    const ctm = elementSvg.getCTM();
    film.selection.drag.initialOffset = {tx: ctm.e, ty: ctm.f};

    film.selection.box = elementSvg.getBBox();
    Object.assign(film.selection.box, film.selection.drag.initialOffset);
};

const selectMove = (ctx, e) => {
    const movePoint = globalToLocal(e, ctx.domRef);
    ctx.film.selection.drag.downPoint = ctx.film.selection.drag.downPoint || movePoint;

    const move = minus(movePoint, ctx.film.selection.drag.downPoint);
    ctx.film.selection.box.tx = ctx.film.selection.element.tx = ctx.film.selection.drag.initialOffset.tx + move.x;
    ctx.film.selection.box.ty = ctx.film.selection.element.ty = ctx.film.selection.drag.initialOffset.ty + move.y;
};

const selectUp = (ctx) => {
    window.removeEventListener("mousemove", ctx.onmousemove);
    window.removeEventListener("mouseup", ctx.onmouseup);
    ctx.film.selection.drag = createDrag();
};

export const initSelectMode = init;