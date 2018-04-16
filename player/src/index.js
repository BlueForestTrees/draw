import Vue from 'vue';
import Player from './PlayerSurface';

var vm = new Vue({
    el: "#film",
    components: {Player},
    template: '<Player/>'
});