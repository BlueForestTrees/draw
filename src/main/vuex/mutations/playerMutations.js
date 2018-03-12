import Do from "../../const/do";
import _ from 'lodash';
import {elapsed} from "../../util/common";

export default {
    [Do.REWIND]: async ({}, film) => {
        rewind(film);
    },
    [Do.PREV]: ({}, film) => {
        navTo(film, Math.max(0, film.index - 1));
    },
    [Do.NEXT]: ({}, film) => {
        navTo(film, Math.min(film.imageCount, film.index + 1));
    },
    [Do.KEEP]: ({}, film) => {
        film.keep = film.index;
    },
    [Do.UNKEEP]: ({}, film) => {
        navTo(film, film.keep);
    },
    [Do.PAUSE]: ({}, film) => {
        film.player.playing = false;
    },
    [Do.PLAY]: ({}, film) => {
        rewindIfNeeded(film);
        playFilm(film);
        nextLoop(film);
    }
};

const playFilm = film => {
    film.player.playing = true;
    film.player.startMoment = _.now();
};
const rewindIfNeeded = film => film.index === film.imageCount && rewind(film);
const rewind = film => navTo(film, 0);
const endNotReached = film => film.index < film.imageCount;

const nextLoop = film => {
    if (film.player.playing) {
        nextImage(film);
        if (endNotReached(film)) {
            setTimeout(nextLoop.bind(null, film), film.config.imageDuration);
        } else {
            film.player.playing = false;
        }
    }
};

const nextImage = film => {
    const base = film.config.imageDuration * film.config.durationCoef;
    const total = film.imageCount * base;
    const elapsedRatio = elapsed(film.player.startMoment, _.now()) / total;
    const elapsedImage = Math.ceil(film.imageCount * elapsedRatio);

    navTo(film, Math.min(film.imageCount, elapsedImage));
};

export const navTo = (film, to) => {
    film.index = to;
    _.forEach(film.children, sfilm => navTo(sfilm, to));
};
