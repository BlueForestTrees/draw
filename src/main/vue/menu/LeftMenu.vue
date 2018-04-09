<template>
    <v-navigation-drawer fixed app v-model="visible">
        <v-container fluid>
            <v-layout column>
                <div>
                    <v-btn flat icon @click="cloneSelection(film)" :disabled="noSelection">
                        <v-icon>toll</v-icon>
                    </v-btn>
                    <v-btn flat icon @click="clearFilm(film)">
                        <v-icon>delete_sweep</v-icon>
                    </v-btn>
                    <v-btn flat icon @click="deleteSelection(film)" :disabled="noSelection">
                        <v-icon>delete</v-icon>
                    </v-btn>
                    <v-btn flat icon @click="toggleImport(true)">
                        <v-icon>chat</v-icon>
                    </v-btn>
                </div>
                <v-btn-toggle mandatory v-model="film.f.config.activeModeIdx">
                    <template>
                        <v-btn flat v-for="mode in modes" :key="mode.name">
                            <v-icon>{{mode.icon}}</v-icon>
                        </v-btn>
                    </template>
                </v-btn-toggle>


                <span v-if="modeIs(BRUSH)">
                    <v-container>
                        <v-menu>
                            <v-layout slot="activator" row>
                                <v-icon>brush</v-icon>
                                <pen-preview :pen="activePen"/>
                            </v-layout>
                            <v-list>
                                <v-list-tile v-for="pen in pens" :key="pen.name" @click="selectPen(pen)">
                                    <v-list-tile-content>
                                        <pen-preview :pen="pen"/>
                                        <v-divider/>
                                    </v-list-tile-content>
                                </v-list-tile>
                            </v-list>
                        </v-menu>
                    </v-container>
                    <swatches v-if="activeMode.canColor" v-model="activePen.color" colors="text-advanced" popover-to="left"/>
                    <v-slider v-model="activePen.width" label="width" min="1" step="1" max="100" thumb-label/>
                </span>

                <v-divider/>

                <v-slider v-model="film.f.config.durationCoef" label="speed" min="0.25" step="0.05" max="4" thumb-label/>
                <v-switch label="Curve" v-model="film.f.config.smooth"/>
                <v-slider v-if="film.f.config.smooth" v-model="film.f.config.smoothing" label="coef" min="0" step="0.05" max="1" thumb-label/>
                <v-slider v-if="film.f.config.smooth" v-model="film.f.config.flattening" label="flat" min="0" step="0.05" max="1" thumb-label/>
                <v-switch label="Simple" v-model="film.f.config.simplify"/>
                <v-select v-if="film.f.config.simplify" :items="['visvalingam','ramer']" v-model="film.f.config.simpleMode" label="Algo" class="input-group--focused"></v-select>
                <v-slider v-if="film.f.config.simplify" v-model="film.f.config.simpleCoef" label="coef" min="1" step="1" max="200" thumb-label/>
                <v-btn v-if="film.f.config.simplify" @click="applySimplification(film)">apply</v-btn>
                <v-switch label="Phantom" v-model="film.f.showPhantom"/>
                <!--<v-layout row align-center>
                    <v-select :items="films" v-model="film" item-text="f.name" prepend-icon="map" :hint="`${film.f.name} - ${film.f.imageCount}i`" @change="selectFilm"></v-select>
                    <v-btn flat icon @click="addNewFilm">
                        <v-icon>add_box</v-icon>
                    </v-btn>
                </v-layout>-->
                <!--<v-btn flat icon @click="merge">-->
                <!--<v-icon>edit</v-icon>-->
                <!--</v-btn>-->


            </v-layout>
        </v-container>
    </v-navigation-drawer>
</template>

<script>

    import {mapActions, mapGetters, mapMutations, mapState} from "vuex";
    import Do from "../../const/do";
    import Swatches from 'vue-swatches'
    import On from "../../const/on";
    import PenPreview from "./PenPreview";
    import modes from "../../const/modes";

    export default {
        name: 'left-menu',
        components: {
            PenPreview,
            Swatches
        },
        computed: {
            ...mapState({'nav': 'nav', film: 'activeFilm', films: 'films', pens: 'pens', modes: 'modes', activePen: 'activePen'}),
            ...mapGetters(['activeMode', 'noSelection', 'modeIs']),
            visible: {
                get: function () {
                    return this.nav.menuVisible;
                },
                set: function (val) {
                    this.setVisible(val);
                }
            }
        },
        methods: {
            ...mapMutations({
                setVisible: Do.SET_MENU_VISIBILITY,
                cloneSelection: Do.CLONE_SELECTION,
                clearFilm: Do.CLEAR_FILM,
                applySimplification: Do.APPLY_SIMPLIFICATION,
                selectFilm: Do.SELECT_FILM,
                selectPen: Do.SELECT_PEN,
                addNewFilm: Do.ACTIVATE_NEW_FILM,
                toggleImport: Do.SHOW_IMPORT_DIALOG
            }),
            ...mapActions({
                deleteSelection: On.DELETE_SELECTED_ELEMENT,
            }),
            merge: function () {
                const parent = this.films[0];
                const child = this.films[1];
                parent.f.imageCount = Math.max(parent.f.imageCount, child.f.imageCount);
                child.f.ftz = 0;
                parent.f.children.push(child);
            }
        },
        data: () => ({
            BRUSH: modes.BRUSH
        })
    }
</script>