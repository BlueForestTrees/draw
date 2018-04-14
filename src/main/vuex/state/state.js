import {cloneOffset} from "../../const/values";
import {anagram} from "../../util/common";
import On from "../../const/on";
import modes from "../../const/modes";
import {isNil} from 'lodash';

export const createNav = () => ({
    menuVisible: true,
    filmDialogVisible: false,
    rawFilm: null
});
export const createFilms = () => ([]);
export const createName = anagram;
export const createSelection = () => ({
    elementId: null,
    box: null
});
export const createPens = () => ([
    createPen({}),
    createPen({color: 'red', width: 5}),
    createPen({color: '#1565C0', width: 2}),
]);
export const createPen = ({color, width, opacity, mask, stroke}) => ({
    _id: createId(),
    color: isNil(color) ? '#000000' : color,
    width: isNil(width) ? 10 : width,
    opacity: isNil(opacity) ? 1 : opacity,
    mask: isNil(mask) ? false : mask,
    stroke: isNil(stroke) ? true : stroke
});
export const createFilm = () => ({
    name: createName(),
    elements: [],
    masks: [],
    children: [],
    imageCount: 0,
    ftz: 0,
    keptImage: 0,
    player: createPlayer(),
    config: createConfig(),
    selection: createSelection(),

    zoom: 1
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
    showPhantom: true,
    imageDuration: 15,
    durationCoef: 1,
    activeModeIdx: 1,
    activeMaskIdx: null,


    smooth: true,
    smoothing: 0.2,
    flattening: 0,

    simplify: false,
    simpleMode: "visvalingam",
    simpleCoef: 10
});
export const createId = () => Math.random() + "";


export const createElement = ({_id, pen, points, svg, d, anim}) => ({
    _id: _id || createId(),
    pen: Object.assign({}, pen),
    points,
    svg,
    d,
    anim
});

export const createElementInstance = (e, film) => ({
    e,
    _id: createId(),
    tx: 0,
    ty: 0,
    tz: film.f.ftz
});

export const cloneElementInstance = ei => ({
    e: ei.e,
    _id: createId(),
    tz: ei.tz,
    tx: ei.tx + cloneOffset,
    ty: ei.ty + cloneOffset
});
export const createModes = () => ([
    {name: modes.FILM, icon: "map"},
    {name: modes.BRUSH, icon: "brush", surfaceAction: On.START_DRAW},
    {name: modes.SELECT, icon: "select_all", surfaceAction: On.START_SELECT},
    {name: modes.MASK, icon: "group_work", surfaceAction: On.START_SELECT},
    {name: modes.ZOOM, icon: "search", surfaceAction: On.START_ZOOM},
    {name: modes.IMPORT, icon: "get_app"},
]);

export default {
    nav: createNav(),
    films: createFilms(),
    activeFilm: null,
    pens: createPens(),
    activePen: null,
    panels: createModes()
};