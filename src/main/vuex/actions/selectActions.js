import On from "../../const/on";
import {getTxTy, globalToLocal, minus} from "../../util/geo";
import Vue from 'vue';
import {createSelection} from "../state/state";
import _ from 'lodash';
import Do from "../../const/do";

export default {
    [On.START_SELECT]: ({commit}, {evt, film, domRef}) => {


        const currentElementSvg = evt.target;
        if (currentElementSvg.id && currentElementSvg.id !== "surface") {
            const element = _.find(film.f.elements, {_id: currentElementSvg.id});
            const ctx = {
                domRef,
                selection: film.f.selection,
                downMouse: globalToLocal(evt, domRef),
                initialTxy: getTxTy(domRef.svg, element._id)
            };
            ctx.onmousemove = selectMove.bind(null, ctx);
            ctx.onmouseup = selectUp.bind(null, ctx);

            commit(Do.SET_SELECTION_ELEMENT, {film, element});

            Vue.nextTick(() => {
                window.addEventListener("mousemove", ctx.onmousemove);
                window.addEventListener("mouseup", ctx.onmouseup);
            });
        } else {
            film.f.selection = createSelection();
        }
    }
}

const selectMove = ({selection, domRef, downMouse, initialTxy}, e) => {
    const move = minus(globalToLocal(e, domRef), downMouse);
    selection.box.tx = selection.element.tx = initialTxy.tx + move.x;
    selection.box.ty = selection.element.ty = initialTxy.ty + move.y;
};

const selectUp = (ctx) => {
    window.removeEventListener("mousemove", ctx.onmousemove);
    window.removeEventListener("mouseup", ctx.onmouseup);
};