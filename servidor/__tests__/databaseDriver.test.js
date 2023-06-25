const mongoose = require('mongoose');
const databaseDriver = require('../databaseDriver');

jest.mock('mongoose');

describe('databaseDriver', () => {
    test('should connect to the database', () => {
        databaseDriver();

        expect(mongoose.connect).toHaveBeenCalled();
    });
});
