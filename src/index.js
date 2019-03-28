import Vue from 'vue'
import App from './vue/App'
import Vuetify from 'vuetify'
import store from "./vuex/store"
import router from "./vrouter/router"
import css from './css/style.css'

Vue.config.productionTip = false
Vue.use(Vuetify)





new Vue({
    el: '#app',
    router,
    store,
    components: {App},
    template: '<App/>'
})