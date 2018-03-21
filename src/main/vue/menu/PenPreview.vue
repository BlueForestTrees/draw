<template>
    <svg width="100%" height="100%" viewBox="0 0 200 20" preserveAspectRatio="xMidYMid meet">
        <!--<rect x="0" y="0" width="100%" height="100%" fill="#FEDA00"/>-->
        <path v-if="pen"
              :d="path(points)"
              :style="`fill:none; stroke:${pen.color}; stroke-width:${pen.width}; stroke-linecap:round`"
        />
    </svg>
</template>

<script>
    import {path} from "../../util/geo";

    export default {
        name: "pen-preview",
        props: ["pen"],
        data: function () {
            return {
                points: [{x: 20, y: 10}, {x: 60, y: 5}, {x: 140, y: 15}, {x: 180, y: 10}]
            };
        },
        methods: {
            path
        }
    }
</script>