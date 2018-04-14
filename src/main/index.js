import Vue from 'vue';
import App from './vue/App'
import './css/style.css';

import Vuetify from 'vuetify'
import store from "./vuex/store";
Vue.config.productionTip = false;


Vue.use(Vuetify);

new Vue({
    el: '#app',
    store,
    components: {App},
    template: '<App/>'
});