<template>
    <span>
        <v-slider v-model="pen.size" label="Epaisseur" min="1" step="1" max="300" thumb-label/>
        <v-slider v-model="pen.length" label="Longueur" min="0" step="1" max="100" thumb-label/>
        <v-slider v-model="pen.opacity" label="Opacité" min="0" step="0.01" max="1" thumb-label/>
    </span>
</template>
<script>
    import {mapState} from "vuex";

    export default {
        name: "pen-edit",
        props: ['pen'],
        components: {
        },
        computed: {
            ...mapState(['nav'])
        }
    }
</script>