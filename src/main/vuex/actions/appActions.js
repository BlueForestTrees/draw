import Do from "../../const/do";
import On from "../../const/on";
import {deleteFilm, getFilm, getFilms} from "../../rest/api";

export default {
    [On.MOUNT_APP]: async ({commit, dispatch}) => {
        commit(Do.ACTIVATE_FIRST_PEN);
        await dispatch(On.LOAD_FILMS);
        await dispatch(On.ACTIVATE_NEW_FILM);
    },
    [On.LOAD_FILMS]: async ({commit}) => {
        try {
            commit(Do.SET_FILMS, await getFilms());
        }catch(e){
            console.error("impossible de récupérer les films", e);
        }
    },
    [On.LOAD_FILM]: async ({commit}, film) => {
        commit(Do.SELECT_FILM, await getFilm(film._id));
    },
    [On.DELETE_FILM]: async ({commit}, film) => {
        await deleteFilm(film._id);
    }
}