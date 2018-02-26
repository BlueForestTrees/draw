<template>
    <v-navigation-drawer fixed app v-model="visible">
        <v-container fluid>
            <v-layout column>
                <v-switch label="Curve" v-model="config.smooth"/>
                <v-slider v-if="config.smooth" v-model="config.smoothing" label="coef" min="0" step="0.05"
                          max="1" thumb-label/>
                <v-slider v-if="config.smooth" v-model="config.flattening" label="flat" min="0" step="0.05"
                          max="1" thumb-label/>
                <v-divider/>


                <v-switch label="Simple" v-model="config.simplify"/>
                <v-select v-if="config.simplify"
                          :items="['visvalingam','ramer']"
                          v-model="config.simpleMode"
                          label="Algo"
                          class="input-group--focused"
                ></v-select>
                <v-slider v-if="config.simplify" v-model="config.simpleCoef" label="coef" min="1" step="1" max="200"
                          thumb-label/>
                <v-btn v-if="config.simplify" @click="applySimplification">apply</v-btn>
                <v-divider/>

                <v-switch label="Phantom" v-model="film.showPhantom"/>
                <v-btn icon @click="clear">
                    <v-icon>delete</v-icon>
                </v-btn>
                <swatches v-model="config.color" colors="text-advanced" popover-to="left"/>
                <v-divider/>

                <v-slider v-model="config.durationCoef" label="speed" min="0.25" step="0.05" max="4" thumb-label/>
                <v-divider/>

                <v-btn-toggle mandatory v-model="config.tool">
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
    import {simplifyFilm} from "../util/geo";
    import {createFilm} from "../vuex/state";

    export default {
        name: 'left-menu',
        props: ['config', 'film'],
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
                setVisible: Do.SET_MENU_VISIBILITY
            }),
            clear: function () {
                Object.assign(this.film, createFilm());
            },
            applySimplification: function () {
                simplifyFilm(this.film, this.config);
                this.config.simplify = false;
            }
        },
        data: () => ({})
    }
</script>