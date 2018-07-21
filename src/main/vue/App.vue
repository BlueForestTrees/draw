<template>
    <span>
    <svg viewbox="-50 -50 100 100">
        <circle cx="0" cy="0" r="40" stroke="black" stroke-width="3" fill="red" />
    </svg>
    <v-app id="app" light>
        <v-content v-if="activeFilm">
            <v-container fluid fill-height>
                <v-layout row class="elevation-8">
                    <palette :film="activeFilm" class="noselect" />
                    <v-layout align-center justify-center>
                        <v-flex>
                            <v-card>
                                <surface :film="activeFilm" :pen="activePen"/>
                                <player :film="activeFilm" class="noselect"/>
                            </v-card>
                        </v-flex>
                    </v-layout>
                </v-layout>
            </v-container>
        </v-content>
    </v-app>
    </span>
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