<template>
    <v-list-tile-avatar size="64px">
        <v-avatar slot="activator" :style="{backgroundColor:user.color}" style="margin-left: -1.5em;">
            <span class="display-1 font-weight-bold" :style="{color:overcolor(user.color), marginTop:'0.1em'}">{{initiales(user.fullname)}}</span>
        </v-avatar>
    </v-list-tile-avatar>
</template>
<script>
    import {initiales, overcolor} from "../../util/util"

    export default {
        name: 'user-icon',
        props: ['user', 'size'],
        methods: {
            overcolor, initiales
        }
    }
</script>