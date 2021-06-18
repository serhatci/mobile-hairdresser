/* eslint-disable jest/no-commented-out-tests */
const request = require('supertest')
const app = require('../src/app')

describe('Customers endpoints', () => {
  it('get request to /customers should give list of customers', async () => {
    await request(app).put('/api/create-test-users')
    const customerList = (await request(app).get('/api/customers')).body
    const customersExist = customerList.length > 0

    expect(customersExist).toBe(true)
  })

  it('get request to /customers should give max 10 customers', async () => {
    const customerList = (await request(app).get('/api/customers')).body
    const customersExist = customerList.length <= 10

    expect(customersExist).toBe(true)
  })

  // it('get request to /users should list users', async () => {
  //   const userList = (await request(app).get('/users')).body
  //   const usersExist = userList.length > 0

  //   expect(usersExist).toBe(true)
  // })

  // it('user should be able to like a photo', async () => {
  //   // create a photo
  //   const photo = (await request(app).post('/photos').send({ filename: 'coyotivtestingsession.png' })).body
  //   console.log('-------------photo--', photo)

  //   // create a user
  //   const userWithPhoto = (
  //     await request(app)
  //       .post('/users')
  //       .send({
  //         name: 'PhotoOwnerUser' + Date.now(),
  //         age: 27,
  //         bio: 'Someone sharing photos.',
  //       })
  //   ).body
  //   console.log('-------------userWithPhoto--', userWithPhoto)

  //   // add the photo to that user
  //   await request(app).post(`/users/${userWithPhoto._id}/adds`).send({ photoId: photo._id })

  //   // create another user
  //   const likerUser = {
  //     name: 'Liker User' + Date.now(),
  //     age: 36,
  //     bio: 'Someone liking photos.',
  //   }

  //   const createdLikerUser = (await request(app).post('/users').send(likerUser)).body
  //   console.log('-------------createdLikerUser--', createdLikerUser)

  //   // like the photo with that another user
  //   await request(app).post(`/users/${createdLikerUser._id}/likes`).send({ photoId: photo._id })

  //   const finalPhotoUser = (await request(app).get(`/users/${userWithPhoto._id}/json`)).body
  //   console.log('-------------finalPhotoUser--', finalPhotoUser)

  //   const finalLikerUser = (await request(app).get(`/users/${createdLikerUser._id}/json`)).body
  //   console.log('-------------finalLikerUser--', finalLikerUser)

  //   expect(finalPhotoUser.photos.length).toBe(1)
  //   expect(finalLikerUser.likes.length).toBe(1)

  //   console.log('finalPhotoUser.photos[0].likedBy[0]._id', finalPhotoUser.photos[0].likedBy[0]._id)

  //   expect(finalPhotoUser.photos[0].likedBy[0]._id).toBe(finalLikerUser._id)
  //   expect(finalLikerUser.likes[0]).toBe(finalPhotoUser.photos[0]._id)
  // })
})
