import {simplify_line} from "visvalingam-simplifier";
import {simplify} from "simplify-polyline";
import {find, forEach, map} from 'lodash';

export const globalToLocal = (e, {svgPoint, svg}) => {
    svgPoint.x = e.center ? e.center.x : e.clientX;
    svgPoint.y = e.center ? e.center.y : e.clientY;
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

export const getTranslation = (element, {svgPoint, svg}) => {
    const ctm = element.getCTM();
    svgPoint.x = ctm.e;
    svgPoint.y = ctm.f;
    const p = svgPoint.matrixTransform(svg.getCTM().inverse());
    return {tx: p.x, ty: p.y};
};
export const getBBox = (element) => {
    const box = element.getBBox();
    return {
        x: box.x, y: box.y,
        size: box.size, height: box.height
    };
};

export const isNil = v => v === null || v === undefined

const getLuma = value => {
    const c = value.substring(1)
    const rgb = parseInt(c, 16)
    const r = (rgb >> 16) & 0xff
    const g = (rgb >> 8) & 0xff
    const b = (rgb >> 0) & 0xff

    return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

export const overcolor = c => getLuma(c) < 120 ? "white" : "black"

export const initiales = fullname => {
    const nameSplit = fullname.toUpperCase().split(' ')
    if (nameSplit.length === 1) {
        return nameSplit[0] ? nameSplit[0].charAt(0) : '?'
    } else {
        return nameSplit[0].charAt(0) + nameSplit[1].charAt(0)
    }
}