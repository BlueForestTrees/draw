import Do from "../../const/do";
import {endChrono} from "../../util/common";
import {createChrono} from "../state/state";

export default {
    [Do.REWIND]: async ({}, film) => {
        rewind(film);
    },
    [Do.PREV]: ({}, film) => {
        film.index = Math.max(0, film.index - 1);
    },
    [Do.NEXT]: ({}, film) => {
        film.index = Math.min(film.length, film.index + 1);
    },
    [Do.KEEP]: ({}, film) => {
        film.keep = film.index;
    },
    [Do.UNKEEP]: ({}, film) => {
        film.index = film.keep;
    },
    [Do.PAUSE]: ({}, film) => {
        film.player.playing = false;
    },
    [Do.PLAY]: ({}, film) => {
        rewindIfNeed(film);
        film.player.playing = true;
        film.player.chrono = createChrono();
        playNext(film);
    }
};

const rewindIfNeed = film => {
    if (film.index === film.length) {
        rewind(film);
    }
};
const rewind = film => film.index = 0;

const playNext = film => {
    if (film.player.playing) {
        if (nextTick(film)) {
            setTimeout(playNext.bind(null, film), film.config.imageDuration);
        } else {
            film.player.playing = false;
        }
    }
};
const nextTick = film => {
    const base = film.config.imageDuration * film.config.durationCoef;
    const total = film.length * base;
    const elapsedRatio = endChrono(film.player.chrono) / total;
    const elapsedImage = Math.ceil(film.length * elapsedRatio);
    film.index = Math.min(film.length, elapsedImage);
    return film.index < film.length;
};