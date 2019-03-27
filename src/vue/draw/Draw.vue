<template>
    <div>
        <surface v-if="activeFilm" :film="activeFilm" :pen="activePen"/>
        <bar v-if="activeFilm" :film="activeFilm" class="noselect"/>
    </div>
</template>

<script>
    import {mapState} from "vuex"
    import Surface from "./Surface"
    import Bar from "./Bar"


    export default {
        name: "Draw",
        components: {Bar, Surface},
        computed: {
            ...mapState(["activeFilm", "activePen"])
        }
    }
</script>

<style scoped>

</style>