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


    import {mapState} from "vuex"
    import On from "../const/on"
    import LoggedIn from "./user/LoggedIn"
    import Snack from "./dialog/Snack"
    import ConnectToContinueDialog from "./dialog/ConnectToContinueDialog"

    export default {
        data: () => ({Dial}),
        components: {
            ConnectToContinueDialog,
            Snack,
            LoggedIn
        },
        computed: {
            ...mapState(["dialogs", "snack"])
        },
        mounted: async function () {
            await this.$store.dispatch(On.MOUNT_APP)
        }
    }
</script>