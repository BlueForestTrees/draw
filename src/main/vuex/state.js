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


    color: '#1CA085'
});

export const createChrono = () => ({
    start: _.now(),
    duration: 0,
    drawEnd: 0
});

export const createElement = start => ({
    _id: Math.random() + "",
    start,
    duration: 0,
    points: []
});

export default {
    nav: createNav()
};