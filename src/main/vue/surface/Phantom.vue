<template>
    <g>
        <path v-for="ei in film.elements" :key="ei._id"
              :d="path(ei.e.points, film.config)"
              style="fill:none;stroke:black;stroke-width:3;stroke-opacity:0.1"/>
    </g>
</template>

<script>
    import {path} from "../../util/geo";

    export default {
        name: 'phantom',
        props: ['film'],
        methods: {
            path
        }
    }
</script>