import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations';
import state from './state';
import getters from './getters';
import appActions from "./actions/appActions";


Vue.use(Vuex);

const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions: {
        ...appActions,
    }
});

export default store;