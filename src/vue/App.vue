<template>
    <v-app id="app" light>
        <v-content>
            <surface v-if="activeFilm" :film="activeFilm" :pen="activePen"/>
            <bar v-if="activeFilm" :film="activeFilm" class="noselect"/>
        </v-content>
    </v-app>
</template>

<script>
    const Surface = () => import(/* webpackChunkName: "Surface"*/ "./Surface")
    const Bar = () => import(/* webpackChunkName: "Bar"*/ "./Bar")

    import {mapState} from "vuex"
    import On from "../const/on"

    export default {
        components: {
            Surface, Bar
        },
        computed: {
            ...mapState(["activeFilm", "films", "activePen"])
        },
        mounted: async function () {
            await this.$store.dispatch(On.MOUNT_APP)
        }
    }
</script>