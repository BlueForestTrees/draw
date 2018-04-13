<template>
    <span>
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
        props: ['selection'],
        methods: {
            ...mapActions({
                pickPen: On.PICK_PEN
            })
        }
    }
</script>