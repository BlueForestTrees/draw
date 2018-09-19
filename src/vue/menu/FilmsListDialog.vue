<template>
    <v-dialog v-model="nav.filmListDialogVisible" max-width="500">
        <v-toolbar>Ouvrir un film</v-toolbar>
        <v-card tile>
            <v-container>

                <v-layout row align-center>
                    <v-select
                            prepend-icon="folder_open" item-text="f.name"
                            :items="films" :value="film" :hint="`${film.f.name} - ${film.f.imageCount}i`"
                            @change="select" return-object
                    />
                </v-layout>
            </v-container>
        </v-card>
    </v-dialog>
</template>
<script>
    import {mapActions, mapState} from "vuex"
    import On from "../../const/on"

    export default {
        name: "film-list-dialog",
        props: ['film'],
        computed: {
            ...mapState(['nav','films'])
        },
        data: function () {
            return {
                dialogContent: null
            }
        },
        methods: {
            select(film){
                this.selectFilm(film)
                this.nav.filmListDialogVisible = false
            },
            ...mapActions({
                selectFilm: On.LOAD_FILM,
            }),
        }
    }
</script>