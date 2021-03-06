import {reduced} from "../../util/common"
import On from "../../const/on"
import modes from "../../const/modes"
import {cloneDeep, isNil} from 'lodash'
import ObjectID from "bson-objectid"
import Do from "../../const/do"
import {dialogs} from "./dialogState"
import {snack} from "./snackState"

export const createConfig = () => ({
    showPhantom: false,
    imageDuration: 15,
    durationCoef: 1,
    activeModeIdx: 0,
    activeMaskIdx: null,

    smooth: false,

    simplify: false,
    simpleMode: "visvalingam",
    simpleCoef: 10
})
export const createElement = ({_id, pen, points, svg, d, anim}) => ({
    _id: _id || createId(),
    pen: Object.assign({}, pen),
    points,
    svg,
    d,
    anim
})
export const createElementInstance = (e, film) => ({
    e,
    _id: createId(),
    tx: 0,
    ty: 0,
    tz: film.f.ftz
})
export const cloneElementInstance = ei => ({
    e: ei.e,
    _id: createId(),
    tz: ei.tz,
    tx: ei.tx,
    ty: ei.ty
})
export const createFilm = () => ({
    name: createName(),
    elements: [],
    masks: [],
    children: [],
    imageCount: 0,
    start: 0,
    ftz: 0,
    keptImage: 0,
    player: createPlayer(),
    config: createConfig(),
    selection: createSelection(),

    zoom: 1,
    panx: 0,
    pany: 0,
    
    show: false
})
export const cloneFilm = (film, newName) => {
    const clonedFilm = cloneDeep(film)
    clonedFilm.f.name = name
    clonedFilm._id = createId()
    return clonedFilm
}
export const createFilmInstance = () => ({
    f: createFilm(),
    _id: createId(),
    camera: createCamera()
})
export const createCamera = () => ({x: -1500, y: -1500, w: 3000, h: 3000})
export const createId = () => Math.random() + ""
export const createName = () => reduced(ObjectID())
export const createPens = () => ([
    createPen({color: '#1155cc', size: 50}),
    createPen({}),
    createPen({color: 'red', size: 5}),
    createPen({color: '#1565C0', size: 2}),
])
export const createPen = ({color, width, opacity, mask, stroke}) => ({
    _id: createId(),
    color: isNil(color) ? '#000000' : color,
    size: isNil(width) ? 10 : width,
    opacity: isNil(opacity) ? 1 : opacity,
    mask: isNil(mask) ? false : mask,
    stroke: isNil(stroke) ? true : stroke,
    length: 0
})
export const createPlayer = () => ({
    playing: false,
    startMoment: null
})
export const createSelection = () => ({
    elementId: null,
    box: null
})
export const createShortcuts = () => ({
    32: ({dispatch, state}) => dispatch(On.TOGGLE_PLAY, state.activeFilm),
    46: ({dispatch}) => dispatch(On.DELETE_SELECTION),
    37: ({commit, state}) => commit(Do.PREV, state.activeFilm),
    39: ({commit, state}) => commit(Do.NEXT, state.activeFilm)
})

export default {
    nav: {
        rawEditFilmDialogVisible: false,
        filmListDialogVisible: false,
        importPathDialogVisible: false,
        zoomSide: 0,
        autoreturn: false
    },
    panels: [
        {name: modes.BRUSH, icon: "brush", surfaceAction: On.START_DRAW},
        {name: modes.SELECT, icon: "layers", surfaceAction: On.START_SELECT},
        {name: modes.ZOOM, icon: "search", surfaceAction: On.START_ZOOM},
        {name: modes.CAMERA, icon: "videocam", surfaceAction: On.START_CAMERA},
    ],
    films: [],
    activeFilm: null,
    pens: createPens(),
    activePen: null,
    shortcuts: createShortcuts(),
    selectionHistory: [],
    colorPanel: {
        rows: 7, cols: 7, colors: null
    },

    user: null,
    dialogs: dialogs(),
    snack: snack(),
}