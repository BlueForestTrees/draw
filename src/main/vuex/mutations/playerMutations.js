import Do from "../../const/do";
import _ from 'lodash';
import {elapsed} from "../../util/common";

export default {
    [Do.REWIND]: async ({}, film) => {
        rewind(film);
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
    [Do.PLAY]: ({}, film) => {
        rewindIfNeeded(film);
        playFilm(film);
        nextLoop(film);
    }
};

const playFilm = film => {
    film.f.player.playing = true;
    film.f.player.startMoment = _.now() - (film.f.ftz * film.f.config.imageDuration * film.f.config.durationCoef);
};
const rewindIfNeeded = film => film.f.ftz < film.f.imageCount || rewind(film);
const rewind = film => navTo(film, 0);

const nextLoop = film => {
    if (film.f.player.playing) {
        nextImage(film);
        if (film.f.ftz < film.f.imageCount) {
            setTimeout(nextLoop.bind(null, film), film.f.config.imageDuration);
        } else {
            film.f.player.playing = false;
        }
    }
};

const nextImage = (film) => {
    const totalMs = film.f.imageCount * film.f.config.imageDuration * film.f.config.durationCoef;
    const currentMs = elapsed(film.f.player.startMoment, _.now());
    const itz = Math.ceil(film.f.imageCount * currentMs / totalMs);

    navTo(film, itz);
};

export const navTo = (film, to) => {
    film.f.ftz = to;
    _.forEach(film.f.children, sfilm => navTo(sfilm, to));
};
