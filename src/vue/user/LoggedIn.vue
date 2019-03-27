<template>
    <v-menu v-if="user">
        <v-avatar slot="activator" class="elevation-3 ma-2" size="32px" :style="{backgroundColor:user.color}">
            <span :style="{color:overcolor(user.color)}">{{initiales(user.fullname)}}</span>
        </v-avatar>

        <v-list>
            <v-list-tile @click="goto(GO.USER)">
                <user-icon :user="user"/>
                <v-list-tile-content>
                    <v-list-tile-title>{{user.fullname}}</v-list-tile-title>
                    <v-list-tile-sub-title>{{user.mail}}</v-list-tile-sub-title>
                </v-list-tile-content>
            </v-list-tile>

            <v-list-tile @click="logout">
                <v-list-tile-avatar>
                    <v-icon>power_off</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-content>Déconnexion</v-list-tile-content>
            </v-list-tile>
        </v-list>
    </v-menu>
    <v-menu v-else>
        <v-btn slot="activator" icon dense>
            <v-icon>person</v-icon>
        </v-btn>
        <login-suscribe-list style="width: 17em"/>
    </v-menu>
</template>

<script>
    import {mapActions, mapState} from "vuex"
    import On from "../../const/on"
    import {initiales, overcolor} from "../../util/util"
    import {GO} from "../../const/go"
    import UserIcon from "./UserIcon"
    import LoginSuscribeList from "./LoginSuscribeList"

    export default {
        name: "logged-in",
        data: () => ({GO}),
        components: {LoginSuscribeList, UserIcon},
        computed: {
            ...mapState(['user'])
        },
        methods: {
            overcolor, initiales,
            ...mapActions({logout: On.LOGOUT, goto: On.GO_TO})
        }
    }
</script>