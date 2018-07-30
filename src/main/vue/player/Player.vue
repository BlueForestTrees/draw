<template>
    <v-toolbar dense>
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

        <v-slider class="slider" v-model="film.f.ftz" step="1" :min="film.f.start" :max="film.f.imageCount" thumb-label/>

        <v-toolbar-items>
            <span class="airText">{{`${film.f.ftz - film.f.start}/${film.f.imageCount}`}}</span>
            <v-btn icon @click="keep(film)">
                <v-icon>system_update_alt</v-icon>
            </v-btn>
            <v-btn icon @click="unkeep(film)">
                <v-icon>exit_to_app</v-icon>
            </v-btn>
        </v-toolbar-items>

    </v-toolbar>
</template>

<script>

    import Do from "../../const/do";
    import {mapActions, mapGetters, mapMutations, mapState} from 'vuex';
    import On from "../../const/on";

    export default {
        name: 'player',
        props: ['film'],
        computed: {
            ...mapState(['nav']),
            ...mapGetters(['currentSec', 'totalSec'])
        },
        methods: {
            ...mapMutations({
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