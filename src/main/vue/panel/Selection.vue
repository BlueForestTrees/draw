<template>
    <span>
        <v-btn-toggle v-model="film.f.config.activeMaskIdx">
            <v-btn flat v-for="(mask, id) in film.f.masks" :key="id">M{{id}}</v-btn>
        </v-btn-toggle>
        <span v-if="selection">
                <v-btn flat icon @click="maskConvert({ei:selection, film})">
                    <v-icon>group_work</v-icon>
                </v-btn>
            <v-btn flat icon @click="clone({ei:selection, film})"><v-icon>toll</v-icon></v-btn>
            <pen-edit :pen="selection.e.pen"/>
            <v-btn @click="pickPen(selection)" :disabled="noSelection"><v-icon>trending_flat</v-icon><v-icon>brush</v-icon></v-btn>
        </span>
    </span>
</template>
<script>
    //TODO scaler la selection
    //TODO scaler un groupe
    import PenEdit from "../menu/PenEdit";
    import On from "../../const/on";
    import {mapActions} from "vuex";

    export default {
        name: 'selection',
        components: {PenEdit},
        props: ['selection', 'film', 'noSelection'],
        methods: {
            ...mapActions({
                pickPen: On.PICK_PEN,
                clone: On.CLONE,
                maskConvert: On.MASK_CONVERT
            })
        }
    }
</script>