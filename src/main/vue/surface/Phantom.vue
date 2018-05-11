<template>
    <g style="pointer-events: none">

        <template v-for="mi in visibleMasks">
            <path v-if="mi.e.d" :key="mi._id"
                  :d="mi.e.d"
                  style="fill:black;fill-opacity:0.1"
                  :transform="`translate(${mi.tx} ${mi.ty})`"
            />
        </template>

        <template v-for="ei in film.f.elements">
            <path v-if="ei.e.d" :key="ei._id"
                  :d="ei.e.d"
                  :style="phantomStyle(ei)"
                  :transform="`translate(${ei.tx} ${ei.ty})`"
            />
            <path v-else-if="ei.e.points" :key="ei._id"
                  :d="path(ei.e.pen, ei.e.points, film.f.config)"
                  :style="phantomStyle(ei)"
                  :transform="`translate(${ei.tx} ${ei.ty})`"
            />
        </template>

        <elements v-for="sfilm in film.f.children" :film="sfilm" :key="sfilm.f.name"/>

    </g>
</template>

<script>
    import {path, style} from "../../util/playerSurface";
    import {mapGetters} from "vuex";

    export default {
        name: 'phantom',
        props: ['film'],
        methods: {
            path, style,
            phantomStyle: function (ei) {
                return this.style(ei.e.pen, ei) + "opacity:0.1;stroke-opacity:0.1";
            }
        },
        computed: {
            ...mapGetters(['visibleMasks'])
        }
    }
</script>