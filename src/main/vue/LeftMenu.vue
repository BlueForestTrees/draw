<template>
    <v-navigation-drawer fixed app v-model="visible">
        <v-container fluid>
            <v-layout column>
                <v-switch label="Curve" v-model="film.config.smooth"/>
                <v-slider v-if="film.config.smooth" v-model="film.config.smoothing" label="coef" min="0" step="0.05" max="1" thumb-label/>
                <v-slider v-if="film.config.smooth" v-model="film.config.flattening" label="flat" min="0" step="0.05" max="1" thumb-label/>
                <v-switch label="Simple" v-model="film.config.simplify"/>
                <v-select v-if="film.config.simplify" :items="['visvalingam','ramer']" v-model="film.config.simpleMode" label="Algo" class="input-group--focused"></v-select>
                <v-slider v-if="film.config.simplify" v-model="film.config.simpleCoef" label="coef" min="1" step="1" max="200" thumb-label/>
                <v-btn v-if="film.config.simplify" @click="applySimplification(film)">apply</v-btn>
                <v-switch label="Phantom" v-model="film.showPhantom"/>
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
                </div>
                <v-slider v-model="film.config.durationCoef" label="speed" min="0.25" step="0.05" max="4" thumb-label/>
                <v-btn-toggle mandatory v-model="film.config.activeModeIdx">
                    <template>
                        <v-btn flat v-for="mode in modes" :key="mode.name">
                            <v-icon>{{mode.icon}}</v-icon>
                        </v-btn>
                    </template>
                </v-btn-toggle>
                <swatches v-if="activeMode.canColor" v-model="film.config.color" colors="text-advanced" popover-to="left"/>
                <v-layout row align-center>
                    <v-select :items="films" v-model="film" item-text="name" prepend-icon="map" :hint="`${film.name} - ${film.length}i`" @change="selectFilm"></v-select>
                    <v-btn flat icon @click="addNewFilm">
                        <v-icon>add_box</v-icon>
                    </v-btn>
                </v-layout>
                <v-btn flat icon @click="merge">
                    <v-icon>edit</v-icon>
                </v-btn>
            </v-layout>
        </v-container>
    </v-navigation-drawer>
</template>

<script>

    import {mapMutations, mapState, mapGetters, mapActions} from "vuex";
    import Do from "../const/do";
    import Swatches from 'vue-swatches'
    import On from "../const/on";

    export default {
        name: 'left-menu',
        components: {
            Swatches
        },
        computed: {
            ...mapState(['nav', 'activeFilm', 'films', 'modes']),
            ...mapGetters(['activeMode', 'noSelection']),
            film: function () {
                return this.activeFilm;
            },
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
                addNewFilm: Do.ACTIVATE_NEW_FILM
            }),
            ...mapActions({
                deleteSelection: On.DELETE_SELECTED_ELEMENT,
            }),
            merge: function () {
                this.films[0].children.push(this.films[1]);
            }
        },
        data: () => ({})
    }
</script>