import {simplify_line} from "visvalingam-simplifier";
import {simplify} from "simplify-polyline";
import _ from 'lodash';
import {createElementInstance} from "../vuex/state/state";

export const globalToLocal = (e, {svgPoint, svg}) => {
    svgPoint.x = e.clientX;
    svgPoint.y = e.clientY;
    return svgPoint.matrixTransform(svg.getScreenCTM().inverse());
};

export const minus = (p1, p2) => ({x: p1.x - p2.x, y: p1.y - p2.y});

export const eii = (ei, ftz) => ei.e.anim ? Math.min(ftz - ei.tz, ei.e.points.length) : ei.e.points.length;

export const path = (points, config, length) => {
    config = config || {};
    const simplePoints = applyConfig(points, config, length || points.length);
    const path = ["M"];

    if (config.smooth) {
        path.push(`${simplePoints[0].x},${simplePoints[0].y}`);
        for (let i = 1; i < simplePoints.length; i++) {
            path.push(bezierCommand(i, simplePoints, config));
        }
    } else {
        for (let i = 0; i < simplePoints.length; i++) {
            path.push(`${simplePoints[i].x},${simplePoints[i].y}`);
        }
    }

    return path.join(" ");
};

export const map = (value, inMin, inMax, outMin, outMax) => (value - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;

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

export const simplifyFilm = film => _.forEach(film.f.elements, ei => ei.e.points = simplifyPoints(ei.e.points, film.f.config));

export const limit = (points, length) => points.slice(0, length);

const applyConfig = (points, config, length) => simplifyPoints(limit(points, length), config);

const bezierCommand = (i, a, config) => {
    const point = a[i];
    const cps = controlPoint(a[i - 1], a[i - 2], point, false, config);
    const cpe = controlPoint(point, a[i - 1], a[i + 1], true, config);
    return `C ${cps.x},${cps.y} ${cpe.x},${cpe.y} ${point.x},${point.y}`;
};
export const controlPoint = (current, previous, next, reverse, config) => {
    const p = previous || current;
    const n = next || current;
    const o = line(p, n);
    const flat = map(Math.cos(o.angle) * config.flattening, 0, 1, 1, 0);
    const angle = o.angle * flat + (reverse ? Math.PI : 0);
    const length = o.length * config.smoothing;
    const x = current.x + Math.cos(angle) * length;
    const y = current.y + Math.sin(angle) * length;
    return {x, y};
};
export const line = (pointA, pointB) => {
    const lengthX = pointB.x - pointA.x;
    const lengthY = pointB.y - pointA.y;
    return {
        length: Math.sqrt(Math.pow(lengthX, 2) + Math.pow(lengthY, 2)),
        angle: Math.atan2(lengthY, lengthX)
    };
};

export const getTxTy = (parent, childId) => {
    const ctm = parent.getElementById(childId).getCTM();
    return {tx: ctm.e, ty: ctm.f};
};

export const getBox = (parent, childId) => {
    const box = parent.getElementById(childId).getBBox();
    return {
        x: box.x, y: box.y,
        width: box.width, height: box.height
    };
};

export const addToFilm = (e, film) => {
    const ei = createElementInstance(e, film.f.ftz);
    film.f.elements.push(ei);
    return ei;
};