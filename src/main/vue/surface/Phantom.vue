<template>
    <g>
        <path v-for="ei in film.f.elements" :key="ei._id"
              :d="path(ei.e.points, film.f.config)"
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