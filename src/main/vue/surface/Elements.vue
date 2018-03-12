<template>
    <g>
        <path v-for="ei in film.elements" v-if="elementIndex(ei,film.index) > 0"
              :id="ei._id"
              :key="`${ei._id}@${elementIndex(ei,film.index)}`"
              :d="path(ei.e.points, film.config, elementIndex(ei,film.index))"
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