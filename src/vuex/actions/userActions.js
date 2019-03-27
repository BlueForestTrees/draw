import On from "../../const/on"
import Do from "../../const/do"
import {postSuscription, postConfirm, getUser, updateUser, postAuth} from "../../rest/api"
import forage from "../../util/forage"
import {Dial} from "../../const/dial"

export default {

    [On.USER_FROM_STORAGE]: async ({commit}) => commit(Do.SET_TOKEN, await forage.getAccessToken()),

    [On.LOGOUT]: async ({commit}) => {
        forage.clearAccessToken()
        commit(Do.SET_TOKEN, null)
        commit(Do.SHOW_DIALOG, {dialog:Dial.CONNECT_TO_CONTINUE})
    },

    [On.WANT_SUSCRIBE]: ({}, {mail}) => postSuscription({mail}),

    [On.CONFIRM_SUSCRIBE]: async ({commit}, {token, fullname, password}) => postConfirm({token, fullname, password})
        .then(response => {
            saveToken(commit, response.token)
        }),

    [On.LOAD_USER]: ({}, oid) => oid ? getUser(oid) : null,

    [On.LOGIN]: async ({commit, dispatch}, {mail, password}) =>
        postAuth({mail, password})
            .then(response => {
                saveToken(commit, response.token)
                dispatch(On.CHECK_AUTH)
            }),


    [On.CHECK_AUTH]: ({state, commit}) => {
        if (!state.user) {
            commit(Do.SHOW_DIALOG, {dialog: Dial.CONNECT_TO_CONTINUE, data: {message: "Vous devez être connecté pour continuer."}})
            return false
        } else if (state.expire < Date.now().valueOf() / 1000) {
            commit(Do.SHOW_DIALOG, {dialog: Dial.CONNECT_TO_CONTINUE, data: {message: "Votre session a expiré."}})
            return false
        } else {
            commit(Do.UPDATE_DIALOG_VISIBILITY, {dialog: Dial.CONNECT_TO_CONTINUE, visible: false})
            return true
        }
    },

    [On.CHECK_ADMIN]: ({dispatch, commit, getters}) => {
        return dispatch(On.CHECK_AUTH).then(connected => {
            if (connected && getters.isAdmin) {
                return true
            } else {
                commit(Do.SHOW_DIALOG, {dialog: Dial.CONNECT_TO_CONTINUE, data: {message: "Accès réservé."}})
                return false
            }
        })
    },

    [On.CHECK_OWNERSHIP]: ({state}, tree) => {
        if (!state.user && state.user._id !== tree._id) {
            throw {code: "bf403"}
        }
    },

    [On.UPDATE_USER]: ({}, user) => updateUser(user)
}

const saveToken = (commit, token) => {
    forage.setAccessToken(token)
    commit(Do.SET_TOKEN, token)
}
