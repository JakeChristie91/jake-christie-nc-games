
const request = require("supertest");
const app = require('../apps.js');
const connection = require('../db/connection');

const seed = require('../db/seeds/seed');
const testData = require('../db/data/test-data');
const selectReviewById = require("../controllers/reviews-controller.js");
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
    describe('ERRORS01', () => {
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
                });
            });
        });
    });


describe('GET/api/reviews/:review_id', () => {
    it("01: gets an id number and receives a review_id object", () => {
        return request(app)
        .get("/api/reviews/2")
              .expect(200)
              .then(({ body }) => {
                  expect(body.review.review_id).toBe(2);
                  expect(body.review).toEqual(
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
        });
    it("02: gets an id number and receives a full review_id object with all information inside", () => {
        return request(app)
              .get("/api/reviews/3")
              .expect(200)
              .then(({ body }) => {
                  expect(body.review.review_id).toBe(3);
                  expect(body.review).toEqual({
                        review_id: 3,
                        title: 'Ultimate Werewolf',
                        designer: 'Akihisa Okui',
                        owner: 'bainesface',
                        review_img_url:
                          'https://images.pexels.com/photos/5350049/pexels-photo-5350049.jpeg?w=700&h=700',
                        review_body: "We couldn't find the werewolf!",
                        category: 'social deduction',
                        created_at: "2021-01-18T10:01:41.251Z",
                        votes: 5
                      });
              });
        });    
});
    describe('ERRORS02', () => {
        test('custom status:404, responds with a custom error when passed a bad user ID', () => {
            return request(app)
               .get('/api/reviews/999999999')
               .expect(404)
               .then(({body}) => {
                expect(body.msg).toBe('No user found for review_id');
                });
            });
        });
    describe('ERRORS03', () => {
        test('custom status:400, responds with a custom error when passed a user ID which is not a number', () => {
            return request(app)
               .get('/api/reviews/df')
               .expect(400)
               .then(({body}) => {
                expect(body.msg).toBe('Invalid input');
                });
            });
        });
 

    