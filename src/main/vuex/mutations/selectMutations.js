import Do from "../../const/do";

export default {
    [Do.BOX_FROM_ELEMENT]: (state, {element, film, domRef}) => {
        const elementSvg = domRef.svg.getElementById(element._id);
        const ctm = elementSvg.getCTM();
        const box = elementSvg.getBBox();

        film.selection.offset = {tx: ctm.e, ty: ctm.f};
        film.selection.box = Object.assign({x: box.x, y: box.y, width: box.width, height: box.height}, film.selection.offset);
    }
};
