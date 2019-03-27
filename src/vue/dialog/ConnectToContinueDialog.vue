<template>
    <v-dialog v-model="visible" persistent max-width="500px">
        <v-card>
            <v-container fluid fill-height>
                <v-layout align-center justify-center>
                    <v-flex>
                        <login-suscribe-list @close="close"/>
                        <v-list-tile-action-text>{{data.message || "Vous devez être connecté pour continuer."}}</v-list-tile-action-text>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card>
    </v-dialog>
</template>

<script>
    import {Dial} from "../../const/dial"
    import Dialog from "../mixin/Dialog"
    import LoginSuscribeList from "../user/LoginSuscribeList"
    import Do from "../../const/do"
    import {mapMutations} from "vuex"

    export default {
        name: "connect-to-continue-dialog",
        components: {LoginSuscribeList},
        mixins: [Dialog],
        props: {canStay: {type: Boolean, default: false}},
        data() {
            return {
                Dial,
                dialog: Dial.CONNECT_TO_CONTINUE
            }
        },
        methods: {
            ...mapMutations({uptDialog: Do.UPDATE_DIALOG_VISIBILITY}),
            close() {
                this.uptDialog({dialog: this.dialog, visible: false})
            }
        }
    }
</script>