/* eslint-disable no-await-in-loop */
/* eslint-disable no-underscore-dangle */
/* eslint-disable jest/no-disabled-tests */
/* eslint-disable jest/no-commented-out-tests */
const request = require('supertest')

const mongoose = require('mongoose')

const app = require('../src/app')

jest.setTimeout(120000)

describe('Session endpoints', () => {
  let createdUser

  const newUser = {
    type: 'Hairdresser',
    email: '_TestEmail_trial@trial.com',
    password: '123',
    passwordConfirmation: '123',
  }

  beforeAll(async () => {
    createdUser = (await request(app).post('/api/account').send(newUser)).body
  })

  afterAll(async () => {
    await request(app).delete(`/api/account/${createdUser.id}`)
    mongoose.disconnect()
  })

  describe('POST request to api/session', () => {
    it('should add a new session (user Login)', async () => {
      const addedSession = (
        await request(app).post('/api/session').send({ email: newUser.email, password: newUser.password })
      ).body
      expect(addedSession.email).toEqual(newUser.email)
    })

    it('should not accept users with empty email', async () => {
      const emptyEmail = {
        email: '',
        password: '123',
      }

      const emailError = (await request(app).post('/api/session').send(emptyEmail)).body
      expect(emailError.message).toBe('Email can not be empty!')
    })

    it('should not accept users with invalid email', async () => {
      const invalidEmail = {
        email: 'invalidEmail',
        password: '123',
      }

      const emailError = (await request(app).post('/api/session').send(invalidEmail)).body
      expect(emailError.message).toBe('Email is not valid!')
    })

    it('should not accept users without password', async () => {
      const emptyPass = {
        email: '_TestEmail_trial@trial.com',
        password: '',
      }

      const passError = (await request(app).post('/api/session').send(emptyPass)).body
      expect(passError.message).toBe('Password can not be empty!')
    })

    it('should not accept false login credentials', async () => {
      const falseUser = {
        email: '_TestEmail_trial@trial.com',
        password: '123123',
      }

      const authError = (await request(app).post('/api/session').send(falseUser)).body
      expect(authError.message).toEqual('Authentication failed!')
    })
  })

  describe('GET request to api/sessions', () => {
    it('should return a session cookie', async () => {
      const session = await request(app).get('/api/session')
      expect(session.status).toBe(200)
    })
  })

  describe('DELETE request to api/sessions', () => {
    it('should delete user session (user log out)', async () => {
      const session = await request(app).delete('/api/session')
      expect(session.status).toBe(200)
    })
  })
})
