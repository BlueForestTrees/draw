<template>
    <v-container class="not-too-half">
        <v-layout row>
            <v-container>
                <v-layout column class="not-too-small">
                    <img src="/img/error-text.svg"/>
                    <img src="/img/error-404.svg"/>
                </v-layout>
            </v-container>
            <v-container>
                <v-layout align-center column>
                    <div class="font-weight-thin display-2">Pas trouvé :(</div>
                    <div class="font-weight-thin display-2">Not Found :(</div>
                </v-layout>
            </v-container>
        </v-layout>
    </v-container>
</template>
<script>
    export default {
        name: "not-found"
    }
</script>