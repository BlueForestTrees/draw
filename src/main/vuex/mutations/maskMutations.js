import Do from "../../const/do";

export default {
    [Do.ADD_MASK_TO_FILM]: ({}, {ei, film}) => {
        film.f.masks.push(ei);
        film.f.config.activeMaskIdx = film.f.masks.length - 1;
    },
    [Do.ADD_ELEMENT_INSTANCE]: ({}, {ei, film}) => {
        film.f.elements.push(ei);
    }
};
