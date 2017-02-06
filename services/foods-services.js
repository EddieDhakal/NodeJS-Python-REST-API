'use strict';

/**
 * Services related to Foods
 * As the services are written in a pure functional way (like in Haskell)
 *  with no side effects, it makes unit testing a lot more simpler.
 * @type {{filterSpecialFoods: ((p1:*)), buildMissingKeysError: ((p1:*))}}
 */
const FoodsServices = {
    /**
     * Takes a list of foods and filters out the one with no chilli or out of stock.
     * @param foods
     * @returns {Array.<T>}
     */
    filterSpecialFoods: (foods) => {
        return foods
            .filter(food => food.stock_count > 0)
            .filter(food => food.hot_chilli === true);
    },

    /**
     * Checks if the image, slug and title keys are missing for a given food.
     * @param food
     * @returns {Array} errors
     */
    buildMissingKeysError: (food) => {
        let errors = [];

        if (!food.image) errors.push('Food is missing a thumbnail image.');
        if (!food.slug) errors.push('Food is missing slug.');
        if (!food.title) errors.push('Food is missing title.');

        return errors;
    }
};

module.exports = FoodsServices;
