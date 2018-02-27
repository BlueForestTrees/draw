import {simplify_line} from "visvalingam-simplifier";
import {simplify} from "simplify-polyline";
import _ from 'lodash';

export const globalToLocal = (e, svgPoint, svg) => {
    svgPoint.x = e.clientX;
    svgPoint.y = e.clientY;
    return svgPoint.matrixTransform(svg.getScreenCTM().inverse());
};

export const minus = (p1, p2) => ({x: p1.x - p2.x, y: p1.y - p2.y});

export const elementIndex = (ei, index) => Math.min(index - ei.position, ei.e.points.length);

export const polyline = (points, config, length) => {
    const simplePoints = applyConfig(points, config, length || points.length);
    const parts = [];
    for (let i = 0; i < simplePoints.length; i++) {
        parts.push(`${simplePoints[i].x},${simplePoints[i].y}`);
    }
    return parts.join(" ");
};
export const path = (points, config, length) => {
    const simplePoints = applyConfig(points, config, length);
    const point = simplePoints[0];
    const curve = [`M ${point.x},${point.y}`];
    for (let i = 1; i < simplePoints.length; i++) {
        curve.push(bezierCommand(i, simplePoints, config));
    }
    return curve.join(" ");
};

export const map = (value, inMin, inMax, outMin, outMax) => (value - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;

export const simplifyPoints = (points, config) => {
    if (config.simplify) {
        return config.simpleMode === "visvalingam" ?
            simplify(points, config.simpleCoef)
            :
            simplify_line(points, config.simpleCoef * 200)
    } else {
        return points;
    }
};

export const simplifyFilm = (film, config) => _.forEach(film.elements, e => e.points = simplifyPoints(e.points, config));

export const limit = (points, length) => points.slice(0, length);

const applyConfig = (points, config, length) => {
    return simplifyPoints(limit(points, length), config);
};
export const bezierCommand = (i, a, config) => {
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