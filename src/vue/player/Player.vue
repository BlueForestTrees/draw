<template>
    <v-toolbar extended dense class="player">

        <v-toolbar-items>
            <v-icon @click="rewind(film)">skip_previous</v-icon>
            <v-icon @click="prev(film)">fast_rewind</v-icon>
            <v-icon v-if="film.f.player.playing" @click="pause(film)">pause</v-icon>
            <v-icon v-else @click="play(film)" :disabled="film.f.imageCount === 0">play_arrow</v-icon>
            <v-icon @click="next(film)">fast_forward</v-icon>
            <span class="airText">{{`${currentSec}/${totalSec}s`}}</span>
        </v-toolbar-items>

        <v-slider class="slider" v-model="film.f.ftz" step="1" :min="film.f.start" :max="film.f.imageCount" thumb-label/>

        <v-toolbar-items>
            <span class="airText">{{`${film.f.ftz - film.f.start}/${film.f.imageCount}`}}</span>
            <v-btn icon @click="keep(film)">
                <v-icon>system_update_alt</v-icon>
            </v-btn>
            <v-btn icon @click="unkeep(film)">
                <v-icon>exit_to_app</v-icon>
            </v-btn>
        </v-toolbar-items>

        <div slot="extension">
            <v-layout row align-center>

                <v-menu open-on-hover top offset-y :close-on-content-click="false">
                    <v-btn slot="activator" flat icon><v-icon>folder_open</v-icon></v-btn>
                    <v-card>
                        <v-toolbar class="elevation-0">Films</v-toolbar>
                        <film :film="film" :films="films"/>
                    </v-card>
                </v-menu>

                <v-btn-toggle mandatory v-model="film.f.config.activeModeIdx">
                    <v-btn flat v-for="panel in panels" :key="panel.name">
                        <v-icon>{{panel.icon}}</v-icon>
                    </v-btn>
                </v-btn-toggle>

                <v-btn flat icon @click="clearFilm(film)">
                    <v-icon>delete</v-icon>
                </v-btn>
                <v-btn-toggle v-model="phantom">
                    <v-btn flat>
                        <v-icon>fingerprint</v-icon>
                    </v-btn>
                </v-btn-toggle>

                <v-menu open-on-hover top offset-y>
                    <v-btn slot="activator" flat icon><v-icon>directions_run</v-icon></v-btn>
                    <v-list>
                        <v-list-tile>
                            {{`${totalSec}s`}}
                            <v-slider v-model="film.f.config.durationCoef" min="0.01" step="0.01" max="10" />
                        </v-list-tile>
                    </v-list>
                </v-menu>

                <v-menu open-on-hover top offset-y>
                    <v-btn slot="activator" flat icon><v-icon>content_cut</v-icon></v-btn>
                    <v-list>
                        <v-list-tile>
                            <v-btn @click="cutStart(film)"><v-icon>content_cut</v-icon><v-icon>trending_flat</v-icon></v-btn>
                            <v-btn @click="cutEnd(film)"><v-icon>trending_flat</v-icon><v-icon>content_cut</v-icon></v-btn>
                        </v-list-tile>
                    </v-list>
                </v-menu>
            </v-layout>
        </div>

        <film-dialog :film="film"/>
        <film-list-dialog :film="film"/>
    </v-toolbar>
</template>

<script>

    import Do from "../../const/do"
    import {mapActions, mapGetters, mapMutations, mapState} from 'vuex'
    import On from "../../const/on"
    import Film from "../panel/Film"
    import FilmDialog from "../menu/RawEditFilmDialog"
    import FilmListDialog from "../menu/FilmsListDialog"

    export default {
        name: 'player',
        components: {FilmListDialog, FilmDialog, Film},
        props: ['film'],
        data() {
            return {phantom: null}
        },
        computed: {
            ...mapState(['nav', 'panels', 'films']),
            ...mapGetters(['currentSec', 'totalSec'])
        },
        methods: {
            ...mapMutations({
                rewind: Do.REWIND,
                prev: Do.PREV,
                next: Do.NEXT,
                keep: Do.KEEP,
                unkeep: Do.UNKEEP,
                pause: Do.PAUSE,
                clearFilm: Do.CLEAR_FILM,
                cutEnd: Do.CUT_END,
                cutStart: Do.CUT_START
            }),
            ...mapActions({
                play: On.PLAY
            })
        },
        watch: {
            phantom(v) {
                this.film.f.config.showPhantom = v === 0
            }
        }
    }
</script>