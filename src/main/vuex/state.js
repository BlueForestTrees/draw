export const createNav = () => ({
    menuVisible: true
});

export const createFilm = () => ({
    elements: [],
    position: 0,
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

    delay: 1,

    color: '#1CA085'
});

export const createElement = start => ({
    _id: Math.random() + "",
    start,
    points: []
});

export default {
    nav: createNav()
};