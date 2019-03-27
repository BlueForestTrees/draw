import On from "../../const/on"
import Do from "../../const/do"
import {snack} from "../state/snackState"

const mapValidationErrors = ({message, errors}) =>
    `${message}. "${Object.values(errors)
        .map(err => `${err.param} ${err.msg}`)
        .join("; ")}"`

const toSnack = ex =>
    ex.status === 404 && {text: "L'élément n'a pas été trouvé. Il n'existe pas ou il est en préparation.", color: "orange"}
    ||
    ex.status === 403 && {text: "Interdit: cet élément n'est pas à vous.", icon: "pan_tool", color: "orange"}
    ||
    ex.status === 401 && {text: "Connectez-vous pour faire cette action.", icon: "power_off", color: "orange", action: On.GO_LOGIN}
    ||
    ex.status >= 500 && {text: "Oups nous avons une erreur de fonctionnement. Rééssayez plus tard, rapportez le bug si cela persiste ou vous embête.", icon: "bug_report", action: On.GO_CHAT_BUG}
    ||
    ex.status && ex.body && ex.body.errorCode === 2 && {text: mapValidationErrors(ex.body)}
    ||
    ex.status && ex.body && ex.body.errorCode && {text: ex.body.message}
    ||
    ex.statusText && {text: ex.statusText}
    ||
    ex && {text: ex}
    ||
    {text: "Erreur indéfinie."}

export default {
    [On.SNACKBAR]: ({commit}, snackOptions) => {
        if (snackOptions.color !== "green") {
            snackOptions.timeout = 0
        }
        commit(Do.UPDATE_SNACKBAR, Object.assign(snack(), {visible: true, ...snackOptions}))
    },
    [On.SNACKERROR]: ({dispatch}, ex) => dispatch(On.SNACKBAR, {multiline: true, color: "orange", ...toSnack(ex)})
}