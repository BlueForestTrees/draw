export default {
    activeMode: state => state.modes[state.activeFilm.f.config.activeModeIdx],
    modeIs: mode => (state, getters) => getters.activeMode === mode,
    selection: state => state.activeFilm.f.selection.element,
    noSelection: (state, getters) => !getters.selection
}