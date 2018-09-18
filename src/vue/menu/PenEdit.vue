<template>
    <span>
        <v-layout>
            <v-flex xs12 sm6 class="py-2">
                <v-switch v-model="pen.stroke" label="Fil de fer"></v-switch>
                <v-switch v-model="nav.autoreturn" label="Rembobinage auto."></v-switch>
            </v-flex>
        </v-layout>
        <swatches v-model="pen.color" colors="text-advanced" popover-to="left"/>
        <v-slider v-model="pen.size" label="Epaisseur" min="1" step="1" max="300" thumb-label/>
        <v-slider v-model="pen.length" label="Longueur" min="0" step="1" max="100" thumb-label/>
        <v-slider v-model="pen.opacity" label="Transparence" min="0" step="0.01" max="1" thumb-label/>
    </span>
</template>
<script>
    import Swatches from 'vue-swatches';
    import {mapState} from "vuex";

    export default {
        name: "pen-edit",
        props: ['pen', 'disabled'],
        components: {
            Swatches
        },
        computed: {
            ...mapState(['nav'])
        }
    }
</script>