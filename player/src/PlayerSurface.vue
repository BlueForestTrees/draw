<template>
    <svg :width="film.tw" :height="film.th" :viewBox="`${film.tx} ${film.ty} ${film.tw} ${film.th}`">
        <g>
            <defs>
                <clipPath v-for="mi in film.f.masks" :id="`mask${mi.e._id}`" :key="`mask${mi.e._id}`">
                    <path :d="mi.e.d" :transform="`translate(${mi.tx} ${mi.ty})`"/>
                </clipPath>
            </defs>
            <template v-for="ei in film.f.elements">
                <path v-if="showPathD(ei,film)" :id="ei._id" :key="ei._id" :d="ei.e.d" :style="style(ei.e.pen, ei)" :transform="`translate(${ei.tx} ${ei.ty})`"/>
                <path v-else-if="ei.e.points && eii(ei,film.f.ftz) > 0" :id="ei._id" :key="`${ei._id}@${eii(ei,film.f.ftz)}`" :d="eiPath(ei)" :style="style(ei.e.pen, ei)" :transform="`translate(${ei.tx} ${ei.ty})`"/>
            </template>
            <elements v-for="sfilm in film.f.children" :film="sfilm" :key="sfilm.f.name"/>
        </g>
    </svg>
</template>

<script>
    import {eii, path, showPathD, style} from "../../src/main/util/playerSurface";

    export default {
        name: 'player-surface',
        props: ['film'],
        methods: {
            eii, showPathD, path, style,
            eiPath: function (ei) {
                return this.path(ei.e.pen, ei.e.points, this.film.f.config, this.eii(ei, this.film.f.ftz));
            }
        }
    }
</script>