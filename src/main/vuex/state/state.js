import {cloneOffset} from "../../const/values";
import {anagram} from "../../util/common";
import On from "../../const/on";

export const createNav = () => ({
    menuVisible: true
});
export const createFilms = () => ([]);
export const createName = anagram;
export const createSelection = () => ({
    element: null,
    box: null
});
export const createFilm = () => ({
    name: createName(),
    elements: [],
    children: [],
    imageCount: 0,
    currentImage: 0,
    keptImage: 0,
    player: createPlayer(),
    config: createConfig(),
    selection: createSelection()
});
export const createFilmInstance = (f, tz) => ({
    f: f || createFilm(),
    _id: createId(),
    tx: 0,
    ty: 0,
    tz: tz || 0
});
export const createPlayer = () => ({
    playing: false,
    startMoment: null
});
export const createConfig = () => ({
    showPhantom: false,
    smooth: false,
    smoothing: 0.2,
    flattening: 0,

    simplify: false,
    simpleMode: "visvalingam",
    simpleCoef: 10,

    imageDuration: 15,
    durationCoef: 1,

    color: '#1CA085',

    activeModeIdx: 0
});
export const createId = () => Math.random() + "";
export const createElement = () => ({
    _id: createId(),
    points: []
});
export const createElementInstance = (e, tz) => ({
    e,
    _id: createId(),
    tx: 0,
    ty: 0,
    tz
});
export const cloneElementInstance = ei => ({
    e: ei.e,
    _id: createId(),
    tz: ei.tz,
    tx: ei.tx + cloneOffset,
    ty: ei.ty + cloneOffset
});
export const createModes = () => ([
    {name: "draw", icon: "brush", canColor: true, action: On.START_DRAW},
    {name: "select", icon: "pan_tool", action: On.START_SELECT}
]);

export default {
    nav: createNav(),
    films: createFilms(),
    activeFilm: null,
    modes: createModes()
};