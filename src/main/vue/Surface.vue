<template>
    <svg @mousedown="downOfTool(config.tool,$event)" id="surface" width="100%" height="100%" class="surface">

        <rect v-if="selectedBox" :x="selectedBox.x" :y="selectedBox.y" :width="selectedBox.width"
              :height="selectedBox.height"
              style="fill:none;stroke:blue;stroke-width:1;stroke-opacity:0.8"/>
        />

        <polyline v-for="e in film.elements" :key="e._id" v-if="film.showPhantom"
                  :points="polyline(e.points, config)"
                  style="fill:none;stroke:black;stroke-width:3;stroke-opacity:0.1"/>

        <g v-if="config.smooth">
            <path v-for="e in film.elements" v-if="elementIndex(e,film.index) > 0"
                  :key="`${e._id}@${elementIndex(e,film.index)}`"
                  :d="path(e.points, config, elementIndex(e,film.index))"
                  style="fill:none;stroke:black;stroke-width:6;stroke-linecap:round"/>
        </g>
        <g v-else>
            <polyline v-for="(e,i) in film.elements" v-if="elementIndex(e,film.index) > 0"
                      :id="i"
                      :key="`${e._id}@${elementIndex(e,film.index)}`"
                      :points="polyline(e.points, config, elementIndex(e,film.index))"
                      style="fill:none;stroke:black;stroke-width:6;stroke-linecap:round"
                      transform="translate(0 0)"
            />
        </g>

    </svg>
</template>

<script>

    import {createChrono, createElement} from "../vuex/state";
    import {mapState} from 'vuex';
    import {elementIndex, globalToLocal, path, polyline} from "../util/geo";
    import {endChrono} from "../util/common";

    export default {
        name: "surface",
        props: ['config', 'film'],
        data: function () {
            return {
                currentElement: null,
                selectedBox: null,
                selectedInitialPoint: null,
                selectedTarget:null,
                chrono: null,
                svg: null,
                svgPoint: null,
                tools: [this.drawDown, this.selectDown]
            }
        },
        computed: {
            ...mapState(['nav'])
        },
        methods: {
            downOfTool: function (toolId, e) {
                return this.tools[toolId](e);
            },
            selectDown: function (e) {
                if (e.target.id !== "surface") {

                    this.selectedTarget = e.target;
                    this.selectedInitialPoint = this.toPoint(e);
                    const ctm = e.target.getCTM();
                    this.selectedInitialPoint.x -= ctm.e;
                    this.selectedInitialPoint.y -= ctm.f;


                    window.addEventListener("mousemove", this.moveSelection);
                    window.addEventListener("mouseup", this.upSelection);
                } else {
                    this.selectedBox = null;
                }
            },

            moveSelection: function (e) {
                const currentPoint = this.toPoint(e);
                const move = {
                    x: currentPoint.x - this.selectedInitialPoint.x,
                    y: currentPoint.y - this.selectedInitialPoint.y
                };

                this.selectedTarget.transform.baseVal.getItem(0).matrix.e = move.x;
                this.selectedTarget.transform.baseVal.getItem(0).matrix.f = move.y;

                this.selectedBox = this.selectedTarget.getBBox();
                this.selectedBox.x += move.x;
                this.selectedBox.y += move.y;

            },
            upSelection: function (e) {
                window.removeEventListener("mousemove", this.moveSelection);
                window.removeEventListener("mouseup", this.upSelection);
            },


            drawDown: function (e) {
                window.addEventListener("mousemove", this.move);
                window.addEventListener("mouseup", this.up);
                this.drawInit(this.toPoint(e));
            },
            move: function (e) {
                this.drawPoint(this.toPoint(e));
            },
            up: function () {
                window.removeEventListener("mousemove", this.move);
                window.removeEventListener("mouseup", this.up);
                this.drawEnd();
            },
            drawInit: function (point) {
                this.currentElement = createElement(this.film.index);
                this.chrono = createChrono();
                this.film.elements.push(this.currentElement);
                this.drawPoint(point);
            },
            drawPoint: function (point) {
                this.film.index++;
                if (this.film.index > this.film.length) {
                    this.film.length = this.film.index;
                }
                this.currentElement.points.push(point);
            },
            drawEnd: function () {
                this.currentElement.duration = endChrono(this.chrono);
            },


            toPoint: function (e) {
                return this.globalToLocal(e, this.svgPoint, this.svg);
            },
            globalToLocal,
            elementIndex,
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