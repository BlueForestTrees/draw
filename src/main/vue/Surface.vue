<template>
    <svg @mousedown="downOfTool(config.tool,$event)" id="surface" width="100%" height="100%" class="surface"
         ref="surface"
         xmlns="http://www.w3.org/2000/svg">

        <rect v-if="currentBBox" :x="currentBBox.x" :y="currentBBox.y" :width="currentBBox.width"
              :height="currentBBox.height"
              style="fill:none;stroke:blue;stroke-width:1;stroke-opacity:0.8"
              :transform="`translate(${currentBBox.tx} ${currentBBox.ty})`"
        />

        <polyline v-for="ei in film.elements" :key="ei._id" v-if="film.showPhantom"
                  :points="polyline(ei.e.points, config)"
                  style="fill:none;stroke:black;stroke-width:3;stroke-opacity:0.1"/>

        <g v-if="config.smooth">
            <path v-for="(ei,i) in film.elements" v-if="elementIndex(ei,film.index) > 0"
                  :id="ei._id"
                  :key="`${ei._id}@${elementIndex(ei,film.index)}`"
                  :d="path(ei.e.points, config, elementIndex(ei,film.index))"
                  style="fill:none;stroke:black;stroke-width:6;stroke-linecap:round"
                  :transform="`translate(${ei.tx} ${ei.ty})`"
            />
        </g>
        <g v-else>
            <polyline v-for="(ei,i) in film.elements" v-if="elementIndex(ei,film.index) > 0"
                      :id="ei._id"
                      :key="`${ei._id}@${elementIndex(ei,film.index)}`"
                      :points="polyline(ei.e.points, config, elementIndex(ei,film.index))"
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
    import Vue from 'vue';

    export default {
        name: "surface",
        props: ['config', 'film'],
        data: function () {
            return {
                drawingElement: null,
                currentBBox: null,
                initialCTM: null,
                downPoint: null,
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
                const currentElementSvg = e.target;
                if (currentElementSvg.id && currentElementSvg.id !== "surface") {
                    const selection = _.find(this.film.elements, {_id: currentElementSvg.id});
                    this.config.selection = selection;
                    this.select(this.config.selection);
                    window.addEventListener("mousemove", this.selectMove);
                    window.addEventListener("mouseup", this.selectUp);
                } else {
                    this.downPoint = null;
                    this.config.selection = null;
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
                this.currentBBox.tx = this.config.selection.tx = this.initialCTM.e + move.x;
                this.currentBBox.ty = this.config.selection.ty = this.initialCTM.f + move.y;
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
            "config.selection": function (n, o) {
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