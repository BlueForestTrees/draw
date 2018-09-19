<template>
    <rect v-if="box"
          :x="box.x" :y="box.y"
          :width="box.size" :height="box.height"
          :transform="`translate(${box.tx} ${box.ty})`"
          style="fill:none;stroke:black;stroke-dasharray:50,50;stroke-width:1;stroke-opacity:1;pointer-events: none;"
    />
</template>

<script>
    export default {
        name: 'selection',
        props: ['film'],
        computed: {
            box: function () {
                return this.film && this.film.f.selection.box
            }
        }
    }
</script>