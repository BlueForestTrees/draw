export const play = film => {
    rewindIfNeeded(film);
    playFilm(film);
    nextLoop(film);
};

const rewindIfNeeded = film => film.f.ftz < film.f.imageCount || rewind(film);
const playFilm = film => {
    film.f.player.playing = true;
    film.f.player.startMoment = Date.now() - (film.f.ftz * film.f.config.imageDuration * film.f.config.durationCoef);
};
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
    const currentMs = Date.now() - film.f.player.startMoment;
    const itz = Math.ceil(film.f.imageCount * currentMs / totalMs);

    navTo(film, itz);
};

export const rewind = film => navTo(film, 0);
export const navTo = (film, to) => {
    film.f.ftz = to;
};