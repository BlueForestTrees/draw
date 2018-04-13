<template>
    <span>
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
</template>
<script>
    import {mapActions, mapGetters, mapMutations, mapState} from "vuex";
    import Do from "../../const/do";
    import PenPreview from "../menu/PenPreview";
    import PenEdit from "../menu/PenEdit";

    export default {
        name: "brush",
        components: {PenEdit, PenPreview},
        computed: {
            ...mapState({film: 'activeFilm', pens: 'pens', activePen: 'activePen'}),
            ...mapGetters(['selection']),
        },
        methods: {
            ...mapMutations({
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
    }
</script>