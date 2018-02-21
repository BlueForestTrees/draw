<template>
    <v-app id="app" light>
        <left-menu :config="config" :film="film"/>
        <v-content>
            <v-container fluid fill-height>
                <v-layout align-center justify-center>
                    <v-flex style="height:900px">
                        <v-card class="elevation-12" style="height:900px">
                            <surface :config="config" :film="film"/>
                            <bar :film="film" :config="config" />
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
    import Surface from "./Surface";
    import Bar from "./Bar";
    import LeftMenu from "./LeftMenu";
    import {createConfig, createFilm} from "../vuex/state";

    //TODO menus OK, temps, viewBox, symbole, tools

    export default {
        components: {
            LeftMenu,
            Surface,
            Bar
        },
        data: function () {
            return {
                config: createConfig(),
                film: createFilm()
            }
        }
    }
</script>

