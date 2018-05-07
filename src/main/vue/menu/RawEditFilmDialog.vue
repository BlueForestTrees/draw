<template>
    <v-dialog
            v-model="nav.filmDialogVisible"
            fullscreen
            transition="dialog-bottom-transition"
            :overlay="false"
            scrollable
    >
        <v-card tile>
            <v-toolbar card dark color="primary">
                <v-btn dark flat @click.native="importFilm">Import</v-btn>
                <v-btn dark flat @click.native="exportFilm">Export</v-btn>
                <v-toolbar-title>Raw Edit Film</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                    <v-btn icon @click.native="nav.filmDialogVisible = false" dark>
                        <v-icon>close</v-icon>
                    </v-btn>
                </v-toolbar-items>
            </v-toolbar>
            <v-card-text>
                <v-text-field auto-grow multi-line v-model="rawFilm"/>
            </v-card-text>

            <div style="flex: 1 1 auto;"></div>
        </v-card>
    </v-dialog>
</template>
<script>
    import {mapActions, mapState} from "vuex";
    import On from "../../const/on";

    export default {
        name: "film-dialog",
        props: ['film'],
        computed: {
            ...mapState(['nav'])
        },
        methods: {
            ...mapActions({dispatchUpdateFilm: On.UPDATE_FILM}),
            importFilm: function () {
                try {
                    this.dispatchUpdateFilm(this.rawFilm);
                    this.nav.filmDialogVisible = false;
                } catch (e) {
                    console.error(e);
                }
            },
            exportFilm: function () {
                const temp = this.film.f.ftz;
                this.film.f.ftz = 0;
                this.rawFilm = JSON.stringify(this.film, null, 4);
                this.film.f.ftz = temp;
            }
        },
        data:
            function () {
                return {
                    rawFilm: null
                }
            },
    }
</script>