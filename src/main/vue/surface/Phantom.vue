<template>
    <g style="pointer-events: none">
        <template v-for="ei in film.f.elements">



            <path v-if="ei.e.d" :key="ei._id"
                  :d="ei.e.d"
            />
            <path v-else-if="ei.e.points" :key="ei._id"
                  :d="path(ei.e.points, film.f.config)"
                  style="fill:none;stroke:black;stroke-width:3;stroke-opacity:0.1"
                  :transform="`translate(${ei.tx} ${ei.ty})`"
            />
        </template>

        <elements v-for="sfilm in film.f.children" :film="sfilm" :key="sfilm.f.name"/>

    </g>
</template>

<script>
    import {path} from "../../util/geo";

    export default {
        name: 'phantom',
        props: ['film'],
        methods: {
            path: path
        }
    }
</script>