<template>
    <g>
        <path v-for="ei in film.f.elements" v-if="elementIndex(ei,film.f.currentImage) > 0"
              :id="ei._id"
              :key="`${ei._id}@${elementIndex(ei,film.f.currentImage)}`"
              :d="path(ei.e.points, film.f.config, elementIndex(ei,film.f.currentImage))"
              style="fill:none;stroke:black;stroke-width:6;stroke-linecap:round"
              :transform="`translate(${ei.tx} ${ei.ty})`"
        />
        <elements v-for="sfilm in film.f.children" :film="sfilm" :key="sfilm.f.name"/>
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