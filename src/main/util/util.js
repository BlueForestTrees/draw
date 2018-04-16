import {simplify_line} from "visvalingam-simplifier";
import {simplify} from "simplify-polyline";
import {find, forEach, map} from 'lodash';

export const globalToLocal = (e, {svgPoint, svg}) => {
    svgPoint.x = e.clientX;
    svgPoint.y = e.clientY;
    const p = svgPoint.matrixTransform(svg.getScreenCTM().inverse());
    return {x: p.x, y: p.y};
};

export const minus = (p1, p2) => ({x: p1.x - p2.x, y: p1.y - p2.y});

const simplifyPoints = (points, config) => {
    if (config.simplify) {
        return config.simpleMode === "visvalingam" ?
            simplify(points, config.simpleCoef)
            :
            simplify_line(points, config.simpleCoef * 200)
    } else {
        return points;
    }
};

export const simplifyFilm = film => forEach(film.f.elements, ei => ei.e.points = simplifyPoints(ei.e.points, film.f.config));
export const getTxTy = (parent, childId) => {
    const ctm = parent.getElementById(childId).getCTM();
    return {tx: ctm.e, ty: ctm.f};
};

export const getBBox = (parent, childId) => {
    const box = parent.getElementById(childId).getBBox();
    return {
        x: box.x, y: box.y,
        width: box.width, height: box.height
    };
};