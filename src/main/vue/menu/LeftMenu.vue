<template>
    <v-navigation-drawer fixed app v-model="visible">
        <v-container fluid>
            <v-layout column>

                <v-btn-toggle mandatory v-model="film.f.config.activeModeIdx">
                    <v-btn flat v-for="mode in modes" :key="mode.name">
                        <v-icon>{{mode.icon}}</v-icon>
                    </v-btn>
                </v-btn-toggle>
                {{activeMode.name}}
                <span v-if="modeIs(BRUSH)">
                    <v-container>
                        <v-menu>
                            <v-layout slot="activator" row>
                                <v-icon>brush</v-icon>
                                <pen-preview :pen="activePen"/>
                            </v-layout>
                            <v-list>
                                <v-list-tile v-for="pen in pens" :key="pen._id" @click="selectPen(pen)">
                                    <v-list-tile-content>
                                        <pen-preview :pen="pen"/>
                                        <v-divider/>
                                    </v-list-tile-content>
                                </v-list-tile>
                            </v-list>
                        </v-menu>
                    </v-container>

                    <pen-edit :pen="activePen"/>

                    <v-switch label="Curve" v-model="film.f.config.smooth"/>
                    <v-slider v-if="film.f.config.smooth" v-model="film.f.config.smoothing" label="coef" min="0" step="0.05" max="1" thumb-label/>
                    <v-slider v-if="film.f.config.smooth" v-model="film.f.config.flattening" label="flat" min="0" step="0.05" max="1" thumb-label/>
                    <v-switch label="Simple" v-model="film.f.config.simplify"/>
                    <v-select v-if="film.f.config.simplify" :items="['visvalingam','ramer']" v-model="film.f.config.simpleMode" label="Algo" class="input-group--focused"></v-select>
                    <v-slider v-if="film.f.config.simplify" v-model="film.f.config.simpleCoef" label="coef" min="1" step="1" max="200" thumb-label/>
                    <v-btn v-if="film.f.config.simplify" @click="applySimplification(film)">apply</v-btn>
                    <v-switch label="Animated" v-if="selection" v-model="selection.e.anim"/>
                </span>
                <span v-if="modeIs(SELECT) && selection">
                    <pen-edit :pen="selection.e.pen"/>
                    <v-btn @click="pickPen(selection)"><v-icon>trending_flat</v-icon><v-icon>brush</v-icon></v-btn>
                </span>
                <span v-if="modeIs(FILM)">
                    <v-layout row align-center>
                        <v-select :items="films" v-model="film" item-text="f.name" prepend-icon="map" :hint="`${film.f.name} - ${film.f.imageCount}i`" @change="selectFilm"></v-select>
                        <v-btn flat icon @click="addNewFilm">
                            <v-icon>add_box</v-icon>
                        </v-btn>
                        <v-btn flat icon @click="clearFilm(film)">
                            <v-icon>delete</v-icon>
                        </v-btn>
                    </v-layout>
                    <v-layout row>
                        <v-icon>directions_run</v-icon>
                        <v-flex dense>{{totalSec}}s</v-flex>
                        <v-slider v-model="film.f.config.durationCoef" min="0.25" step="0.05" max="4"/>
                    </v-layout>
                    <v-switch label="Phantom" v-model="film.f.config.showPhantom"/>
                </span>
                <span v-if="modeIs(MASK)">
                    <v-layout row align-center>
                        <v-btn flat icon @click="maskConvert({ei:selection, film})" :disabled="noSelection">
                            <v-icon>group_work</v-icon>
                        </v-btn>
                        <v-btn-toggle v-model="film.f.config.activeMaskIdx">
                            <v-btn flat v-for="(mask, id) in film.f.masks" :key="id">M{{id}}</v-btn>
                        </v-btn-toggle>
                    </v-layout>
                </span>
                <span v-if="modeIs(IMPORT)">
                   <import/>
                </span>
            </v-layout>
        </v-container>
    </v-navigation-drawer>
</template>

<script>

    import {mapActions, mapGetters, mapMutations, mapState} from "vuex";
    import Do from "../../const/do";
    import PenPreview from "./PenPreview";
    import modes from "../../const/modes";
    import On from "../../const/on";
    import Import from "../panel/Import";
    import PenEdit from "./PenEdit";

    export default {
        name: 'left-menu',
        components: {
            PenEdit,
            Import,
            PenPreview
        },
        computed: {
            ...mapState({'nav': 'nav', film: 'activeFilm', films: 'films', pens: 'pens', modes: 'modes', activePen: 'activePen'}),
            ...mapGetters(['activeMode', 'selection', 'noSelection', 'modeIs', 'visibleMasks', 'totalSec']),
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
                clearFilm: Do.CLEAR_FILM,
                applySimplification: Do.APPLY_SIMPLIFICATION,
                selectFilm: Do.SELECT_FILM,
                selectPen: Do.SELECT_PEN,
                addNewFilm: Do.ACTIVATE_NEW_FILM,
            }),
            ...mapActions({
                maskConvert: On.MASK_CONVERT,
                pickPen: On.PICK_PEN
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
            BRUSH: modes.BRUSH,
            SELECT: modes.SELECT,
            FILM: modes.FILM,
            MASK: modes.MASK,
            IMPORT: modes.IMPORT
        })
    }
</script>