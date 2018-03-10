export default {
    activeMode: state => state.modes[state.activeFilm.config.activeModeIdx],
    selection: state => state.activeFilm.selection.element,
    noSelection: (state, getters) => !getters.selection
}