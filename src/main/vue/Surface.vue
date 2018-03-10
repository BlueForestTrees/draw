<template>
    <svg @mousedown="downOfMode(film.config.activeTool,$event)" id="surface" width="100%" height="100%" class="surface"
         ref="surface">

        <rect v-if="currentBBox" :x="currentBBox.x-3" :y="currentBBox.y-3" :width="currentBBox.width+3"
              :height="currentBBox.height+3"
              style="fill:none;stroke:black;stroke-dasharray:5,5;stroke-width:1;stroke-opacity:0.8"
              :transform="`translate(${currentBBox.tx} ${currentBBox.ty})`"
        />

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

    import {createChrono, createElement, createElementInstance} from "../vuex/state/state";
    import {mapState} from 'vuex';
    import {elementIndex, globalToLocal, minus, path, polyline} from "../util/geo";
    import {endChrono} from "../util/common";
    import _ from 'lodash';

    export default {
        name: "surface",
        props: ['film'],
        data: function () {
            return {
                drawingElement: null,
                currentBBox: null,
                initialCTM: null,
                downPoint: null,
                chrono: null,
                svg: null,
                svgPoint: null,
                modes: [this.drawDown, this.selectDown]
            }
        },
        computed: {
            ...mapState(['nav'])
        },
        methods: {
            downOfMode: function (modeIdx, e) {
                return this.modes[modeIdx](e);
            },
            selectDown: function (e) {
                const currentElementSvg = e.target;
                if (currentElementSvg.id && currentElementSvg.id !== "surface") {
                    const selection = _.find(this.film.elements, {_id: currentElementSvg.id});
                    this.film.config.selection = selection;
                    this.select(this.film.config.selection);
                    window.addEventListener("mousemove", this.selectMove);
                    window.addEventListener("mouseup", this.selectUp);
                } else {
                    this.downPoint = null;
                    this.film.config.selection = null;
                    this.initialCTM = null;
                    this.currentBBox = null;
                }
            },
            select: function (element) {
                if (element) {
                    const currentElementSvg = this.$refs.surface.getElementById(element._id);
                    this.initialCTM = currentElementSvg.getCTM();
                    this.currentBBox = currentElementSvg.getBBox();
                    this.currentBBox.tx = this.initialCTM.e;
                    this.currentBBox.ty = this.initialCTM.f;
                } else {
                    this.initialCTM = null;
                    this.currentBBox = null;
                }
            },
            selectMove: function (e) {
                const movePoint = this.toPoint(e);
                this.downPoint = this.downPoint || movePoint;
                const move = minus(movePoint, this.downPoint);
                this.currentBBox.tx = this.film.config.selection.tx = this.initialCTM.e + move.x;
                this.currentBBox.ty = this.film.config.selection.ty = this.initialCTM.f + move.y;
            },
            selectUp: function (e) {
                window.removeEventListener("mousemove", this.selectMove);
                window.removeEventListener("mouseup", this.selectUp);

                this.downPoint = null;
            },


            drawDown: function (e) {
                this.drawingElement = createElementInstance(createElement());
                this.drawingElement.position = this.film.index;
                this.chrono = createChrono();
                this.film.elements.push(this.drawingElement);
                this.drawMove(e);
                window.addEventListener("mousemove", this.drawMove);
                window.addEventListener("mouseup", this.drawUp);
            },
            drawMove: function (e) {
                this.drawingElement.e.points.push(this.toPoint(e));
                this.film.index++;
                if (this.film.index > this.film.length) {
                    this.film.length = this.film.index;
                }
            },
            drawUp: function () {
                this.drawingElement.e.duration = endChrono(this.chrono);
                window.removeEventListener("mousemove", this.drawMove);
                window.removeEventListener("mouseup", this.drawUp);
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
        watch: {
            "film.config.selection": function (n, o) {
                this.select(n);
            }
        }
    }
</script>

<style>
    .surface {
        pointer-events: all;
    }
</style>