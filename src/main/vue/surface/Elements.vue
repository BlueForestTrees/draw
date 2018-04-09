<template>
    <g>
        <svg-film v-for="ei in film.f.elements" v-if="ei.e.svg" :svg="ei.e.svg" :key="`${ei._id}`"/>

        <!--svg-->

        <!--svg d path-->

        <!--POINTS-->
        <path v-for="ei in film.f.elements" v-if="ei.e.points && eii(ei,film.f.ftz) > 0"
              :id="ei._id"
              :key="`${ei._id}@${eii(ei,film.f.ftz)}`"
              :d="path(ei.e.points, film.f.config, eii(ei,film.f.ftz))"
              :style="`fill:none; stroke:${ei.e.pen.color}; stroke-width:${ei.e.pen.width}; stroke-linecap:round`"
              :transform="`translate(${ei.tx} ${ei.ty})`"
        />

        <elements v-for="sfilm in film.f.children" :film="sfilm" :key="sfilm.f.name"/>
    </g>
</template>

<script>
    import {eii, path} from "../../util/geo";
    import SvgFilm from "./SvgFilm";

    export default {
        components: {SvgFilm},
        name: 'elements',
        props: ['film'],
        methods: {
            eii, path
        }
    }
</script>