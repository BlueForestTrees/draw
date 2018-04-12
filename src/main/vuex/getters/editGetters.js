export default {
    activeMode: state => state.modes[state.activeFilm.f.config.activeModeIdx],
    modeIs: (state, getters) => mode => getters.activeMode.name === mode,
    selection: state => state.activeFilm.f.selection.element,
    noSelection: (state, getters) => !getters.selection
}