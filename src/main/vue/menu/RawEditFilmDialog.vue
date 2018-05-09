<template>
    <v-dialog
            v-model="nav.rawEditFilmDialogVisible"
            fullscreen
            transition="dialog-bottom-transition"
            :overlay="false"
            scrollable
    >
        <v-card tile>
            <v-toolbar card dark color="primary">
                <v-btn dark flat @click.native="importFilm">Import Json Film</v-btn>
                <v-btn dark flat @click.native="exportFilm">Export Json Film</v-btn>
                <v-btn dark flat @click.native="exportHtml">Export Html Example</v-btn>
                <v-toolbar-title>Raw Edit Film</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                    <v-btn icon @click.native="nav.rawEditFilmDialogVisible = false" dark>
                        <v-icon>close</v-icon>
                    </v-btn>
                </v-toolbar-items>
            </v-toolbar>
            <v-card-text>
                <v-text-field auto-grow multi-line v-model="dialogContent"/>
            </v-card-text>

            <div style="flex: 1 1 auto;"></div>
        </v-card>
    </v-dialog>
</template>
<script>
    import {mapActions, mapState} from "vuex";
    import On from "../../const/on";
    import {filmTemplate} from "../../const/template";

    const filmAsString = film => {
        const temp = film.f.ftz;
        film.f.ftz = 0;
        const filmString = JSON.stringify(film);
        film.f.ftz = temp;
        return filmString;
    };

    export default {
        name: "film-dialog",
        props: ['film'],
        computed: {
            ...mapState(['nav'])
        },
        data: function () {
            return {
                dialogContent: null
            }
        },
        methods: {
            ...mapActions({dispatchUpdateFilm: On.UPDATE_FILM}),
            importFilm: function () {
                try {
                    this.dispatchUpdateFilm(this.dialogContent);
                    this.nav.rawEditFilmDialogVisible = false;
                } catch (e) {
                    console.error(e);
                }
            },
            exportFilm: function () {
                this.dialogContent = filmAsString(this.film);
            },
            exportHtml: function () {
                this.dialogContent = filmTemplate.replace("filmContentHere", filmAsString(this.film));
            }
        }
    }
</script>