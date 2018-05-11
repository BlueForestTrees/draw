<template>
    <span>
        <v-btn-toggle v-model="nav.zoomSide">
            <v-btn flat><v-icon>zoom_in</v-icon></v-btn>
            <v-btn flat><v-icon>zoom_out</v-icon></v-btn>
            <v-btn flat>1 : 1</v-btn>
        </v-btn-toggle>
    </span>
</template>

<script>
    import {mapState} from 'vuex';

    export default {
        name: 'zoom',
        props: ['film'],
        computed: {
            ...mapState(['nav'])
        },
        methods: {
            reinitZoom() {
                this.film.f.zoom = 1;
                this.film.f.panx = 0;
                this.film.f.pany = 0;
            }
        },
        watch: {
            "nav.zoomSide": function (v, oldV) {
                if (v === 2) {
                    this.reinitZoom();
                    this.nav.zoomSide = oldV;
                }
            }
        }
    }
</script>