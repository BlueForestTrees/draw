import req from 'request-promise-lite';

const baseUrl = window.location ? window.location.href : 'tests/';
const url = (path) => baseUrl + path;
const options = (body) => ({body: body, json: true});

export const get = (path) => req.get(url(path), options());
export const post = (path, body) => req.post(url(path), options(body));
export const del = (path) => req.del(url(path));
export const put = (path, body) => req.put(url(path), options(body));