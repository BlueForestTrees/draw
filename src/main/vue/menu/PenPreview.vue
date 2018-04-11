<template>
    <svg width="100%" height="100%" viewBox="0 0 200 20" preserveAspectRatio="xMidYMid meet">
        <path :d="penPreviewPath" :style="style(pen)"/>
    </svg>
</template>

<script>
    import {path, style} from "../../util/geo";

    export default {
        name: "pen-preview",
        props: ["pen"],
        data: function () {
            return {
                points: [{x: 20, y: 10}, {x: 60, y: 5}, {x: 140, y: 15}, {x: 180, y: 10}]
            };
        },
        methods: {
            path, style
        },
        computed: {
            penPreviewPath: function () {
                return this.path(this.pen, this.points);
            }
        }
    }
</script>