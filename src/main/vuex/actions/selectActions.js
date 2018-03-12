import On from "../../const/on";
import {globalToLocal, minus} from "../../util/geo";
import Vue from 'vue';
import {createSelection} from "../state/state";
import _ from 'lodash';

export default {
    [On.START_SELECT]: ({commit}, {e, film, domRef}) => {
        const currentElementSvg = e.target;
        if (currentElementSvg.id && currentElementSvg.id !== "surface") {
            const element = _.find(film.elements, {_id: currentElementSvg.id});
            const ctx = {film, domRef};
            ctx.onmousemove = selectMove.bind(null, ctx);
            ctx.onmouseup = selectUp.bind(null, ctx);

            film.selection.element = element;

            Vue.nextTick(() => {
                window.addEventListener("mousemove", ctx.onmousemove);
                window.addEventListener("mouseup", ctx.onmouseup);
            });
        } else {
            film.selection = createSelection();
        }
    }
}

const selectMove = (ctx, e) => {
    const movePoint = globalToLocal(e, ctx.domRef);
    ctx.film.selection.downPoint = ctx.film.selection.downPoint || movePoint;

    const move = minus(movePoint, ctx.film.selection.downPoint);
    ctx.film.selection.box.tx = ctx.film.selection.element.tx = ctx.film.selection.offset.tx + move.x;
    ctx.film.selection.box.ty = ctx.film.selection.element.ty = ctx.film.selection.offset.ty + move.y;
};

const selectUp = (ctx) => {
    window.removeEventListener("mousemove", ctx.onmousemove);
    window.removeEventListener("mouseup", ctx.onmouseup);
    ctx.film.selection.downPoint = null;
};