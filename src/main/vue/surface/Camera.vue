<template>
    <rect v-if="nav.cameraTjrsVisible || modeIs(CAMERA) && camera"
          :x="camera.x" :y="camera.y"
          :width="camera.w" :height="camera.h"
          style="fill:none;stroke:black;stroke-width:3px;stroke-opacity:0.9;pointer-events: none;"
    />
</template>

<script>

    import {mapGetters, mapState} from "vuex";
    import modes from "../../const/modes";

    export default {
        name: 'camera',
        props: ['camera'],
        data: () => ({CAMERA: modes.CAMERA}),
        computed: {
            ...mapGetters(['modeIs']),
            ...mapState(['nav'])
        }
    }
</script>