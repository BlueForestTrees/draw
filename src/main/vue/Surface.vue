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
    import {elementPosition, globalToLocal, path, polyline} from "../util/geo";
    import {endChrono} from "../util/common";

    export default {
        name: "surface",
        props: ['config', 'film'],
        data: function () {
            return {
                currentElement: null,
                svg: null,
                svgPoint: null,
                drawing: null,
                drawDelay: 20
            }
        },
        computed: {
            ...mapState(['nav'])
        },
        methods: {
            down: function (e) {
                this.move(e);
                window.addEventListener("mousemove", this.move);
                window.addEventListener("mouseup", this.up);
                this.drawInit();
            },
            move: function (e) {
                this.e = e;
            },
            tick: function () {
                this.drawPoint(globalToLocal(this.e, this.svgPoint, this.svg));
                if (this.drawing) {
                    setTimeout(() => this.tick, this.drawDelay)
                } else {
                    window.removeEventListener("mousemove", this.move);
                    window.removeEventListener("mouseup", this.up);
                    this.drawEnd();
                }
            },
            up: function () {
                this.drawing = false;
            },


            drawInit: function () {
                this.currentElement = createElement(this.film.position);
                this.film.elements.push(this.currentElement);
                this.drawing = true;
                this.tick();
            },
            drawPoint: function (point) {
                this.film.position++;
                if (this.film.position > this.film.length) {
                    this.film.length = this.film.position;
                }
                this.currentElement.points.push(point);
            },
            drawEnd: function () {
                this.drawing = false;
                endChrono(this.currentElement);
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