<template>
    <v-app id="app" light>
        <v-content>
            <surface v-if="activeFilm" :film="activeFilm" :pen="activePen"/>
            <bar v-if="activeFilm" :film="activeFilm" class="noselect"/>
        </v-content>
    </v-app>
</template>

<script>
    import Surface from "./Surface"
    import Bar from "./Bar"
    import {mapState} from "vuex"
    import On from "../const/on"

    export default {
        components: {
            Bar,
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