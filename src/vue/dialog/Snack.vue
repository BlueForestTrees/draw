<template>
    <v-snackbar
            v-model="snack.visible"
            auto-height bottom
            :multi-line="snack.multiline"
            :timeout="snack.timeout"
            :vertical="snack.vertical"
            :color="snack.color"
    >
        <v-layout row align-center @click="dispatchAction" class="hand">
            <v-btn v-if="snack.icon" flat><v-icon>{{snack.icon}}</v-icon></v-btn>
            <v-flex>{{ snack.text }}</v-flex>
            <v-btn icon flat color="white" @click="close"><v-icon>close</v-icon></v-btn>
        </v-layout>
    </v-snackbar>
</template>

<script>

    export default {
        name: "snack",
        props: ['snack'],
        methods: {
            close: function () {
                this.snack.visible = false
            },
            dispatchAction() {
                if(this.snack.action){
                    this.$store.dispatch(this.snack.action)
                }
                this.close()
            }
        }
    }
</script>