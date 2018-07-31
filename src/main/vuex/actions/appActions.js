import Do from "../../const/do";
import On from "../../const/on";
import {deleteFilm, getFilm, getFilms, saveFilm} from "../../rest/api";
import {cloneFilm, createCamera, createId} from "../state/state";

const needLoad = film => !film.f.elements;

export default {
    [On.MOUNT_APP]: async ({commit, dispatch}) => {
        commit(Do.ACTIVATE_FIRST_PEN);
        await dispatch(On.LOAD_FILMS);
        await dispatch(On.ACTIVATE_NEW_FILM);
        await dispatch(On.BIND_GLOBAL_KEYS);
    },
    [On.LOAD_FILMS]: async ({commit}) => {
        try {
            commit(Do.SET_FILMS, await getFilms());
        } catch (e) {
            console.error("impossible de récupérer les films", e);
        }
    },
    [On.LOAD_FILM]: async ({commit}, film) => {
        let f = film;
        if (needLoad(film)) {
            f = await getFilm(film._id);
        }
        retroCompatFilm(f);
        commit(Do.SELECT_FILM, f);
    },
    [On.DELETE_FILM]: async ({commit}, film) => {
        await deleteFilm(film._id);
    },
    [On.SAVE_FILM_AS]: async ({dispatch, commit}, {film, name}) => {
        let filmToSave = film;
        const nameChanged = name && filmToSave.f.name !== name;
        if (nameChanged) {
            filmToSave = cloneFilm(filmToSave, name);
            filmToSave.f.name = name;
            filmToSave._id = createId();
        }
        await saveFilm(filmToSave);
        if (nameChanged) {
            commit(Do.ADD_FILM, filmToSave);
            commit(Do.SELECT_FILM, filmToSave);
        }
    },
    [On.BIND_GLOBAL_KEYS]: async ({dispatch, commit, state}) => {
        const keydown = event => {
            if (state.shortcuts && state.shortcuts.hasOwnProperty(event.keyCode)) {
                state.shortcuts[event.keyCode]({dispatch, commit, state});
            }
        };

        window.addEventListener("keydown", keydown, true);
    }
}

const retroCompatFilm = film => {
    if (!film.camera) film.camera = createCamera();
};