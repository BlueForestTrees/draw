<template>
    <span>
        <v-btn-toggle v-model="film.f.config.activeMaskIdx">
            <v-btn flat v-for="(mask, id) in film.f.masks" :key="id">M{{id}}</v-btn>
        </v-btn-toggle>
        <span v-if="selection">
            <v-btn flat icon @click="maskConvert({ei:selection, film})"><v-icon>group_work</v-icon></v-btn>
            <v-btn flat icon @click="clone({ei:selection, film})"><v-icon>toll</v-icon></v-btn>
            <v-btn flat icon @click="del({ei:selection, film})"><v-icon>delete</v-icon></v-btn>
            <v-btn flat icon @click="pickPen(selection)"><v-icon small>trending_flat</v-icon><v-icon small>brush</v-icon></v-btn>
        </span>
    </span>
</template>
<script>
    import PenEdit from "../menu/PenEdit";
    import On from "../../const/on";
    import {mapActions} from "vuex";
    import ColorPanel from "../menu/ColorPanel"

    export default {
        name: 'selection',
        components: {ColorPanel, PenEdit},
        props: ['selection', 'film'],
        methods: {
            ...mapActions({
                pickPen: On.PICK_PEN,
                clone: On.CLONE,
                del: On.DELETE_ELEMENT,
                maskConvert: On.MASK_CONVERT
            })
        }
    }
</script>