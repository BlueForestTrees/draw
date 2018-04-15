<template>
    <v-app id="app" light>
        <svg width="100%" height="100%">
            <g>
                <defs>
                    <clipPath v-for="mi in film.f.masks" :id="`mask${mi.e._id}`" :key="`mask${mi.e._id}`">
                        <path :d="mi.e.d" :transform="`translate(${mi.tx} ${mi.ty})`"/>
                    </clipPath>
                </defs>
                <template v-for="ei in film.f.elements">
                    <!--ELEMENT WITH D-->
                    <path v-if="showPathD(ei,film)" :id="ei._id" :key="ei._id"
                          :d="ei.e.d" :style="style(ei.e.pen, ei)"
                          :transform="`translate(${ei.tx} ${ei.ty})`"
                    />
                    <!--ELEMENT WITH POINTS-->
                    <path v-else-if="ei.e.points && eii(ei,film.f.ftz) > 0" :id="ei._id" :key="`${ei._id}@${eii(ei,film.f.ftz)}`"
                          :d="eiPath(ei)" :style="style(ei.e.pen, ei)"
                          :transform="`translate(${ei.tx} ${ei.ty})`"
                    />
                </template>

                <elements v-for="sfilm in film.f.children" :film="sfilm" :key="sfilm.f.name"/>
            </g>
        </svg>
    </v-app>
</template>

<script>

    import {eii, path, showPathD, style} from "../../src/main/util/geo";

    export default {
        name: 'player',
        props: ['film'],
        methods: {
            eii, showPathD, path, style,
            eiPath: function (ei) {
                return this.path(ei.e.pen, ei.e.points, this.film.f.config, this.eii(ei, this.film.f.ftz));
            }
        }
    }
</script>