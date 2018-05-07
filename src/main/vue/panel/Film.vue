<template>
    <span>
        <v-layout row align-center>
            <v-select :items="films" item-text="f.name" prepend-icon="map" :hint="`${film.f.name} - ${film.f.imageCount}i`" v-model="currentFilm"></v-select>
        </v-layout>
        <v-layout row>
            <v-btn flat icon @click="addNewFilm"><v-icon>add_box</v-icon></v-btn>
            <v-btn flat icon @click="openFilmDialog"><v-icon>share</v-icon></v-btn>
            <v-btn flat icon @click="clearFilm(film)"><v-icon>delete</v-icon></v-btn>
            <v-btn flat icon @click="deleteFilm(film)"><v-icon>delete_forever</v-icon></v-btn>
            <v-btn flat icon @click="saveFilm(film)"><v-icon>send</v-icon></v-btn>
        </v-layout>

        <v-layout row>
            <v-icon>directions_run</v-icon>
            <v-slider v-model="film.f.config.durationCoef" min="0.01" step="0.01" max="10"/>
        </v-layout>
        <v-switch label="Phantom" v-model="film.f.config.showPhantom"/>

        <v-btn><v-icon>content_cut</v-icon><v-icon>trending_flat</v-icon></v-btn>
        <v-btn><v-icon>trending_flat</v-icon><v-icon>content_cut</v-icon></v-btn>

        <film-dialog :film="film"/>
    </span>
</template>
<script>
    import Do from "../../const/do";
    import {mapActions, mapGetters, mapMutations, mapState} from "vuex";
    import FilmDialog from "../menu/RawEditFilmDialog";
    import On from "../../const/on";
    import {saveFilm} from "../../rest/api";

    export default {
        name: 'film',
        components: {FilmDialog},
        props: ['films', 'film'],
        computed: {
            ...mapGetters(['totalSec']),
            ...mapState(['nav']),
            total: function () {
                return this.totalSec + "s";
            },
            currentFilm:{
                get:function(){
                    return this.film;
                },
                set:function(v){
                    this.selectFilm(v);
                }
            }
        },
        methods: {
            saveFilm,
            ...mapActions({
                addNewFilm: On.ACTIVATE_NEW_FILM,
                selectFilm: On.LOAD_FILM,
                deleteFilm: On.DELETE_FILM,
            }),
            ...mapMutations({
                clearFilm: Do.CLEAR_FILM,
                updateDuration: Do.UPDATE_DURATION
            }),
            openFilmDialog: function () {
                this.nav.filmDialogVisible = true;
            }
        }
    }
</script>