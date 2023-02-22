
const request = require("supertest");
const app = require('../apps.js');
const connection = require('../db/connection');

const seed = require('../db/seeds/seed');
const testData = require('../db/data/test-data');

beforeEach(() => seed(testData, ));
afterAll(() => connection.end());

describe('app', () => {
    describe('/api', () => {
        test('200: it responds with the message all ok', () => {
            return request(app)
            .get("/api")
            .then((response) => {
                expect(response.body.message).toBe("all ok");
            })
        })
    });
    describe('GET/api/categories', () => {
        test('200: returns a array of games category objects', () => {
            return request(app)      
            .get('/api/categories')
            .expect(200)
            .then(({ body }) => {
                body.categories.forEach((category) => {
                    expect(category).toEqual(
                        expect.objectContaining({
                        slug: expect.any(String),
                        description: expect.any(String)
                    }));
                });
            });
        });
    });
});
