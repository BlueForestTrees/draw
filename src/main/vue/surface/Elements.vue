<template>
    <g>
        <path v-for="ei in film.elements" v-if="elementIndex(ei,film.currentImage) > 0"
              :id="ei._id"
              :key="`${ei._id}@${elementIndex(ei,film.currentImage)}`"
              :d="path(ei.e.points, film.config, elementIndex(ei,film.currentImage))"
              style="fill:none;stroke:black;stroke-width:6;stroke-linecap:round"
              :transform="`translate(${ei.tx} ${ei.ty})`"
        />
        <elements v-for="sfilm in film.children" :film="sfilm" :key="sfilm.name"/>
    </g>
</template>

<script>
    import {elementIndex, path} from "../../util/geo";

    export default {
        name: 'elements',
        props: ['film'],
        methods: {
            elementIndex, path
        }
    }
</script>