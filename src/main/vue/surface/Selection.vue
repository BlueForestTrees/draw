<template>
    <rect v-if="box"
          :x="box.x" :y="box.y"
          :width="box.width" :height="box.height"
          :transform="`translate(${box.tx} ${box.ty})`"

          style="fill:none;stroke:red;stroke-dasharray:5,5;stroke-width:1;stroke-opacity:0.8"
    />
</template>

<script>
    export default {
        name: 'selection',
        props: ['film'],
        computed: {
            box: function () {
                return this.film.f.selection.box;
            }
        }
    }
</script>