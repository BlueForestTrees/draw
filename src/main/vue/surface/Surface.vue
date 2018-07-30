<template>
    <svg id="surface" class="surface" ref="surface" :viewBox="viewBox">
        <masks :film="film"/>
        <phantom v-if="film.f.config.showPhantom" :film="film"/>
        <elements :film="film"/>
        <draw-preview :domRef="domRef"/>
        <selection :film="film"/>
        <camera :camera="film.camera"/>
        <!--<rect x="-2000" :y="-2000" width="4000" height="4000" style="fill:rgb(0,0,255);"/>-->
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
    import DrawPreview from "../menu/DrawPreview";
    import Camera from "./Camera";
    import Hammer from 'hammerjs';

    export default {
        components: {
            Camera,
            DrawPreview,
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
                size: 4000,
                touch: null
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
            svgDown: function (evt) {
                if (this.activeMode.surfaceAction) {
                    this.$store.dispatch(this.activeMode.surfaceAction, {evt, film: this.film, domRef: this.domRef, pen: this.pen, touch: this.touch});
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

            this.touch = new Hammer(this.domRef.svg);
            this.touch.get('pan').set({direction: Hammer.DIRECTION_ALL});
            this.touch.on("panstart", this.svgDown);

        }
    }
</script>

<style>
    .surface {
        pointer-events: all;
    }
</style>