const { expect } = require('chai')
const supertest = require('supertest')
const app = require('../app')


describe('app', () => {
  it('path / returns Hello killer', () => {
    return supertest(app)
     .get('/')
     .expect(200, 'Hello killer');
  })

  it('path /sum should return sum of two numbers', () => {
    return supertest(app)
      .get('/sum')
      .query({ a: 2, b: 4 })
      .expect(200, "2 + 4 Total: 6")
  })

  it('path /sum informs of bad number inputs', () => {
    return supertest(app)
      .get('/sum')
      .query({ a: "apple", b: 4 })
      .expect(400, "must be numbers")
  })

  it('path /sum informs of missing inputs', () => {
    return supertest(app)
      .get('/sum')
      .query({ b: 4 })
      .expect(400, "missing a or b params")
  })

})
