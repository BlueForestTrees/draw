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
        <v-btn flat icon @click="openFilmDialog"><v-icon>share</v-icon></v-btn>
        <film-dialog/>
    </span>
</template>
<script>
    import Do from "../../const/do";
    import {mapActions, mapGetters, mapMutations, mapState} from "vuex";
    import FilmDialog from "../menu/RawEditFilmDialog";
    import On from "../../const/on";

    export default {
        name: 'film',
        components: {FilmDialog},
        props: ['films', 'film'],
        computed: {
            ...mapGetters(['totalSec']),
            ...mapState(['nav'])
        },
        methods: {
            ...mapActions({
                addNewFilm: On.ACTIVATE_NEW_FILM,
            }),
            ...mapMutations({
                selectFilm: Do.SELECT_FILM,
                clearFilm: Do.CLEAR_FILM,
            }),
            openFilmDialog: function () {
                this.nav.filmDialogVisible = true;
                this.nav.rawFilm = JSON.stringify(this.film, null, 4);
            }
        }
    }
</script>