import Do from "../../const/do";

export default {
    [Do.ZOOM_IN]: (state, film) => {
        film.zoom *= 2;
    },
    [Do.ZOOM_OUT]: (state, film) => {
        film.zoom /= 2;
    }
}