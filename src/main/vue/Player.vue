<template>
    <v-toolbar dense>

        <v-toolbar-title>
            <v-toolbar-side-icon @click.stop="toggleMenu"/>
        </v-toolbar-title>

        <v-toolbar-items>
            <v-btn icon @click="firstImage">
                <v-icon>skip_previous</v-icon>
            </v-btn>
            <v-btn icon @click="prevImage">
                <v-icon>fast_rewind</v-icon>
            </v-btn>
            <v-btn icon v-if="playing" @click="pause">
                <v-icon>pause</v-icon>
            </v-btn>
            <v-btn icon v-else @click="play" :disabled="film.length === 0">
                <v-icon>play_arrow</v-icon>
            </v-btn>
            <v-btn icon @click="nextImage">
                <v-icon>fast_forward</v-icon>
            </v-btn>
            <span class="airText">{{`${currentSec}/${totalSec}s`}}</span>
        </v-toolbar-items>

        <v-slider class="slider" v-model="film.index" step="1" :max="film.length" thumb-label/>

        <v-toolbar-items>
            <span class="airText">{{`${film.index}/${film.length}`}}</span>
            <v-btn icon @click="keepCurrentImage">
                <v-icon>get_app</v-icon>
            </v-btn>
            <v-btn icon @click="gotoKeepedImage">
                <v-icon>exit_to_app</v-icon>
            </v-btn>
        </v-toolbar-items>

    </v-toolbar>
</template>

<script>

    import Do from "../const/do";
    import {mapState, mapMutations} from 'vuex';
    import {endChrono, formatShort} from "../util/common";
    import {createChrono} from "../vuex/state";

    export default {
        name: 'player',
        props: ['config', 'film'],
        data: function () {
            return {
                playing: false,
                chrono: null
            }
        },
        computed: {
            ...mapState(['nav']),
            currentSec: function () {
                return formatShort(this.film.index * this.base / 1000);
            },
            totalSec: function () {
                return formatShort(this.film.length * this.base / 1000);
            },
            total: function () {
                return this.film.length * this.base;
            },
            base: function () {
                return this.config.imageDuration * this.config.durationCoef;
            }
        },
        methods: {
            ...mapMutations({toggleMenu: Do.TOGGLE_MENU_VISIBILITY}),
            firstImage: function () {
                this.film.index = 0;
            },
            prevImage: function () {
                this.film.index = Math.max(0, this.film.index - 1);
            },
            nextImage: function () {
                this.film.index = Math.min(this.film.length, this.film.index + 1);
                return this.film.index < this.film.length;
            },
            nextTick: function () {
                const elapsedRatio = endChrono(this.chrono) / this.total;
                const elapsedImage = Math.ceil(this.film.length * elapsedRatio);
                this.film.index = Math.min(this.film.length, elapsedImage);
                return this.film.index < this.film.length;
            },


            keepCurrentImage: function () {
                this.film.keep = this.film.index;
            },
            gotoKeepedImage: function () {
                this.film.index = this.film.keep;
            },


            pause: function () {
                this.playing = false;
            },
            play: function () {
                if (this.film.index === this.film.length) {
                    this.firstImage();
                }
                this.playing = true;
                this.chrono = createChrono();
                this.playNext();
            },
            playNext: function () {
                if (this.playing) {
                    if (this.nextTick()) {
                        setTimeout(this.playNext, this.config.imageDuration);
                    } else {
                        this.playing = false;
                    }
                }
            }
        }
    }
</script>

<style>
    .slider {
        padding-top: 0;
    }

    .airText {
        width: 5em;
        text-align: center;
        align-self: center;
    }
</style>

