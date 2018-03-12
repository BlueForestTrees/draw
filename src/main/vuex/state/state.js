import {cloneOffset} from "../../const/values";
import {anagram} from "../../util/common";
import {initDrawMode} from "../../modes/drawMode";
import {initSelectMode} from "../../modes/selectMode";

export const createNav = () => ({
    menuVisible: true
});
export const createFilms = () => ([]);
export const createName = anagram;
export const createSelection = () => ({
    element: null,
    box: null,
    drag: createDrag()
});
export const createDrag = () => ({
    initialOffset: null,
    downPoint: null
});
export const createFilm = () => ({
    name: createName(),
    elements: [],
    index: 0,
    length: 0,
    keep: 0,
    player: createPlayer(),
    config: createConfig(),
    selection: createSelection()
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

    imageDuration: 15,
    durationCoef: 1,

    color: '#1CA085',

    activeModeIdx: 1
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
export const createElementInstance = (e, position) => ({
    e,
    _id: createId(),
    position,
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
export const createModes = () => ([
    {name: "draw", icon: "brush", canColor: true, init: initDrawMode},
    {name: "select", icon: "pan_tool", init: initSelectMode}
]);

export default {
    nav: createNav(),
    films: createFilms(),
    activeFilm: null,
    modes: createModes()
};