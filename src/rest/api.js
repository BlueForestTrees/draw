import {del, get, post} from './rest'
import {X_ACCESS_TOKEN} from "../const/headers"

export const getFilms = () => get(`api/film/all`)
export const getFilm = _id => get(`api/film/_id/${_id}`)
export const deleteFilm = _id => del(`api/film/${_id}`)
export const saveFilm = film => post('api/film', {film})


export const getUser = _id => get(`/api/user/${_id}`)
export const updateUser = user => put(`/api/user`, user)
export const postSuscription = ({mail}) => post(`/api/user/suscribe`, {mail})
export const postConfirm = async ({token, fullname, password}) => {
    const res = await post(`/api/user/confirm`, {t: token, fullname, password})
    return {token: res.headers.map[X_ACCESS_TOKEN][0]}
}
export const postAuth = async ({mail, password}) => {
    const res = await post(`/api/user/login`, {mail, password})
    return {token: res.headers.map[X_ACCESS_TOKEN][0]}
}