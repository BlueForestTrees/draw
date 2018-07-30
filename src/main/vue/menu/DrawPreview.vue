<template>
    <circle v-if="activated" :cx="pos.x" :cy="pos.y" :r="0.5*pen.size" stroke="black" stroke-width="1" fill="none"/>
</template>

<script>
    import {mapGetters, mapState} from "vuex";
    import modes from "../../const/modes";
    import {globalToLocal} from "../../util/util";

    export default {
        name: "draw-preview",
        data: () => ({
            modes,
            pos: {x: 0, y: 0}
        }),
        props: ['domRef'],
        computed: {
            ...mapGetters(['modeIs']),
            ...mapState({pen: 'activePen'}),
            activated: function () {
                return this.modeIs(modes.BRUSH);
            }
        },
        watch: {
            activated: function (v) {
                if (v) {
                    window.addEventListener("mousemove", this.onmove);
                } else {
                    window.removeEventListener("mousemove", this.onmove);
                }
            }
        },
        methods: {
            onmove: function (evt) {
                this.pos = globalToLocal(evt, this.domRef);
            }
        }
    }
</script>