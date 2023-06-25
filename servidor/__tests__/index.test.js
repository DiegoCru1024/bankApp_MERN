const request = require('supertest');
const app = require('../index');

describe('Server', () => {
    let server;

    beforeAll(() => {
        server = app.listen(3000);
    });

    afterAll((done) => {
        server.close(done);
    });

    it('should respond with status 200 for POST /loginAPI', async () => {
        const userData = {
            email: 'diego.cruces@unmsm.edu.pe',
            password: 'Mauricio0104'
        };

        const response = await request(app)
            .post('/loginAPI')
            .send(userData);

        expect(response.status).toBe(200);
    });


});
