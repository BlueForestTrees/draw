<template>
    <v-container fluid fill-height class="not-too-large not-too-small">
        <v-layout align-center justify-center>
            <v-flex xs12 sm8 md8>
                <v-card class="elevation-2">
                    <slot/>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
    export default{
        name:"card"
    }
</script>