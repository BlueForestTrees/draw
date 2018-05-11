<template>
    <span>
        x:{{camera.x}}, y:{{camera.y}}, w:{{camera.w}}, h:{{camera.h}}
        <v-switch label="toujours visible" v-model="nav.cameraTjrsVisible"></v-switch>
    </span>
</template>

<script>
    import {mapState} from "vuex";

    export default {
        name: 'camera',
        props: ['camera'],
        computed: {
            ...mapState({
                nav: state => state.nav,
            })
        }
    }
</script>