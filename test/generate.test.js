const { expect } = require('chai')
const supertest = require('supertest')
const app = require('../app')


describe('GET /generate endpoint', () => {
  it('returns array of 5', () => {
    return supertest(app)
      .get('/generate')
      .query({ n: 5 })
      .expect(200)
      .then(res => {
        expect(res.body).to.be.an('array')
        expect(res.body).to.have.lengthOf(5)
        expect(res.body).to.have.members([1,2,3,4,5])
      });
  })




})
