import Do from "../../const/do"

export default {
    [Do.UPDATE_SNACKBAR]: (state, snack) => {
        state.snack = snack
    }
}