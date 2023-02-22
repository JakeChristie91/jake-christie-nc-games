
const request = require("supertest");
const app = require('../apps.js');
const connection = require('../db/connection');

const seed = require('../db/seeds/seed');
const testData = require('../db/data/test-data');
require('jest-sorted');

beforeEach(() => seed(testData));
afterAll(() => connection.end());

describe('app', () => {
    describe('/api', () => {
        test('200: it responds with the message all ok', () => {
            return request(app)
            .get("/api")
            .expect(200)
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
                expect(body.categories.length).toBe(4)
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
    describe('ERRORS', () => {
        test('status:404, responds with an error', () => {
            return request(app)
              .get('/api/categori')
              .expect(404)
              .then(({body}) => {
                expect(body.msg).toBe('404 Path Not Found');
                });
            });
        });
    describe('GET/api/reviews', () => {
            test('200: returns a array of games reviews as objects', () => {
                return request(app)      
                .get('/api/reviews')
                .expect(200)
                .then(({ body }) => {
                    expect(body.reviews.length).toBe(13)
                    body.reviews.forEach((review) => {
                        expect(review).toEqual(
                            expect.objectContaining({
                            review_id: expect.any(Number),
                            title: expect.any(String),
                            designer: expect.any(String),
                            owner: expect.any(String),
                            review_img_url: expect.any(String),
                            review_body: expect.any(String),
                            category: expect.any(String),
                            created_at: expect.any(String),
                            votes: expect.any(Number)
                        }));
                    });
                    expect(body.reviews).toBeSortedBy('created_at', {
                        descending : true,
                        coerce : false
                    })
                });
            });
        });
});
