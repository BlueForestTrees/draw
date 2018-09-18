<template>
    <v-container>
        <v-layout row>
            <v-btn flat icon @click="nav.filmListDialogVisible = true"><v-icon>folder_open</v-icon></v-btn>
            <v-btn flat icon @click="addNewFilm"><v-icon>add_box</v-icon></v-btn>
            <v-btn flat icon @click="openFilmDialog"><v-icon>share</v-icon></v-btn>
            <v-btn flat icon @click="deleteFilm(film)"><v-icon>delete_forever</v-icon></v-btn>
        </v-layout>

        <v-layout row>
            <v-text-field :value="film.f.name" @input="newName = $event"/>
            <v-btn flat icon @click="save(film)"><v-icon>save</v-icon></v-btn>
        </v-layout>
    </v-container>
</template>
<script>
    import Do from "../../const/do";
    import {mapActions, mapGetters, mapMutations, mapState} from "vuex";
    import FilmDialog from "../menu/RawEditFilmDialog";
    import On, {SAVE_FILM_AS} from "../../const/on";
    import FilmListDialog from "../menu/FilmsListDialog"

    export default {
        name: 'film',
        components: {FilmListDialog, FilmDialog},
        props: ['films'],
        data: function () {
            return {
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
            },
            ...mapActions({
                addNewFilm: On.ACTIVATE_NEW_FILM,
                deleteFilm: On.DELETE_FILM,
                saveAs: On.SAVE_FILM_AS
            }),
            ...mapMutations({
                addFilm: Do.ADD_FILM,
                updateDuration: Do.UPDATE_DURATION
            }),
            openFilmDialog: function () {
                this.nav.rawEditFilmDialogVisible = true;
            }
        }
    }
</script>