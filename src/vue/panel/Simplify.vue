<template>
    <v-container>
        <v-switch label="Aperçu" v-model="film.f.config.simplify"/>
        <v-select :disabled="!film.f.config.simplify" :items="['visvalingam','ramer']" v-model="film.f.config.simpleMode" label="Algo" class="input-group--focused"></v-select>
        <v-slider :disabled="!film.f.config.simplify" v-model="film.f.config.simpleCoef" label="coef" min="1" step="1" max="200" thumb-label/>
        <v-layout row>
            <v-spacer/>
            <v-btn :disabled="!film.f.config.simplify" @click="applySimplification(film)">APPLIQUER</v-btn>
        </v-layout>
    </v-container>
</template>
<script>
    import {mapMutations} from "vuex"
    import Do from "../../const/do"

    export default {
        name: "simplify",
        props: ['film'],
        methods: {
            ...mapMutations({
                applySimplification: Do.APPLY_SIMPLIFICATION
            })
        }
    }
</script>