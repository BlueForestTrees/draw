<template>
    <v-list>
        <v-list-tile>
            <v-list-tile-avatar size="64px" style="padding-right: 1em">
                <v-avatar size="64px"><img style="width: 64px;height:64px" src="/img/logo-rond.svg" alt="BlueForest"></v-avatar>
            </v-list-tile-avatar>
            <v-list-tile-content>
                <v-list-tile-title>{{(user && user.fullname) || "Visiteur"}}</v-list-tile-title>
                <v-list-tile-sub-title>{{(user && "Contrôle d'accès") || "non connecté"}}</v-list-tile-sub-title>
            </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
            <v-btn outline block class="elevation-0" @click="connect">Connexion</v-btn>
        </v-list-tile>
        <v-list-tile>
            <v-btn outline block class="elevation-0" @click="suscribe">Inscription</v-btn>
        </v-list-tile>
    </v-list>
</template>

<script>
    import {GO} from "../../const/go"
    import {mapState} from "vuex"

    export default {
        name: "login-suscribe-list",
        computed: {
            ...mapState({user: s => s.user, userStatus: s => s.userStatus})
        },
        methods: {
            suscribe: function () {
                this.$router.push({name: GO.SUSCRIBE})
                this.$emit("close")
            },
            connect: function () {
                this.$router.push({name: GO.LOGIN})
                this.$emit("close")
            },
        }
    }
</script>