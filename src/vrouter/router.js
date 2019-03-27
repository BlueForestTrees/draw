import {GO} from "../const/go"
import Vue from 'vue'
import VueRouter from 'vue-router'

const NotFound = () => import(/* webpackChunkName: "Confirmation" */ '../vue/dialog/NotFound')
const Draw = () => import(/* webpackChunkName: "Confirmation" */ '../vue/draw/Draw')
const Confirmation = () => import(/* webpackChunkName: "Confirmation" */ '../vue/user/Confirmation')
const Inscription = () => import(/* webpackChunkName: "Inscription" */ '../vue/user/Inscription')
const Login = () => import(/* webpackChunkName: "Login" */ '../vue/user/Login')

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