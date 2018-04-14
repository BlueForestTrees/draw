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

export const eii = (ei, ftz) => ei.e.anim ? Math.min(ftz - ei.tz, ei.e.points.length) : ei.e.points.length;
export const showPathD = (ei, film) => ei.e.d && ei.tz <= film.f.ftz;

export const style = (pen) => {
    if (pen.stroke) {
        return `fill:none; stroke:${pen.color}; stroke-width:${pen.width}; stroke-linecap:round; stroke-opacity:${pen.opacity};`
            + (pen.mask ? `clip-path: url(#mask${pen.mask});` : "")
            + `stroke-linecap:${pen.linecap}`;
    } else {
        return `fill-opacity:${pen.opacity}; fill:${pen.color};` + (pen.mask ? `clip-path: url(#mask${pen.mask});` : "");
    }
};

export const path = (pen, points, config, length) => {
    config = config || {};
    let pathPoints = simplifyPoints(limit(points, length || points.length), config);
    const hwidth = pen.width * 0.5;

    if (!pen.stroke) {
        if (pathPoints.length > 1) {

            const up = [pathPoints[0]];
            const down = [pathPoints[0]];

            for (let i = 1; i < pathPoints.length; i++) {
                const pt = pathPoints[i];
                const ppt = pathPoints[i - 1];

                const dx = pt.x - ppt.x;
                const dy = pt.y - ppt.y;


                up.push(
                    {x: pt.x - hwidth, y: pt.y - hwidth}
                );
                down.push(
                    {x: pt.x + hwidth, y: pt.y + hwidth}
                );
            }

            pathPoints = up.concat(down.reverse());
        }
    }

    const path = ["M"];
    if (config.smooth) {
        path.push(`${pathPoints[0].x},${pathPoints[0].y}`);
        for (let i = 1; i < pathPoints.length; i++) {
            path.push(bezierCommand(i, pathPoints, config));
        }
    } else {
        for (let i = 0; i < pathPoints.length; i++) {
            path.push(`${pathPoints[i].x},${pathPoints[i].y}`);
        }
    }

    if (!pen.stroke) {
        path.push("z");
    }

    return path.join(" ");
};

export const mapPoint = (value, inMin, inMax, outMin, outMax) => (value - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;

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

export const limit = (points, length) => points.slice(0, length);

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
    const flat = mapPoint(Math.cos(o.angle) * config.flattening, 0, 1, 1, 0);
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

export const getBBox = (parent, childId) => {
    const box = parent.getElementById(childId).getBBox();
    return {
        x: box.x, y: box.y,
        width: box.width, height: box.height
    };
};