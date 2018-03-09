<template>
    <v-app id="app" light>
        <left-menu :film="film"/>
        <v-content>
            <v-container fluid fill-height>
                <v-layout align-center justify-center>
                    <v-flex style="height:900px">
                        <v-card class="elevation-12" style="height:900px">
                            <surface :film="film" @select=""/>
                            <player :film="film" />
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
    import Surface from "./Surface";
    import LeftMenu from "./LeftMenu";
    import Player from "./Player";
    import {mapState} from "vuex";

    export default {
        components: {
            Player,
            LeftMenu,
            Surface
        },
        computed: {
            ...mapState(["film"])
        }
    }
</script>