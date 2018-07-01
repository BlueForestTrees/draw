import On from "../../const/on";
import {getTranslation, globalToLocal, minus} from "../../util/util";
import {createSelection} from "../state/state";
import Do from "../../const/do";
import modes from "../../const/modes";
import {getElement} from "../../util/common";

export default {
    [On.START_SELECT]: ({commit}, {evt, film, domRef, touch}) => {
        const currentElementSvg = evt.target;
        if (currentElementSvg.id && currentElementSvg.id !== "surface") {
            const ctx = {
                domRef,
                selection: film.f.selection,
                element: getElement(film, currentElementSvg.id),
                initialTxy: getTranslation(domRef.svg.getElementById(currentElementSvg.id), domRef),
                downMouse: globalToLocal(evt, domRef),
                touch
            };
            ctx.onmove = selectMove.bind(null, ctx);
            ctx.onup = selectUp.bind(null, ctx);

            commit(Do.SET_SELECTION_ELEMENT, {film, elementId: currentElementSvg.id});

            touch.on("panmove", ctx.onmove);
            touch.on("panend", ctx.onup);
        } else {
            film.f.selection = createSelection();
        }
    },
    [On.PICK_PEN]: ({commit}, ei) => {
        commit(Do.PICK_PEN, Object.assign({}, ei.e.pen));
        commit(Do.SET_MODE, modes.BRUSH);
    }
}

const selectMove = ({selection, element, domRef, downMouse, initialTxy}, e) => {
    const move = minus(globalToLocal(e, domRef), downMouse);
    selection.box.tx = element.tx = initialTxy.tx + move.x;
    selection.box.ty = element.ty = initialTxy.ty + move.y;
};

const selectUp = ({touch, onmove, onup}) => {
    touch.off("panmove", onmove);
    touch.off("panend", onup);
};

