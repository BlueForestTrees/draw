import _ from 'lodash';

export default {
    imageCount: (state, getters) => film => {
        const elementLength = _.reduce(film.elements, (imageCount, ei) => Math.max(imageCount, ei.e.points.length), 0);
        const sfilmLength = _.reduce(film.children, (imageCount, sfilm) => Math.max(imageCount, getters.imageCount(sfilm)), 0);
        let number = Math.max(elementLength, sfilmLength);

        console.log("imageCount", number);
        return number;
    }
}