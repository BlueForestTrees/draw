<template>
    <defs>
        <clipPath v-for="mi in film.f.masks" :id="`mask${mi.e._id}`" :key="`mask${mi.e._id}`">
            <path :d="mi.e.d"/>
        </clipPath>
    </defs>
</template>

<script>
    export default {
        name: 'masks',
        props: ['film']
    }
</script>