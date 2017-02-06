'use strict';

const assert = require('assert');
const validator = require('../../validators/request-validator');

describe('Testing HTTP Headers', () => {
    it('Should have a content type field.', () => {
        const test_header = {
            host: 'localhost:6543',
            'content-length': '17'
        };

        assert(validator.validate_headers(test_header) === false);
    });

    it('Should have a content-type: application/json.', () => {
        const test_header = {
            host: 'localhost:6543',
            'content-length': '17',
            'content-type': 'application/json'
        };

        assert(validator.validate_headers(test_header) === true);
    });

    it('Should pass content-type: aPpLiCatiON/jSoN. Case should not matter.', () => {
        const test_header = {
            host: 'localhost:6543',
            'content-length': '17',
            'content-type': 'aPpLiCatiON/jSoN'
        };

        assert(validator.validate_headers(test_header) === true);
    });

    it('Should fail the other content-types than content-type: application/json.', () => {
        const test_header = {
            host: 'localhost:6543',
            'content-length': '17',
            'content-type': 'application/pdf'
        };

        assert(validator.validate_headers(test_header) === false);
    });
});
