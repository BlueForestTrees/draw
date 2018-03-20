<template>
    <svg width="100%" height="100%">
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
                points: [{x: 10, y: 10}, {x: 30, y: 5}, {x: 70, y: 15}, {x: 90, y: 10}]
            };
        },
        methods: {
            path
        }
    }
</script>