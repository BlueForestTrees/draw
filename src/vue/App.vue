<template>
    <v-app id="app" light>
        <palette v-if="activeFilm" :film="activeFilm" class="noselect palette"/>
        <v-content>
            <surface v-if="activeFilm" :film="activeFilm" :pen="activePen"/>
            <player v-if="activeFilm" :film="activeFilm" class="noselect"/>
        </v-content>
    </v-app>
</template>

<script>
    import Surface from "./surface/Surface"
    import Player from "./player/Player"
    import {mapState} from "vuex"
    import On from "../const/on"
    import Palette from "./menu/Palette"

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
            await this.$store.dispatch(On.MOUNT_APP)
        }
    }
</script>