import {cloneOffset} from "../../const/values";
import {anagram} from "../../util/common";
import On from "../../const/on";
import modes from "../../const/modes";

export const createNav = () => ({
    menuVisible: true
});
export const createFilms = () => ([]);
export const createName = anagram;
export const createSelection = () => ({
    element: null,
    box: null
});
export const createPens = () => ([
    Object.assign(createPen("basic"), {}),
    Object.assign(createPen("little red"), {color: 'red', width: 5}),
    Object.assign(createPen("mini blue"), {color: 'blue', width: 2}),
    Object.assign(createPen("black stroke"), {width: 7, stroke: true}),
]);
export const createPen = name => ({
    name,
    color: '#000000',
    width: 10,
    opacity: 1
});
export const createFilm = () => ({
    name: createName(),
    elements: [],
    children: [],
    imageCount: 0,
    ftz: 0,
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
    imageDuration: 15,
    durationCoef: 1,
    activeModeIdx: 0,


    smooth: true,
    smoothing: 0.2,
    flattening: 0,

    simplify: false,
    simpleMode: "visvalingam",
    simpleCoef: 10
});
export const createId = () => Math.random() + "";


export const createElement = ({pen, points, svg, d, anim}) => ({
    _id: createId(),
    pen: Object.assign({}, pen),
    points,
    svg,
    d,
    anim
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
    {name: modes.BRUSH, icon: "brush", canColor: true, action: On.START_DRAW},
    {name: modes.SELECT, icon: "pan_tool", action: On.START_SELECT},
    {name: modes.ZOOM, icon: "search", action: On.START_ZOOM}
]);
export const createImportDialog = () => ({
    visible: false
});

export default {
    nav: createNav(),
    films: createFilms(),
    activeFilm: null,
    pens: createPens(),
    activePen: null,
    modes: createModes(),
    importDialog: createImportDialog()
};