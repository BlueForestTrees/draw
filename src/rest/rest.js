import Vue from 'vue'
import VueRessource from 'vue-resource'
import root from 'window-or-global'
import {X_ACCESS_TOKEN, X_REQUEST_ID} from "../const/headers"
import state from '../vuex/state/state'
import {isNil} from "../util/util"

Vue.use(VueRessource)

Vue.http.options.root = root.location ? root.location.origin : 'tests/'

/**
 *
 * @param param => '_ids'
 * @param values => [1,2,3]
 * @returns "_ids=1&_ids=2&_ids=3"
 */
export const arrayOf = (param, values) => {
    const arr = []
    for (let i = 0; i < values.length; i++) {
        arr.push(`${param}=${encodeURIComponent(values[i])}`)
    }
    return arr.join("&")
}

export const paramsOf = params => {
    const keys = Object.keys(params)
    const arr = []
    for (let i = 0; i < keys.length; i++) {
        const rawValue = params[keys[i]]
        if (!isNil(rawValue)) {
            arr.push(Array.isArray(rawValue) ? arrayOf(keys[i], rawValue) : `${keys[i]}=${encodeURIComponent(rawValue)}`)
        }
    }
    return arr.length > 0 ? "?" + arr.join("&") : ""
}

const token = () => state.token && {[X_ACCESS_TOKEN]: state.token} || {}
const xRequestId = () => state.xRequestId && {[X_REQUEST_ID]: state.xRequestId} || {}

export const get = async (url, reqOpts) => (await Vue.http.get(url, {json: true, headers: {...xRequestId()}, ...reqOpts})).body
export const del = (url, reqOpts) => Vue.http.delete(url, {json: true, headers: {...token(), ...xRequestId()}, ...reqOpts})
export const post = (url, body, reqOpts) => Vue.http.post(url, body, {json: true, headers: {...token(), ...xRequestId()}, ...reqOpts})
export const put = (url, body, reqOpts) => Vue.http.put(url, body, {json: true, headers: {...token(), ...xRequestId()}, ...reqOpts})

