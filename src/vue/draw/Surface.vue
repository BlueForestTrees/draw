<template>
    <svg id="surface" ref="surface" class="surface" :viewBox="viewBox" style="pointer-events: all">
        <masks :film="film"/>
        <phantom v-if="film.f.config.showPhantom" :film="film"/>
        <elements :film="film"/>
        <draw-preview :domRef="domRef"/>
        <!--<selection :film="film"/>-->
        <camera :camera="film.camera"/>
    </svg>
</template>

<script>
    import {mapGetters, mapMutations} from 'vuex'
    import Vue from 'vue'
    import Hammer from 'hammerjs'
    import Phantom from "../surface/Phantom"
    import Masks from "../surface/Masks"
    import Elements from "../surface/Elements"
    import DrawPreview from "../menu/DrawPreview"
    import Camera from "../surface/Camera"
    import Do from "../../const/do"

    export default {
        components: {
            Camera,
            DrawPreview,
            Elements,
            Masks,
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
                const zize = this.film.f.zoom * this.size
                const panx = this.film.f.panx
                const pany = this.film.f.pany
                return `${panx + -0.5 * zize} ${pany + -0.5 * zize} ${zize} ${zize}`
            }
        },
        methods: {
            svgDown: function (evt) {
                if (this.activeMode.surfaceAction) {
                    this.$store.dispatch(this.activeMode.surfaceAction, {evt, film: this.film, domRef: this.domRef, pen: this.pen, touch: this.touch})
                }
            },
            ...mapMutations({
                commitSelect: Do.SET_SELECTION_BOX
            })
        },
        watch: {
            "film.f.selection.elementId": function (eid) {
                if (!eid) return
                //le nextTick sécurise le cas de l'import de film.
                //Vue.nextTick(() => this.commitSelect({elementId: eid, film: this.film, domRef: this.domRef}))
            }
        },
        mounted: function () {
            this.domRef = {
                svg: document.getElementById("surface"),
                svgPoint: document.getElementById("surface").createSVGPoint()
            }

            this.touch = new Hammer(this.domRef.svg)
            this.touch.add(new Hammer.Pan({direction: Hammer.DIRECTION_ALL, threshold: 0}))
            this.touch.add(new Hammer.Press({time: 0}))
            this.touch.on("press", this.svgDown)


        }
    }
</script>