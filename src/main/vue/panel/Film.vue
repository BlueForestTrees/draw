<template>
    <span>
        <v-layout row align-center>
            <v-select
                    prepend-icon="map" item-text="f.name"
                    :items="films" :value="film" :hint="`${film.f.name} - ${film.f.imageCount}i`"
                    @change="selectFilm"
            />
        </v-layout>
        <v-layout row>
            <v-btn flat icon @click="addNewFilm"><v-icon>add_box</v-icon></v-btn>
            <v-btn flat icon @click="openFilmDialog"><v-icon>share</v-icon></v-btn>
            <v-btn flat icon @click="clearFilm(film)"><v-icon>delete</v-icon></v-btn>
            <v-btn flat icon @click="deleteFilm(film)"><v-icon>delete_forever</v-icon></v-btn>
            <v-btn flat icon @click="toggleSaving"><v-icon>send</v-icon></v-btn>
        </v-layout>

        <v-layout row v-if="saving">
            <v-text-field :value="film.f.name" @input="newName = $event"/>
            <v-btn flat icon @click="save(film)"><v-icon>send</v-icon></v-btn>
        </v-layout>

        <v-layout row>
            <v-icon>directions_run</v-icon>
            <v-slider v-model="film.f.config.durationCoef" min="0.01" step="0.01" max="10"/>
        </v-layout>

        <v-switch label="Phantom" v-model="film.f.config.showPhantom"/>

        <v-btn><v-icon>content_cut</v-icon><v-icon>trending_flat</v-icon></v-btn>
        <v-btn @click="cutEnd(film)"><v-icon>trending_flat</v-icon><v-icon>content_cut</v-icon></v-btn>

        <film-dialog :film="film"/>
    </span>
</template>
<script>
    import Do from "../../const/do";
    import {mapActions, mapGetters, mapMutations, mapState} from "vuex";
    import FilmDialog from "../menu/RawEditFilmDialog";
    import On, {SAVE_FILM_AS} from "../../const/on";

    export default {
        name: 'film',
        components: {FilmDialog},
        props: ['films'],
        data: function () {
            return {
                saving: false,
                newName: null
            }
        },
        computed: {
            ...mapGetters(['totalSec']),
            ...mapState({
                nav: state => state.nav,
                film: state => state.activeFilm
            }),
            total: function () {
                return this.totalSec + "s";
            }
        },
        methods: {
            save: async function () {
                await this.saveAs({film: this.film, name: this.newName});
                this.newName = null;
                this.saving = false;
            },
            toggleSaving: function () {
                this.saving = !this.saving;
                if (!this.saving) {
                    this.newName = null;
                }
            },
            ...mapActions({
                addNewFilm: On.ACTIVATE_NEW_FILM,
                selectFilm: On.LOAD_FILM,
                deleteFilm: On.DELETE_FILM,
                saveAs: On.SAVE_FILM_AS
            }),
            ...mapMutations({
                addFilm: Do.ADD_FILM,
                clearFilm: Do.CLEAR_FILM,
                updateDuration: Do.UPDATE_DURATION,
                cutEnd: Do.CUT_END
            }),
            openFilmDialog: function () {
                this.nav.rawEditFilmDialogVisible = true;
            }
        }
    }
</script>