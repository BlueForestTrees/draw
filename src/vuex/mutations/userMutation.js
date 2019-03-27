import Do from "../../const/do"
import decode from 'jwt-decode'

export default {
    [Do.SET_TOKEN]: (state, token) => {
        state.token = token
        if (token) {
            let decoded = decode(token)
            state.user = decoded.user
            state.expire = decoded.exp
            console.log("token expire dans", (state.expire - Date.now().valueOf() / 1000) / (3600*24), "j")
        } else {
            state.user = null
        }
    },
}