<template>
    <svg @mousedown="onMouseDown" id="surface" width="100%" height="100%" class="surface" ref="surface">

        <phantom v-if="film.f.showPhantom" :film="film"/>

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
    import {elementIndex, path} from "../../util/geo";

    export default {
        components: {
            Elements,
            Phantom,
            Selection
        },
        name: "surface",
        props: ['film'],
        data: function () {
            return {
                domRef: null
            }
        },
        computed: {
            ...mapGetters(['activeMode'])
        },
        methods: {
            onMouseDown: function (e) {
                this.$store.dispatch(this.activeMode.action, {e, film: this.film, domRef: this.domRef});
            },
            ...mapMutations({
                commitSelect: Do.SET_SELECTION_BOX
            }),
            elementIndex,path
        },
        watch: {
            "film.f.selection.element": function (n) {
                this.commitSelect({element: n, film: this.film, domRef: this.domRef});
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