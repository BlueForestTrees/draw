import Vue from 'vue';
import Player from 'Player';

const initFilm = (el, filmData) => {
    new Vue({
        el,
        components: {Player},
        template: '<Player/>'
    });
};