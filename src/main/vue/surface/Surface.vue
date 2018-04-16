<template>
    <svg @mousedown="onMouseDown" id="surface" width="100%" height="100%" class="surface" ref="surface">

        <masks :film="film"/>

        <phantom v-if="film.f.config.showPhantom" :film="film"/>

        <elements :film="film"/>

        <selection :film="film"/>

    </svg>
</template>

<script>
    import {mapGetters, mapMutations} from 'vuex';
    import Do from "../../const/do";
    import Selection from "./Selection";
    import Phantom from "./Phantom";
    import Elements from "./Elements";
    import {eii, path} from "../../util/playerSurface";
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
                domRef: null
            }
        },
        computed: {
            ...mapGetters(['activeMode'])
        },
        methods: {
            onMouseDown: function (evt) {
                if (this.activeMode.surfaceAction) {
                    this.$store.dispatch(this.activeMode.surfaceAction, {evt, film: this.film, domRef: this.domRef, pen: this.pen});
                }
            },
            ...mapMutations({
                commitSelect: Do.SET_SELECTION_BOX
            }),
            elementIndex: eii, path: path
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