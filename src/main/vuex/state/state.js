import {cloneOffset} from "../../const/values";
import {anagram} from "../../util/common";

export const createNav = () => ({
    menuVisible: true
});

export const createFilms = () => ([]);

export const createName = anagram;

export const createFilm = () => ({
    name: createName(),
    elements: [],
    index: 0,
    length: 0,
    keep: 0,
    player: createPlayer(),
    config: createConfig()
});

export const createPlayer = () => ({
    playing: false,
    chrono: null
});

export const createConfig = () => ({
    showPhantom: false,
    smooth: false,
    smoothing: 0.2,
    flattening: 0,

    simplify: false,
    simpleMode: "visvalingam",
    simpleCoef: 10,

    imageDuration: 25,
    durationCoef: 1,

    color: '#1CA085',

    activeTool: 0,

    selection: null
});

export const createChrono = () => ({
    start: _.now(),
    duration: 0,
    drawEnd: 0
});

export const createId = () => Math.random() + "";

export const createElement = () => ({
    _id: createId(),
    duration: 0,
    points: []
});

export const createElementInstance = e => ({
    e,
    _id: createId(),
    position: 0,
    tx: 0,
    ty: 0
});

export const cloneElementInstance = ei => ({
    e: ei.e,
    _id: createId(),
    position: ei.position,
    tx: ei.tx + cloneOffset,
    ty: ei.ty + cloneOffset
});

export default {
    nav: createNav(),
    films: createFilms(),
    activeFilm: null
};