<template>
    <g>
        <template v-for="ei in film.f.elements">
            <!--ELEMENT WITH D-->
            <path v-if="showPathD(ei,film)" :id="ei._id" :key="ei._id"

                  :d="ei.e.d" :style="style(ei.e.pen, ei)"

                  :transform="`translate(${ei.tx} ${ei.ty})`"
                  @click.ctrl="clone({ei, film})" @click.alt="del({ei, film})"
            />
            <!--ELEMENT WITH POINTS-->
            <path v-else-if="ei.e.points && eii(ei,film.f.ftz) > 0" :id="ei._id" :key="`${ei._id}@${eii(ei,film.f.ftz)}`"

                  :d="eiPath(ei)" :style="style(ei.e.pen, ei)"

                  :transform="`translate(${ei.tx} ${ei.ty})`"
                  @click.ctrl="clone({ei, film})" @click.alt="del({ei, film})"
            />
        </template>

        <elements v-for="sfilm in film.f.children" :film="sfilm" :key="sfilm.f.name"/>
    </g>
</template>

<script>
    import {eii, path, showPathD, style} from "../../util/geo";
    import {mapActions} from "vuex";
    import On from "../../const/on";

    export default {
        name: 'elements',
        props: ['film'],
        methods: {
            eii, showPathD, path, style,
            eiPath: function (ei) {
                return this.path(ei.e.pen, ei.e.points, this.film.f.config, this.eii(ei, this.film.f.ftz));
            },
            ...mapActions({
                clone: On.CLONE,
                del: On.DELETE_ELEMENT
            })
        }
    }
</script>