<template>
    <svg @mousedown="svgMouseDown" id="surface" width="100%" height="100%" class="surface" ref="surface" :viewBox="viewBox">
        <masks :film="film"/>
        <phantom v-if="film.f.config.showPhantom" :film="film"/>
        <elements :film="film"/>
        <circle cx="0" cy="0" r="10" stroke="black" stroke-width="3" fill="red"/>
        <selection :film="film"/>
    </svg>
</template>

<script>
    import {mapGetters, mapMutations} from 'vuex';
    import Do from "../../const/do";
    import Selection from "./Selection";
    import Phantom from "./Phantom";
    import Elements from "./Elements";
    import Masks from "./Masks";
    import Vue from 'vue';

    export default {
        components: {
            Masks,
            Elements,
            Phantom,
            Selection
        },
        name: "surface",
        props: ['film', 'pen'],
        data: function () {
            return {
                domRef: null,
                size: 4000
            }
        },
        computed: {
            ...mapGetters(['activeMode']),
            viewBox: function () {
                const zize = this.film.f.zoom * this.size;
                const panx = this.film.f.panx;
                const pany = this.film.f.pany;
                return `${panx + -0.5 * zize} ${pany + -0.5 * zize} ${zize} ${zize}`;
            }
        },
        methods: {
            svgMouseDown: function (evt) {
                if (this.activeMode.surfaceAction) {
                    this.$store.dispatch(this.activeMode.surfaceAction, {evt, film: this.film, domRef: this.domRef, pen: this.pen});
                }
            },
            ...mapMutations({
                commitSelect: Do.SET_SELECTION_BOX
            })
        },
        watch: {
            "film.f.selection.elementId": function (eid) {
                if (!eid) return;
                //le nextTick sécurise le cas de l'import de film.
                Vue.nextTick(() => this.commitSelect({elementId: eid, film: this.film, domRef: this.domRef}));
            }
        },
        mounted: function () {
            this.domRef = {
                svg: document.getElementById("surface"),
                svgPoint: document.getElementById("surface").createSVGPoint()
            };
        }
    }
</script>

<style>
    .surface {
        pointer-events: all;
    }
</style>