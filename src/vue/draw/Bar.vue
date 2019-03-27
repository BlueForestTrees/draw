<template>
    <v-toolbar extended dense class="player">

        <!--BAR 1-->
        <v-btn-toggle>
            <v-btn flat>
                <v-icon @click="clearFilm(film)">clear</v-icon>
            </v-btn>
        </v-btn-toggle>
        <!--FOLDER-->
        <v-menu top offset-y :close-on-content-click="false">
            <v-btn-toggle slot="activator">
                <v-btn flat>
                    <v-icon>folder_open</v-icon>
                </v-btn>
            </v-btn-toggle>
            <v-card>
                <v-toolbar class="elevation-0">Films</v-toolbar>
                <film :film="film" :films="films"/>
            </v-card>
        </v-menu>

        <!--MODES-->
        <v-btn-toggle mandatory v-model="film.f.config.activeModeIdx">
            <!--<v-menu  top offset-y :close-on-content-click="false">-->
            <!--<v-btn slot="activator" flat :key="modes.BRUSH">-->
            <!--<v-icon>brush</v-icon>-->
            <!--</v-btn>-->
            <!--<span>toto</span>-->
            <!--</v-menu>-->
            <v-btn flat v-for="panel in panels" :key="panel.name">
                <v-icon>{{panel.icon}}</v-icon>
            </v-btn>
        </v-btn-toggle>


        <v-btn-toggle v-model="phantom">
            <v-btn flat>
                <fantome width="2em"/>
            </v-btn>
        </v-btn-toggle>

        <v-menu top offset-y open-on-hover>
            <v-btn-toggle slot="activator" v-model="penreturn">
                <v-btn flat>
                    <v-icon small>brush</v-icon>
                    <v-icon small>loop</v-icon>
                </v-btn>
            </v-btn-toggle>
            <v-toolbar class="elevation-0">Retour automatique: {{nav.autoreturn?"ON":"OFF"}}</v-toolbar>
        </v-menu>


        <v-menu v-if="modeIs(modes.BRUSH)" top offset-y :close-on-content-click="false">
            <v-btn-toggle slot="activator">
                <v-btn flat>
                    <v-icon :style="`color:${activePen.color}`">color_lens</v-icon>
                </v-btn>
            </v-btn-toggle>
            <v-toolbar class="elevation-0">Pinceau</v-toolbar>
            <v-card>
                <v-container pb-0>
                    <v-layout column align-center>
                        <pen-edit :pen="activePen"/>
                        <color-panel v-model="activePen.color" width="20em" :pen="activePen"/>
                        <v-btn flat icon @click="renewColors"><v-icon>refresh</v-icon></v-btn>
                    </v-layout>
                </v-container>
            </v-card>
        </v-menu>

        <zoom v-if="modeIs(modes.ZOOM)" :film="film"/>

        <v-menu top offset-y v-if="modeIs(modes.SELECT) && selection" :close-on-content-click="false">
            <v-btn-toggle slot="activator">
                <v-btn flat><v-icon small>layers</v-icon><v-icon :style="`color:${selection.e.pen.color}`" small>color_lens</v-icon></v-btn>
            </v-btn-toggle>
            <v-toolbar>Modifier sélection</v-toolbar>
            <v-card>
                <v-container pb-0>
                    <v-layout column align-center>
                        <selection :selection="selection" :film="film"></selection>
                        <pen-edit :pen="selection.e.pen"/>
                        <color-panel v-model="selection.e.pen.color" width="20em" :pen="activePen"/>
                        <v-btn flat icon @click="renewColors"><v-icon>refresh</v-icon></v-btn>
                    </v-layout>
                </v-container>
            </v-card>
        </v-menu>
        <v-menu top offset-y open-on-hover>
            <v-btn-toggle slot="activator" v-model="smooth">
                <v-btn flat>
                    <v-icon>gesture</v-icon>
                </v-btn>
            </v-btn-toggle>
            <v-toolbar class="elevation-0">Arrondir</v-toolbar>
        </v-menu>
        <v-menu top offset-y :close-on-content-click="false">
            <v-btn-toggle slot="activator">
                <v-btn flat>
                    <v-icon>timeline</v-icon>
                </v-btn>
            </v-btn-toggle>
            <v-toolbar class="elevation-0">Simplifier</v-toolbar>
            <v-card>
                <simplify :film="film"/>
            </v-card>
        </v-menu>
        <v-menu top offset-y :close-on-content-click="false" v-if="selection">
            <v-btn-toggle slot="activator" v-model="anim">
                <v-btn flat>
                    <v-icon>settings_system_daydream</v-icon>
                </v-btn>
            </v-btn-toggle>
            <v-toolbar class="elevation-0">Ne pas animer</v-toolbar>
        </v-menu>


        <v-spacer/>
        <v-menu top offset-y :close-on-content-click="false">
            <v-btn slot="activator" flat icon>
                <v-icon>directions_run</v-icon>
            </v-btn>
            <v-toolbar class="elevation-0">Vitesse de lecture</v-toolbar>
            <v-card>
                <v-container>
                    <v-layout column>
                        <v-layout row align-center>
                            <v-flex mr-2>X</v-flex>
                            <v-text-field v-model="film.f.config.durationCoef" width="4em"></v-text-field>
                        </v-layout>
                        <v-slider v-model="film.f.config.durationCoef" min="0.01" step="0.01" max="10"/>
                    </v-layout>
                </v-container>
            </v-card>
        </v-menu>
        <v-menu top offset-y>
            <v-btn slot="activator" flat icon>
                <v-icon>content_cut</v-icon>
            </v-btn>
            <v-card>
                <v-toolbar class="elevation-0">Couper avant ou après</v-toolbar>
                <v-list-tile>
                    <v-btn @click="cutStart(film)">
                        <v-icon>content_cut</v-icon>
                        <v-icon>trending_flat</v-icon>
                    </v-btn>
                    <v-btn @click="cutEnd(film)">
                        <v-icon>trending_flat</v-icon>
                        <v-icon>content_cut</v-icon>
                    </v-btn>
                </v-list-tile>
            </v-card>
        </v-menu>


        <!--BAR 2-->
        <v-layout row align-center slot="extension">
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
            <!---->
        </v-layout>

        <film-dialog :film="film"/>
        <film-list-dialog :film="film"/>
        <import-path-dialog/>
    </v-toolbar>
</template>

<script>

    import {mapActions, mapGetters, mapMutations, mapState} from 'vuex'
    import Do from "../../const/do"
    import On from "../../const/on"
    import modes from "../../const/modes"
    import Film from "../panel/Film"
    import Fantome from "../icons/fantome"
    import PenEdit from "../menu/PenEdit"
    import ColorPanel from "../menu/ColorPanel"
    import Simplify from "../panel/Simplify"
    import Selection from "../panel/Selection"
    import FilmDialog from "../menu/RawEditFilmDialog"
    import ImportPathDialog from "../menu/ImportPathDialog"
    import FilmListDialog from "../menu/FilmsListDialog"
    import Zoom from "../panel/Zoom"


    export default {
        name: 'bar',
        components: {Zoom, FilmListDialog, ImportPathDialog, FilmDialog, Selection, Simplify, ColorPanel, PenEdit, Fantome, Film},
        props: ['film'],
        data() {
            return {anim: 0, phantom: null, penreturn: null, smooth: null, modes}
        },
        computed: {
            ...mapState(['nav', 'panels', 'films', 'activePen']),
            ...mapGetters(['currentSec', 'totalSec', 'modeIs', 'selection'])
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
                play: On.PLAY,
                renewColors: On.RENEW_COLORS
            })
        },
        watch: {
            phantom(v) {
                this.film.f.config.showPhantom = v === 0
            },
            smooth(v) {
                this.film.f.config.smooth = v === 0
            },
            penreturn(v) {
                this.nav.autoreturn = v === 0
            },
            anim(v) {
                this.selection.e.anim = v === 0
            }
        }
    }
</script>