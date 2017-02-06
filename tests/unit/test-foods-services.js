'use strict';

const assert = require('assert');
const FoodsServices = require('../../services/foods-services');

describe('Testing Foods services filter', () => {
    it('Should filter out the data with no stock or missing chilli.', () => {
        const foods = [
            { stock_count: 0, hot_chilli: true },
            { stock_count: 2, hot_chilli: false },
            { stock_count: 3, hot_chilli: true },
            { stock_count: 5, hot_chilli: true },
            { stock_count: 0, hot_chilli: true },
            { stock_count: 2, hot_chilli: true },
            { stock_count: 0, hot_chilli: false },
            { stock_count: 0, hot_chilli: true },
            { stock_count: 1, hot_chilli: true },
            { stock_count: 12, hot_chilli: true },
            { stock_count: 0, hot_chilli: false },
            { stock_count: 2, hot_chilli: false },
        ];

        const specialFoods = FoodsServices.filterSpecialFoods(foods);
        assert(specialFoods.length === 5);
    });
});

describe('Testing Foods services error builder', () => {
    it('Should give a title key missing error when the title is not found.', () => {
        const food = {
            slug: 'test food 123',
            image: {
                showImage: 'http://test-food-123.food/image.png'
            },
            hot_chilli: true
        };

        const actual_error = FoodsServices.buildMissingKeysError(food)[0];
        const expected_error = 'Food is missing title.';

        assert(actual_error === expected_error);
    });

    it('Should still give a title key missing error when the title has a spelling typo.', () => {
        const food = {
            slug: 'test food 456',
            image: {
                showImage: 'http://test-food-456.food/image.png'
            },
            country: 'UK',
            title_with_a_spelling_typo: 'Test Food 456'
        };

        const actual_error = FoodsServices.buildMissingKeysError(food)[0];
        const expected_error = 'Food is missing title.';

        assert(actual_error === expected_error);
    });

    it('Should give a image key missing error', () => {
        const food = {
            slug: 'momo-cha',
            thumbnail: 'http://test-food-123.food/momocha.png',
            hot_chilli: true,
            origin: "Tibet",
            title: 'Momo'
        };

        const actual_error = FoodsServices.buildMissingKeysError(food)[0];
        const expected_error = 'Food is missing a thumbnail image.';

        assert(actual_error === expected_error);
    });

    it('Should still give a image key missing error when the key image has a typo', () => {
        const food = {
            slug: 'dhido',
            image123: {
                showImage: 'http://test-food-123.food/image.png',
            },
            origin: "Nepal",
            hot_chilli: true
        };

        const actual_error = FoodsServices.buildMissingKeysError(food)[0];
        const expected_error = 'Food is missing a thumbnail image.';

        assert(actual_error === expected_error);
    });

    it('Should return 3 errors when all image, title and slug are missing or have typo', () => {
        const food = {
            slug_with_a_typo: 'thakali-sausage',
            image123: {
                showImage: 'http://test-food-123.food/thakali-sausage.png',
            },
            origin: 'Nepal'
        };

        const total_actual_errors = FoodsServices.buildMissingKeysError(food).length;
        assert(total_actual_errors === 3);
    });
});
