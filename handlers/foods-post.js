'use strict';

const
    validator = require('../validators/request-validator'),
    foodsServices = require('../services/foods-services');


const foodsPostHandler = (request, response) => {
    if (validator.validate_headers(request.headers)) {
        // Filters out the foods with no stock and chilli
        const allFoods = request.body.foods;
        const specialFoods = foodsServices.filterSpecialFoods(allFoods);

        // Generates the final output
        const specialFoodsSummary = specialFoods.map(food => {
            const errors = foodsServices.buildMissingKeysError(food);

            // If there are errors immediately notify the HTTP client
            if (errors.length > 0) {
                response.statusCode = 400;
                return response.send({ errors, food });
            }

            // If no error keep on building the final output
            return {
                image: food.image,
                slug: food.slug,
                title: food.title
            }
        });

        // Sends the final output to the HTTP client
        response.send({
            response: specialFoodsSummary
        });
    } else {    // If the content-type is not properly set in HTTP header
        response.statusCode = 400;
        return response.send({
            error: 'HTTP Request header is missing content-type: application/json'
        });
    }
};

module.exports = foodsPostHandler;
