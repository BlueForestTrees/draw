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
        navTo(film, film.currentImage + 1);
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
    [Do.PLAY]: ({}, {film, imageCount}) => {

        console.log("play", imageCount);

        rewindIfNeeded(film, imageCount);
        playFilm(film);
        nextLoop(film, imageCount);
    }
};

const playFilm = film => {
    film.player.playing = true;
    film.player.startMoment = _.now() - (film.currentImage * film.config.imageDuration * film.config.durationCoef);
};
const rewindIfNeeded = (film, imageCount) => film.currentImage < imageCount || rewind(film);
const rewind = film => navTo(film, 0);

const nextLoop = (film, imageCount) => {
    if (film.player.playing) {
        nextImage(film);
        if (film.currentImage < imageCount) {
            setTimeout(nextLoop.bind(null, film, imageCount), film.config.imageDuration);
        } else {
            film.player.playing = false;
        }
    }
};

const nextImage = (film, imageCount) => {
    const totalMs = imageCount * film.config.imageDuration * film.config.durationCoef;
    const currentMs = elapsed(film.player.startMoment, _.now());
    const currentImage = Math.ceil(imageCount * currentMs / totalMs);

    navTo(film, currentImage);
};

export const navTo = (film, to) => {
    film.currentImage = to;
    _.forEach(film.children, sfilm => navTo(sfilm, to));
};
