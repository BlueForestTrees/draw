<template>
    <v-dialog width="800px" v-model="visible" fullscreen transition="dialog-bottom-transition" :overlay="false" scrollable>
        <v-card tile>
            <v-toolbar card dark color="primary">
                <v-btn icon @click.native="visible = false" dark>
                    <v-icon>close</v-icon>
                </v-btn>
                <v-toolbar-title>Importer un élément</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                    <v-btn dark flat @click.native="doImport(path)">Import</v-btn>
                </v-toolbar-items>
            </v-toolbar>
            <v-card-text>
                <v-text-field multi-line placeholder="Coller ici le contenu de la balise 'd'" v-model="path"/>
            </v-card-text>
        </v-card>

    </v-dialog>
</template>

<script>
    import Do from "../../const/do";
    import {mapMutations, mapState} from "vuex";

    export default {
        data: () => ({path: ""}),
        methods: {
            ...mapMutations({
                doImport: Do.IMPORT,
                toggleDialog: Do.SHOW_IMPORT_DIALOG
            })
        },
        computed: {
            ...mapState({
                importVisible: state => state.importDialog.visible,
            }),
            visible: {
                get: function () {
                    return this.importVisible;
                },
                set: function (val) {
                    this.toggleDialog(val);
                }
            }
        }
    }
</script>