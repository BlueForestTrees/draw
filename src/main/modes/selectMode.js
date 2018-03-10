import {globalToLocal, minus} from "../util/geo";
import _ from 'lodash';
import Vue from 'vue';

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
    } else {
        // TODO unselect
        // this.downPoint = null;
        // this.film.config.selection = null;
        // this.initialOffset = null;
        // this.currentBBox = null;
    }
};

const selectMove = (ctx, e) => {
    const movePoint = globalToLocal(e, ctx.domRef);
    ctx.film.selection.downPoint = ctx.film.selection.downPoint || movePoint;
    const move = minus(movePoint, ctx.film.selection.downPoint);
    ctx.film.selection.box.tx = ctx.film.selection.element.tx = ctx.film.selection.initialOffset.tx + move.x;
    ctx.film.selection.box.ty = ctx.film.selection.element.ty = ctx.film.selection.initialOffset.ty + move.y;
};

const selectUp = () => {
    window.removeEventListener("mousemove", selectMove);
    window.removeEventListener("mouseup", selectUp);

    this.downPoint = null;
};

export const select = ({element, film, domRef}) => {
    const elementSvg = domRef.svg.getElementById(element._id);
    film.selection.initialOffset = _.map(elementSvg.getCTM(), ctm => ({tx: ctm.e, ty: ctm.f}));
    film.selection.box = elementSvg.getBBox();
    Object.assign(film.selection.box, film.selection.initialOffset);
};

export const initSelectMode = init;