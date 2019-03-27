<template>
    <v-app id="app" light>
        <v-content>
            <transition name="slide-fade" mode="out-in">
                <router-view></router-view>
            </transition>
            <connect-to-continue-dialog v-if="dialogs[Dial.CONNECT_TO_CONTINUE].visible"/>
            <snack :snack="snack" v-if="snack.visible"/>
            <logged-in class="top-right"/>
        </v-content>
    </v-app>
</template>

<script>
    import {Dial} from "../const/dial"

    const ConnectToContinueDialog = () => import(/* webpackChunkName: "CTCDialog"*/ "./dialog/ConnectToContinueDialog")
    const Snack = () => import(/* webpackChunkName: "Snack"*/ "./dialog/Snack")
    const LoggedIn = () => import(/* webpackChunkName: "LoggedIn"*/ "./user/LoggedIn")

    import {mapState} from "vuex"
    import On from "../const/on"

    export default {
        data: () => ({Dial}),
        components: {
            LoggedIn,
            Snack,
            ConnectToContinueDialog
        },
        computed: {
            ...mapState(["dialogs", "snack"])
        },
        mounted: async function () {
            await this.$store.dispatch(On.MOUNT_APP)
        }
    }
</script>