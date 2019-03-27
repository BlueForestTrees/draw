<template>
    <div>
        <surface v-if="activeFilm" :film="activeFilm" :pen="activePen"/>
        <bar v-if="activeFilm" :film="activeFilm" class="noselect"/>
    </div>
</template>

<script>
    import {mapState, mapActions} from "vuex"
    import On from "../../const/on"

    const Surface = () => import(/* webpackChunkName: "Surface"*/ "./Surface")
    const Bar = () => import(/* webpackChunkName: "Bar"*/ "./Bar")

    export default {
        name: "Draw",
        components: {Bar, Surface},
        computed: {
            ...mapState(["activeFilm", "activePen"])
        },
        methods:{
            ...mapActions({checkAuth: On.CHECK_AUTH})
        },
        created(){
            this.checkAuth()
        }
    }
</script>

<style scoped>

</style>