<template>
    <span v-if="selection">
        <v-btn flat @click="clone({ei:selection, film})"><v-icon>toll</v-icon></v-btn>
        <pen-edit :pen="selection.e.pen"/>
        <v-btn @click="pickPen(selection)"><v-icon>trending_flat</v-icon><v-icon>brush</v-icon></v-btn>
    </span>
</template>
<script>
    import PenEdit from "../menu/PenEdit";
    import On from "../../const/on";
    import {mapActions} from "vuex";

    export default {
        name: 'selection',
        components: {PenEdit},
        props: ['selection', 'film'],
        methods: {
            ...mapActions({
                pickPen: On.PICK_PEN,
                clone: On.CLONE
            })
        }
    }
</script>