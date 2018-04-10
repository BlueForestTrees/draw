<template>
    <g>
        <template v-for="ei in film.f.elements">
            <path v-if="ei.e.d" :id="ei._id" :key="ei._id"
                  :d="ei.e.d"
                  :style="`fill:${ei.e.pen.color}`"
                  :transform="`translate(${ei.tx} ${ei.ty})`"
                  @click.ctrl="clone({ei, film})"
                  @click.alt="del({ei, film})"
            />
            <path v-else-if="ei.e.points && eii(ei,film.f.ftz) > 0"
                  :id="ei._id" :key="`${ei._id}@${eii(ei,film.f.ftz)}`"
                  :d="pathFromPoints(ei)"
                  :style="`fill:none; stroke:${ei.e.pen.color}; stroke-width:${ei.e.pen.width}; stroke-linecap:round`"
                  :transform="`translate(${ei.tx} ${ei.ty})`"
                  @click.ctrl="clone({ei, film})"
                  @click.alt="del({ei, film})"
            />
        </template>

        <elements v-for="sfilm in film.f.children" :film="sfilm" :key="sfilm.f.name"/>
    </g>
</template>

<script>
    import {eii, path} from "../../util/geo";
    import {mapActions} from "vuex";
    import On from "../../const/on";

    export default {
        name: 'elements',
        props: ['film'],
        methods: {
            eii, path,
            pathFromPoints: function (ei) {
                return this.path(ei.e.points, this.film.f.config, this.eii(ei, this.film.f.ftz));
            },
            ...mapActions({
                clone: On.CLONE,
                del: On.DELETE_ELEMENT
            })
        }
    }
</script>