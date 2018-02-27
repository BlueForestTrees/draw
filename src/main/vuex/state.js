export const createNav = () => ({
    menuVisible: true
});

export const createFilm = () => ({
    elements: [],
    index: 0,
    length: 0,
    keep: 0
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

    tool: 0,

    selection: null
});

export const createChrono = () => ({
    start: _.now(),
    duration: 0,
    drawEnd: 0
});

const id = () => Math.random() + "";
const cloneOffset = 10;

export const createElement = () => ({
    _id: id(),
    duration: 0,
    points: []
});

export const createElementInstance = e => ({
    e,
    _id: id(),
    position: 0,
    tx: 0,
    ty: 0
});

export const cloneElementInstance = ei => ({
    e: ei.e,
    _id: id(),
    position: ei.position,
    tx: ei.tx + cloneOffset,
    ty: ei.ty + cloneOffset
});

export default {
    nav: createNav()
};