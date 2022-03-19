const request = require('supertest')('http://localhost:8080')
const assert = require('chai').assert

let id = 0
describe('Bookmark API', () => {
  it('POST (video) /bookmark/add', () => {
    const data = { "url": "https://vimeo.com/565486457" }
    return request
      .post('/bookmark/add')
      .send(data)
      .expect(200)
      .then((res) => {
        assert.isNotEmpty(res.body.video)
        assert.hasAnyKeys(res.body, 'id')
        id = res.body.id
        assert.equal(res.body.url, data.url)
      })
  })

  it('POST (photo) /bookmark/add', () => {
    const data = { "url": "http://www.flickr.com/photos/bees/2341623661/" }
    return request
      .post('/bookmark/add')
      .send(data)
      .expect(200)
      .then((res) => {
        assert.isNotEmpty(res.body.photo)
        assert.hasAnyKeys(res.body, 'id')
        assert.equal(res.body.url, data.url)
      })
  })

  it('GET /bookmark/read/:id', () => {
    return request
      .get('/bookmark/read/' + id)
      .expect(200)
      .then((res) => {
        assert.hasAnyKeys(res.body, 'id')
        assert.equal(res.body.id, id)
      })
  })

  it('GET all bookmark/', () => {
    return request
      .get('/bookmark/')
      .expect(200)
      .then((res) => {
        assert.equal(Array.isArray(res.body), true)
        assert.ok(res.body.length >= 2)
      })
  })

  it('PUT /bookmark/edit/:id', () => {
    const data = {
      title: 'nouveau titre',
      video: { width: 200 }
    }
    return request
      .put('/bookmark/edit/' + id)
      .send(data)
      .expect(200)
      .then((res) => {
        assert.hasAnyKeys(res.body, 'save')
        assert.equal(res.body.save, true)
      })
  })

  it('DELETE /bookmark/delete/:id', () => {
    // assert returned response should be empty
    return request.delete('/bookmark/delete/' + id)
      .expect(200)
      .then((res) => {
        assert.hasAnyKeys(res.body, 'save')
        assert.equal(res.body.save, true)
      })
  })
})
