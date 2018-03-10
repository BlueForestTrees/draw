<template>
    <svg @mousedown="onMouseDown" id="surface" width="100%" height="100%" class="surface"
         ref="surface">

        <selection :film="film"/>

        <polyline v-for="ei in film.elements" :key="ei._id" v-if="film.showPhantom"
                  :points="polyline(ei.e.points, film.config)"
                  style="fill:none;stroke:black;stroke-width:3;stroke-opacity:0.1"/>

        <g v-if="film.config.smooth">
            <path v-for="(ei,i) in film.elements" v-if="elementIndex(ei,film.index) > 0"
                  :id="ei._id"
                  :key="`${ei._id}@${elementIndex(ei,film.index)}`"
                  :d="path(ei.e.points, film.config, elementIndex(ei,film.index))"
                  style="fill:none;stroke:black;stroke-width:6;stroke-linecap:round"
                  :transform="`translate(${ei.tx} ${ei.ty})`"
            />
        </g>
        <g v-else>
            <polyline v-for="(ei,i) in film.elements" v-if="elementIndex(ei,film.index) > 0"
                      :id="ei._id"
                      :key="`${ei._id}@${elementIndex(ei,film.index)}`"
                      :points="polyline(ei.e.points, film.config, elementIndex(ei,film.index))"
                      style="fill:none;stroke:black;stroke-width:6;stroke-linecap:round"
                      :transform="`translate(${ei.tx} ${ei.ty})`"
            />
        </g>

    </svg>
</template>

<script>
    import {mapGetters, mapState} from 'vuex';
    import {elementIndex, path, polyline} from "../util/geo";
    import {select} from "../modes/selectMode";

    export default {
        name: "surface",
        props: ['film'],
        data: function () {
            return {
                domRef: null
            }
        },
        computed: {
            ...mapState(['nav']),
            ...mapGetters(['activeMode'])
        },
        methods: {
            onMouseDown: function (e) {
                this.activeMode.init({e, film: this.film, domRef: this.domRef});
            },
            elementIndex, path, polyline
        },
        mounted: function () {
            this.domRef = {
                svg: document.getElementById("surface"),
                svgPoint: document.getElementById("surface").createSVGPoint()
            };
        },
        watch: {
            "film.config.selection.element": function (n) {
                select({element: n, film: this.film, domRef: this.domRef});
            }
        }
    }
</script>

<style>
    .surface {
        pointer-events: all;
    }
</style>