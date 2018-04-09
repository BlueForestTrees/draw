<template>
    <v-toolbar dense>

        <v-toolbar-title>
            <v-toolbar-side-icon @click.stop="toggleMenu"/>
        </v-toolbar-title>

        <v-toolbar-items>
            <v-btn icon @click="rewind(film)">
                <v-icon>skip_previous</v-icon>
            </v-btn>
            <v-btn icon @click="prev(film)">
                <v-icon>fast_rewind</v-icon>
            </v-btn>
            <v-btn icon v-if="film.f.player.playing" @click="pause(film)">
                <v-icon>pause</v-icon>
            </v-btn>
            <v-btn icon v-else @click="play(film)" :disabled="film.f.imageCount === 0">
                <v-icon>play_arrow</v-icon>
            </v-btn>
            <v-btn icon @click="next(film)">
                <v-icon>fast_forward</v-icon>
            </v-btn>
            <span class="airText">{{`${currentSec}/${totalSec}s`}}</span>
        </v-toolbar-items>

        <v-slider class="slider" v-model="film.f.ftz" step="1" :max="film.f.imageCount" thumb-label/>

        <v-toolbar-items>
            <span class="airText">{{`${film.f.ftz}/${film.f.imageCount}`}}</span>
            <v-btn icon @click="keep(film)">
                <v-icon>get_app</v-icon>
            </v-btn>
            <v-btn icon @click="unkeep(film)">
                <v-icon>exit_to_app</v-icon>
            </v-btn>
        </v-toolbar-items>

    </v-toolbar>
</template>

<script>

    import Do from "../../const/do";
    import {mapMutations, mapActions, mapState, mapGetters} from 'vuex';
    import {formatShort} from "../../util/common";
    import On from "../../const/on";

    export default {
        name: 'player',
        props: ['film'],
        computed: {
            ...mapState(['nav']),
            currentSec: function () {
                const base = this.film.f.config.imageDuration * this.film.f.config.durationCoef;
                return formatShort(this.film.f.ftz * base / 1000);
            },
            totalSec: function () {
                const base = this.film.f.config.imageDuration * this.film.f.config.durationCoef;
                return formatShort(this.film.f.imageCount * base / 1000);
            }
        },
        methods: {
            ...mapMutations({
                toggleMenu: Do.TOGGLE_MENU_VISIBILITY,
                rewind: Do.REWIND,
                prev: Do.PREV,
                next: Do.NEXT,
                keep: Do.KEEP,
                unkeep: Do.UNKEEP,
                pause: Do.PAUSE,
            }),
            ...mapActions({
                play: On.PLAY
            })
        }
    }
</script>