import Do from "../../const/do";
import _ from 'lodash';
import {elapsed} from "../../util/common";

export default {
    [Do.REWIND]: async ({}, film) => {
        rewind(film);
    },
    [Do.PREV]: ({}, film) => {
        navTo(film, Math.max(0, film.currentImage - 1));
    },
    [Do.NEXT]: ({}, film) => {
        navTo(film, Math.min(film.imageCount, film.currentImage + 1));
    },
    [Do.KEEP]: ({}, film) => {
        film.keptImage = film.currentImage;
    },
    [Do.UNKEEP]: ({}, film) => {
        navTo(film, film.keptImage);
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
    film.player.startMoment = _.now() - (film.currentImage * film.config.imageDuration * film.config.durationCoef);
};
const rewindIfNeeded = film => endReached(film) && rewind(film);
const rewind = film => navTo(film, 0);
const endReached = film => film.currentImage >= film.imageCount;

const nextLoop = film => {
    if (film.player.playing) {
        nextImage(film);
        if (endReached(film)) {
            film.player.playing = false;
        } else {
            setTimeout(nextLoop.bind(null, film), film.config.imageDuration);
        }
    }
};

const nextImage = film => {
    const totalMs = film.imageCount * film.config.imageDuration * film.config.durationCoef;
    const currentMs = elapsed(film.player.startMoment, _.now());
    const currentImage = Math.ceil(film.imageCount * currentMs / totalMs);

    navTo(film, Math.min(film.imageCount, currentImage));
};

export const navTo = (film, to) => {
    film.currentImage = to;
    _.forEach(film.children, sfilm => navTo(sfilm, to));
};
