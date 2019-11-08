const { expect } = require('chai')
const supertest = require('supertest')
const app = require('../app')

describe('GET /freq endpoint', () => {
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
  .query({str: 'apple'})
  .expect(200)
  .expect('Content-Type', /json/)
  .then(res => {
    expect(res.body).to.deep.equal(expected)
  })
})
