import Do from "../../const/do";
import {navTo, play, rewind} from "../../util/playerControl";

export default {
    [Do.REWIND]: async ({}, film) => {
        film.f.player.playing = false;
        rewind(film);
    },
    [Do.NAV]: ({}, {film, i}) => {
        navTo(film, i);
    },
    [Do.PREV]: ({}, film) => {
        navTo(film, Math.max(0, film.f.ftz - 1));
    },
    [Do.NEXT]: ({}, film) => {
        navTo(film, film.f.ftz + 1);
    },
    [Do.KEEP]: ({}, film) => {
        film.f.keptImage = film.f.ftz;
    },
    [Do.UNKEEP]: ({}, film) => {
        navTo(film, film.f.keptImage);
    },
    [Do.PAUSE]: ({}, film) => {
        film.f.player.playing = false;
    },
    [Do.PLAY]: ({}, film) => play(film)
};
