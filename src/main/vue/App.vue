<template>
    <v-app id="app" light>
        <palette v-if="activeFilm" :film="activeFilm"/>
        <v-content v-if="activeFilm">
            <v-container fluid fill-height>
                <v-layout align-center justify-center>
                    <v-flex style="height:900px">
                        <v-card class="elevation-12" style="height:900px">
                            <surface :film="activeFilm" :pen="activePen"/>
                            <player :film="activeFilm"/>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
    import Surface from "./surface/Surface";
    import Player from "./player/Player";
    import {mapState} from "vuex";
    import On from "../const/on";
    import Palette from "./menu/Palette";

    export default {
        components: {
            Palette,
            Player,
            Surface
        },
        computed: {
            ...mapState(["activeFilm", "films", "activePen"])
        },
        mounted: async function () {
            await this.$store.dispatch(On.MOUNT_APP);
        }
    }
</script>