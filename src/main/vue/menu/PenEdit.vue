<template>
    <span>
        <v-container>
            <v-layout>
                <v-flex xs12 sm6 class="py-2">
                    <v-switch v-model="pen.stroke" label="Fil de fer"></v-switch>
                    <v-btn-toggle v-if="pen.stroke" mandatory v-model="pen.linecap">
                        <v-btn flat v-for="(value,key,i) in linecaps" :key="key" :value="value">
                            {{i}}
                        </v-btn>
                    </v-btn-toggle>
                </v-flex>
            </v-layout>
        </v-container>
        <v-container>
            <v-layout row>Couleur <swatches v-model="pen.color" colors="text-advanced" popover-to="left"/></v-layout>
        </v-container>
        <v-slider v-model="pen.width" label="Epaisseur" min="1" step="1" max="300" thumb-label/>
        <v-slider v-model="pen.opacity" label="Transparence" min="0" step="0.01" max="1" thumb-label/>
    </span>
</template>
<script>
    import Swatches from 'vue-swatches';
    import linecaps from "../../const/linecaps";

    export default {
        name: "pen-edit",
        props: ['pen'],
        data: function () {
            return {
                linecaps
            }
        },
        components: {
            Swatches
        }
    }
</script>