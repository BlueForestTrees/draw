<template>
    <svg @mousedown="down" id="surface" width="100%" height="100%" class="surface">

        <polyline v-for="e in film.elements" :key="e._id" v-if="film.showPhantom"
                  :points="polyline(e.points, config)"
                  style="fill:none;stroke:black;stroke-width:3;stroke-opacity:0.1"/>

        <g v-if="config.smooth">
            <path v-for="e in film.elements" v-if="elementPosition(e,film.position) > 0"
                  :key="`${e._id}@${elementPosition(e,film.position)}`"
                  :d="path(e.points, config, elementPosition(e,film.position))"
                  style="fill:none;stroke:black;stroke-width:3;stroke-linecap:round"/>
        </g>
        <g v-else>
            <polyline v-for="e in film.elements" v-if="elementPosition(e,film.position) > 0"
                      :key="`${e._id}@${elementPosition(e,film.position)}`"
                      :points="polyline(e.points, config, elementPosition(e,film.position))"
                      style="fill:none;stroke:black;stroke-width:3;stroke-linecap:round"/>
        </g>

    </svg>
</template>

<script>

    import {createElement} from "../vuex/state";
    import {mapState} from 'vuex';
    import {path, polyline, elementPosition, globalToLocal} from "../util/geo";
    import _ from 'lodash';
    import {endChrono} from "../util/common";

    export default {
        name: "surface",
        props: ['config', 'film'],
        data: function () {
            return {
                currentElement: null,
                svg: null,
                svgPoint: null
            }
        },
        computed: {
            ...mapState(['nav'])
        },
        methods: {
            down: function (e) {
                window.addEventListener("mousemove", this.move);
                window.addEventListener("mouseup", this.up);
                this.initAt(globalToLocal(e, this.svgPoint, this.svg));
            },
            move: function (e) {
                this.lineTo(globalToLocal(e, this.svgPoint, this.svg));
            },
            up: function () {
                window.removeEventListener("mousemove", this.move);
                window.removeEventListener("mouseup", this.up);
                this.end();
            },

            initAt: function (point) {
                this.currentElement = createElement(this.film.position);
                this.film.elements.push(this.currentElement);

                this.lineTo(point);
            },
            lineTo: function (point) {
                this.film.position++;
                if (this.film.position > this.film.length) {
                    this.film.length = this.film.position;
                }
                this.currentElement.points.push(point);
            },
            end: function () {
                endChrono(this.currentElement.chrono);
            },

            globalToLocal,
            elementPosition,
            path,
            polyline
        },
        mounted: function () {
            this.svg = document.getElementById("surface");
            this.svgPoint = document.getElementById("surface").createSVGPoint();
        },
    }
</script>

<style>
    .surface {
        pointer-events: all;
    }
</style>