const { expect } = require('chai')
const supertest = require('supertest')
const app = require('../app')

describe('GET /freq endpoint', () => {
  it("returns correct json for str=apple", () => {
    const expected = {
      "count": 4,
      "average": 1.25,
      "highest": "p",
      "p": 2,
      "a": 1,
      "l": 1,
      "e": 1
    }

    return supertest(app)
      .get('/freq')
      .query({ str: 'apple' })
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body).to.deep.equal(expected)
      })
  })

  it("is case insensitive str=ApPle", () => {
    const expected = {
      "count": 4,
      "average": 1.25,
      "highest": "p",
      "p": 2,
      "a": 1,
      "l": 1,
      "e": 1
    }

    return supertest(app)
      .get('/freq')
      .query({ str: 'ApPle' })
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body).to.deep.equal(expected)
      })
  })

  it("works on any string character", () => {
    const expected = {
      "count": 4,
      "average": 2,
      "highest": "6",
      "6": 3,
      ";": 2,
      ".": 2,
      "a": 1
    }

    return supertest(app)
      .get('/freq')
      .query({ str: ';;a666..' })
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body).to.deep.equal(expected)
      })
  })
})
