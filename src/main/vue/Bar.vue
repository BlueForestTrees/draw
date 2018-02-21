<template>
    <v-toolbar dense>

        <v-toolbar-title>
            <v-toolbar-side-icon @click.stop="toggleMenu"/>
        </v-toolbar-title>

        <v-toolbar-items>
            <v-btn icon @click="revert">
                <v-icon>skip_previous</v-icon>
            </v-btn>
            <v-btn icon @click="prev">
                <v-icon>fast_rewind</v-icon>
            </v-btn>
            <v-btn icon v-if="playing" @click="pause">
                <v-icon>pause</v-icon>
            </v-btn>
            <v-btn icon v-else @click="play">
                <v-icon>play_arrow</v-icon>
            </v-btn>
            <v-btn icon @click="next">
                <v-icon>fast_forward</v-icon>
            </v-btn>
        </v-toolbar-items>
        <v-slider class="slider" v-model="film.position" step="1" :max="film.length" thumb-label
                  :label="`${film.position}/${film.length}`"/>
        <v-toolbar-items>
            <v-btn icon @click="keep">
                <v-icon>get_app</v-icon>
            </v-btn>
            <v-btn icon @click="goto">
                <v-icon>exit_to_app</v-icon>
            </v-btn>
        </v-toolbar-items>
    </v-toolbar>
</template>

<script>

    import Do from "../const/do";
    import {mapState, mapMutations} from 'vuex';

    export default {
        name: 'bar',
        props: ['config', 'film'],
        data: function () {
            return {
                playing: false
            }
        },
        computed: {
            ...mapState(['nav'])
        },
        methods: {
            ...mapMutations({toggleMenu: Do.TOGGLE_MENU_VISIBILITY}),
            revert: function () {
                this.film.position = 0;
            },
            prev: function () {
                this.film.position = Math.max(0, this.film.position - 1);
            },
            next: function () {
                this.film.position = Math.min(this.film.length, this.film.position + 1);
                return this.film.position < this.film.length;
            },
            keep: function () {
                this.film.keep = this.film.position;
            },
            goto: function () {
                this.film.position = this.film.keep;
            },
            play: function () {
                if (this.film.position === this.film.length) {
                    this.revert();
                }
                this.playing = true;
                this.playNext();
            },
            pause: function () {
                this.playing = false;
            },
            playNext: function () {
                if (this.playing) {
                    if (this.next()) {
                        setTimeout(this.playNext, this.config.delay);
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
</style>