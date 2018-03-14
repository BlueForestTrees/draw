export default {
    activeMode: state => state.modes[state.activeFilm.f.config.activeModeIdx],
    selection: state => state.activeFilm.f.selection.element,
    noSelection: (state, getters) => !getters.selection
}