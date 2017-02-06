'use strict';

const validator = {
    /**
     * Verifies the HTTP header has a proper content type
     * @param headers
     * @returns {boolean}
     */
    validate_headers: (headers) => {
        if ('content-type' in headers === false) {
            return false;
        } else if (headers['content-type'].toLowerCase() !== 'application/json') {
            return false;
        } else {
            return true;
        }
    }
};

module.exports = validator;
