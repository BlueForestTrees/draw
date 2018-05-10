import Do from "../../const/do";

export default {
    [Do.ZOOM_IN]: (state, film) => {
        film.f.zoom /= 1.1;
    },
    [Do.ZOOM_OUT]: (state, film) => {
        film.f.zoom *= 1.1;
    }
}