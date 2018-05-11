<template>
    <v-navigation-drawer fixed app v-model="visible">
        <v-container fluid>
            <v-layout column>
                <v-btn-toggle mandatory v-model="film.f.config.activeModeIdx">
                    <v-btn flat v-for="panel in panels" :key="panel.name">
                        <v-icon>{{panel.icon}}</v-icon>
                    </v-btn>
                </v-btn-toggle>
                {{activeMode.name}}
                <span v-if="modeIs(modes.BRUSH)">
                    <brush :film="film" :selection="selection" :noSelection="noSelection"/>
                </span>
                <span v-if="modeIs(modes.SELECT)">
                    <selection :selection="selection" :film="film" :noSelection="noSelection"/>
                </span>
                <span v-if="modeIs(modes.FILM)">
                    <film :film="film" :films="films"/>
                </span>
                <span v-if="modeIs(modes.ZOOM)">
                    <zoom :film="film"/>
                </span>
                <span v-if="modeIs(modes.IMPORT)">
                   <import/>
                </span>
                <span v-if="modeIs(modes.CAMERA)">
                   <camera :camera="film.camera"/>
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
    import Import from "../panel/Import";
    import PenEdit from "./PenEdit";
    import Film from "../panel/Film";
    import Selection from "../panel/Selection";
    import Brush from "../panel/Brush";
    import Zoom from "../panel/Zoom";
    import Camera from "../panel/Camera";

    export default {
        name: 'palette',
        components: {Camera, Zoom, Brush, Selection, Film, PenEdit, Import, PenPreview},
        computed: {
            ...mapState({nav: 'nav', film: 'activeFilm', films: 'films', pens: 'pens', panels: 'panels', activePen: 'activePen'}),
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
                applySimplification: Do.APPLY_SIMPLIFICATION,
                selectPen: Do.SELECT_PEN,
            }),
            ...mapActions({}),
            merge: function () {
                const parent = this.films[0];
                const child = this.films[1];
                parent.f.imageCount = Math.max(parent.f.imageCount, child.f.imageCount);
                child.f.ftz = 0;
                parent.f.children.push(child);
            }
        },
        data: () => ({
            modes
        })
    }
</script>