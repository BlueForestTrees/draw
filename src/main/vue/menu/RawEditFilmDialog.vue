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
                <v-btn dark flat @click.native="updateFilm">Update</v-btn>
                <v-toolbar-title>Raw Edit Film</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                    <v-btn icon @click.native="nav.filmDialogVisible = false" dark>
                        <v-icon>close</v-icon>
                    </v-btn>
                </v-toolbar-items>
            </v-toolbar>
            <v-card-text>
                <v-text-field auto-grow multi-line v-model="nav.rawFilm" :value="nav.rawFilm"/>
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
        computed: {
            ...mapState(['nav'])
        },
        methods: {
            ...mapActions({dispatchUpdateFilm: On.UPDATE_FILM}),
            updateFilm: function () {
                try {
                    this.dispatchUpdateFilm(this.nav.rawFilm);
                    this.nav.filmDialogVisible = false;
                } catch (e) {
                    console.error(e);
                }
            }
        }
    }
</script>