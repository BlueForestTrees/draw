import Do from "../../const/on";
import {find, omit} from 'lodash';
import {createId} from "../state/state";

export default {
    [Do.PICK_PEN]: (state, pen) => {
        const penString = JSON.stringify(omit(pen, "_id"));
        const existingPen = find(state.pens, pen => penString === JSON.stringify(omit(pen, "_id")));
        if (existingPen) {
            state.activePen = existingPen;
        } else {
            pen._id = createId();
            state.pens.push(pen);
            state.activePen = pen;
        }
    }
}