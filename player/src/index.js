import Vue from 'vue';
import PlayerSurface from './PlayerSurface';
import {navTo, play} from "../../src/main/util/playerControl";

module.exports = {
    init: function (el, film) {
        const player = {};
        new Vue({
            el,
            components: {PlayerSurface},
            data: function () {
                return {film};
            },
            template: '<PlayerSurface :film="film"/>',
            mounted: function () {
                player.play = () => play(this.film);
                player.navTo = (i) => navTo(this.film, i);
            }
        });
    }
};