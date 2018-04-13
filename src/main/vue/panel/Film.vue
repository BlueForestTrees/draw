<template>
    <span>
        <v-layout row align-center>
            <v-select :items="films" v-model="film" item-text="f.name" prepend-icon="map" :hint="`${film.f.name} - ${film.f.imageCount}i`" @change="selectFilm"></v-select>
            <v-btn flat icon @click="addNewFilm">
                <v-icon>add_box</v-icon>
            </v-btn>
            <v-btn flat icon @click="clearFilm(film)">
                <v-icon>delete</v-icon>
            </v-btn>
        </v-layout>
        <v-layout row>
            <v-icon>directions_run</v-icon>
            <v-flex dense>{{totalSec}}s</v-flex>
            <v-slider v-model="film.f.config.durationCoef" min="0.25" step="0.05" max="4"/>
        </v-layout>
        <v-switch label="Phantom" v-model="film.f.config.showPhantom"/>
    </span>
</template>
<script>
    import Do from "../../const/do";
    import {mapGetters, mapMutations} from "vuex";

    export default {
        name: 'film',
        props: ['films', 'film'],
        computed: {
            ...mapGetters(['totalSec']),
        },
        methods: {
            ...mapMutations({
                selectFilm: Do.SELECT_FILM,
                addNewFilm: Do.ACTIVATE_NEW_FILM,
                clearFilm: Do.CLEAR_FILM,
            })
        }
    }
</script>