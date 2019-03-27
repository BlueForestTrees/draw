import {GO} from "../const/go"
import Vue from 'vue'
import VueRouter from 'vue-router'
import Draw from "../vue/draw/Draw"
import Login from "../vue/user/Login"
import Inscription from "../vue/user/Inscription"
import Confirmation from "../vue/user/Confirmation"
import NotFound from "../vue/dialog/NotFound"

Vue.use(VueRouter)

export default new VueRouter({
    mode: 'history',
    base: "/",
    routes: [
        {name: GO.DRAW, path: "/", component: Draw},
        {name: GO.LOGIN, path: "/login", component: Login},
        {name: GO.SUSCRIBE, path: "/suscribe", component: Inscription},
        {name: GO.CONFIRM, path: "/confirm/:token", component: Confirmation, props: true},
        {name: GO.NOT_FOUND, path: '/404', component: NotFound},
        {path: '*', redirect: '/404'},
    ]
})