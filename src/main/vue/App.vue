<template>
    <v-app id="app" light>
        <left-menu v-if="activeFilm" :film="activeFilm"/>
        <v-content v-if="activeFilm">
            <v-container fluid fill-height>
                <v-layout align-center justify-center>
                    <v-flex style="height:900px">
                        <v-card class="elevation-12" style="height:900px">
                            <surface :film="activeFilm" @select=""/>
                            <player :film="activeFilm" />
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
    import Surface from "./Surface";
    import LeftMenu from "./LeftMenu";
    import Player from "./Player";
    import {mapState} from "vuex";
    import On from "../const/on";

    export default {
        components: {
            Player,
            LeftMenu,
            Surface
        },
        computed: {
            ...mapState(["activeFilm","films"])
        },
        mounted: async function () {
            await this.$store.dispatch(On.MOUNT_APP);
        }
    }
</script>