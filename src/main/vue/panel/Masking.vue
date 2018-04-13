<template>
    <v-layout row align-center>
        <v-btn flat icon @click="maskConvert({ei:selection, film})" :disabled="noSelection">
            <v-icon>group_work</v-icon>
        </v-btn>
        <v-btn-toggle v-model="film.f.config.activeMaskIdx">
            <v-btn flat v-for="(mask, id) in film.f.masks" :key="id">M{{id}}</v-btn>
        </v-btn-toggle>
    </v-layout>
</template>
<script>
    import {mapActions} from 'vuex';
    import On from "../../const/on";
    export default{
        name:"masking",
        props:['film','selection','noSelection'],
        methods:{
            ...mapActions({
                maskConvert: On.MASK_CONVERT
            })
        }
    }
</script>