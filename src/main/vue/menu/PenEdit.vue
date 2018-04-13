<template>
    <span>
        <v-switch v-model="pen.stroke" label="Contour"></v-switch>
        <swatches v-model="pen.color" colors="text-advanced" popover-to="left"/>
        <v-slider v-model="pen.width" label="width" min="1" step="1" max="100" thumb-label/>
        <v-slider v-model="pen.opacity" label="opacity" min="0" step="0.01" max="1" thumb-label/>
    </span>
</template>
<script>
    import Swatches from 'vue-swatches';

    export default {
        name: "pen-edit",
        props: ['pen'],
        components: {
            Swatches
        }
    }
</script>