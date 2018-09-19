<template>
    <svg :viewBox="viewBox" v-if="colors" class="hand">
        <template v-for="x in rows">
            <template v-for="y in cols">
                <rect :x="(x-1)*rw" :y="(y-1)*rh" :width="rw" :height="rh"
                      :style="`fill:${colors[x-1][y-1]};`"
                      @click="select(x,y)"
                      :opacity="pen.opacity"
                ></rect>
            </template>
        </template>
        <rect v-if="selX && selY" :x="(selX-1)*rw" :y="(selY-1)*rh" :width="rw" :height="rh"
              style="fill:none;stroke-width: 3;stroke-dasharray:5,5"
        ></rect>
    </svg>
</template>

<script>
    import {mapState} from "vuex"

    export default {
        name: "color-panel",
        data() {
            return {
                selX: null, selY: null
            }
        },
        props: {
            w: {type: Number, default: 200},
            h: {type: Number, default: 200},
            pen: Object
        },
        computed: {
            ...mapState(['colorPanel']),
            rows() {
                return this.colorPanel.rows
            },
            cols() {
                return this.colorPanel.cols
            },
            colors() {
                return this.colorPanel.colors
            },
            viewBox() {
                return `0 0 ${this.w} ${this.h}`
            },
            rw() {
                return this.w / this.cols
            },
            rh() {
                return this.h / this.rows
            }
        },
        methods: {
            select(x, y) {
                this.selX = x
                this.selY = y
                this.$emit("input", this.colors[x-1][y-1])
            }
        }
    }
</script>