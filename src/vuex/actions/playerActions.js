import On from "../../const/on"
import Do from "../../const/do"

const getRandomColor = () => {
    const letters = '0123456789ABCDEF'
    let color = '#'
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
    }
    return color
}

export default {
    [On.PLAY]: ({commit, state, getters}, film) => {
        commit(Do.UNSELECT_ELEMENT, film)
        commit(Do.PLAY, film)
    },
    [On.TOGGLE_PLAY]: ({dispatch, commit, state, getters}, film) => {
        if (film.f.player.playing) {
            commit(Do.PAUSE, film)
        } else {
            dispatch(On.PLAY, film)
        }
    },
    [On.RENEW_COLORS]: ({state, commit}) => {
        const cs = []
        for (let x = 0; x < state.colorPanel.cols; x++) {
            cs.push([])
            for (let y = 0; y < state.colorPanel.rows; y++) {
                cs[x].push(getRandomColor())
            }
        }
        commit(Do.SET_COLORS, cs)
    }
}
