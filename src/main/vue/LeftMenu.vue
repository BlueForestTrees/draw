<template>
    <v-navigation-drawer fixed app v-model="visible">
        <v-container fluid>
            <v-layout column>
                <v-switch label="Curve" v-model="film.config.smooth"/>
                <v-slider v-if="film.config.smooth" v-model="film.config.smoothing" label="coef" min="0" step="0.05"
                          max="1" thumb-label/>
                <v-slider v-if="film.config.smooth" v-model="film.config.flattening" label="flat" min="0" step="0.05"
                          max="1" thumb-label/>
                <v-divider/>


                <v-switch label="Simple" v-model="film.config.simplify"/>
                <v-select v-if="film.config.simplify"
                          :items="['visvalingam','ramer']"
                          v-model="film.config.simpleMode"
                          label="Algo"
                          class="input-group--focused"
                ></v-select>
                <v-slider v-if="film.config.simplify" v-model="film.config.simpleCoef" label="coef" min="1" step="1"
                          max="200"
                          thumb-label/>
                <v-btn v-if="film.config.simplify" @click="applySimplification(film)">apply</v-btn>
                <v-divider/>

                <v-switch label="Phantom" v-model="film.showPhantom"/>
                <div>
                    <v-btn flat icon @click="cloneSelection(film)" :disabled="!film.config.selection">
                        <v-icon>toll</v-icon>
                    </v-btn>
                    <v-btn flat icon @click="clearFilm">
                        <v-icon>delete_sweep</v-icon>
                    </v-btn>
                    <v-btn flat icon @click="deleteSelection(film)" :disabled="!film.config.selection">
                        <v-icon>delete</v-icon>
                    </v-btn>
                </div>
                <swatches v-model="film.config.color" colors="text-advanced" popover-to="left"/>
                <v-divider/>

                <v-slider v-model="film.config.durationCoef" label="speed" min="0.25" step="0.05" max="4" thumb-label/>
                <v-divider/>

                <v-btn-toggle mandatory v-model="film.config.tool">
                    <v-btn flat>
                        <v-icon>brush</v-icon>
                    </v-btn>
                    <v-btn flat>
                        <v-icon>pan_tool</v-icon>
                    </v-btn>
                </v-btn-toggle>
                <v-divider/>


            </v-layout>
        </v-container>
    </v-navigation-drawer>
</template>

<script>

    import {mapMutations, mapState} from "vuex";
    import Do from "../const/do";
    import Swatches from 'vue-swatches'

    export default {
        name: 'left-menu',
        props: ['film'],
        components: {
            Swatches
        },
        computed: {
            ...mapState(['nav']),
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
                deleteSelection: Do.DELETE_SELECTION,
                applySimplification: Do.APPLY_SIMPLIFICATION
            })
        },
        data: () => ({})
    }
</script>