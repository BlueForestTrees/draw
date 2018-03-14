import Do from "../../const/do";
import {getBox, getTxTy} from "../../util/geo";

export default {
    [Do.SET_SELECTION_ELEMENT]: (state, {film, element}) => {
        film.f.selection.element = element;
    },
    [Do.SET_SELECTION_BOX]: (state, {element, film, domRef}) => {
        if (element) {
            film.f.selection.box = {
                ...getBox(domRef.svg, element._id),
                ...getTxTy(domRef.svg, element._id)
            };
        }
    }
};
