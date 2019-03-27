import Vue from 'vue';
import App from './vue/App'
import './css/style.css';
import Vue2TouchEvents from 'vue2-touch-events'

import Vuetify from 'vuetify'
import store from "./vuex/store";
import router from "./vrouter/router"

Vue.use(Vue2TouchEvents);
Vue.use(Vuetify);

new Vue({
    el: '#app',
    router,
    store,
    components: {App},
    template: '<App/>'
});