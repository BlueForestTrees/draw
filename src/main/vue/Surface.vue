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
    import {path, polyline, elementPosition} from "../util/geo";

    export default {
        name: "surface",
        props: ['config', 'film'],
        data: function () {
            return {
                current: null,
                svg: null,
                pt: null
            }
        },
        computed: {
            ...mapState(['nav'])
        },
        methods: {
            initAt: function (point) {
                this.current = createElement(this.film.position);
                this.film.elements.push(this.current);

                this.lineTo(point);
            },
            lineTo: function (point) {
                this.film.position++;
                if (this.film.position > this.film.length) {
                    this.film.length = this.film.position;
                }
                this.current.points.push(point);
            },


            down: function (e) {
                window.addEventListener("mousemove", this.move);
                window.addEventListener("mouseup", this.up);
                this.initAt(this.coords(e));
            },
            move: function (e) {
                this.lineTo(this.coords(e));
            },
            up: function () {
                window.removeEventListener("mousemove", this.move);
                window.removeEventListener("mouseup", this.up);
            },

            coords: e => {
                const svg = document.getElementById("surface");
                const pt = svg.createSVGPoint();
                pt.x = e.clientX;
                pt.y = e.clientY;
                return pt.matrixTransform(svg.getScreenCTM().inverse());
            },
            elementPosition,
            path,
            polyline
        }
    }
</script>

<style>
    .surface {
        pointer-events: all;
    }
</style>