export const eii = (ei, ftz) => ei.e.anim ? Math.min(ftz - ei.tz, ei.e.points.length) : ei.e.points.length;
export const showPathD = (ei, film) => ei.e.d && ei.tz <= film.f.ftz;
export const style = (pen) => {
    if (pen.stroke) {
        return `fill:none; stroke:${pen.color}; stroke-width:${pen.size}; stroke-linecap:round; stroke-opacity:${pen.opacity};`
            + (pen.mask ? `clip-path: url(#mask${pen.mask});` : "")
    } else {
        return `fill-opacity:${pen.opacity}; fill:${pen.color};` + (pen.mask ? `clip-path: url(#mask${pen.mask});` : "");
    }
};
export const path = (pen, points, config, length) => {
    config = config || {};
    const last = length || points.length;
    const first = pen.length === 0 ? 0 : length - pen.length;
    let pathPoints = points.slice(first, last);
    const hwidth = pen.size * 0.5;

    if (!pen.stroke) {
        if (pathPoints.length > 1) {

            const up = [pathPoints[0]];
            const down = [pathPoints[0]];

            for (let i = 1; i < pathPoints.length; i++) {
                const pt = pathPoints[i];
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

const bezierCommand = (i, pathPoints, config) => {
    const point = pathPoints[i];
    const cps = controlPoint(pathPoints[i - 1], pathPoints[i - 2], point, false, config);
    const cpe = controlPoint(point, pathPoints[i - 1], pathPoints[i + 1], true, config);
    return `C ${cps.x},${cps.y} ${cpe.x},${cpe.y} ${point.x},${point.y}`;
};
const controlPoint = (current, previous, next, reverse, config) => {
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
const line = (pointA, pointB) => {
    const lengthX = pointB.x - pointA.x;
    const lengthY = pointB.y - pointA.y;
    return {
        length: Math.sqrt(Math.pow(lengthX, 2) + Math.pow(lengthY, 2)),
        angle: Math.atan2(lengthY, lengthX)
    };
};
const mapPoint = (value, inMin, inMax, outMin, outMax) => (value - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;