/* eslint-disable no-await-in-loop */
/* eslint-disable no-underscore-dangle */
/* eslint-disable jest/no-disabled-tests */
/* eslint-disable jest/no-commented-out-tests */
const request = require('supertest')
const faker = require('faker')

const app = require('../src/app')

jest.setTimeout(120000)

describe('Account endpoints', () => {
  describe('POST request to api/account', () => {
    afterAll(async () => {
      await request(app).delete('/api?testUsers=Yes')
    })

    const newUser = {
      type: 'Hairdresser',
      email: `_TestEmail_${faker.internet.email()}`,
      password: '123',
      passwordConfirmation: '123',
    }

    it('should add a new user', async () => {
      const addedUser = (await request(app).post('/api/account').send(newUser)).body
      expect(addedUser.email).toEqual(newUser.email)
      expect(addedUser.type).toEqual(newUser.type)
    })

    it('should only accept unique user emails', async () => {
      const error = (await request(app).post('/api/account').send(newUser)).body
      expect(error.message).toEqual('This user already exists!')
    })

    it('should not accept users with empty email', async () => {
      const emptyEmail = {
        type: 'Hairdresser',
        email: '',
        password: '123',
        passwordConfirmation: '123',
      }

      const emailError = (await request(app).post('/api/account').send(emptyEmail)).body
      expect(emailError.message).toEqual('Email can not be empty!')
    })

    it('should not accept users with invalid email', async () => {
      const invalidEmail = {
        type: 'Hairdresser',
        email: 'invalidEmail[]',
        password: '123',
        passwordConfirmation: '123',
      }

      const emailError = (await request(app).post('/api/account').send(invalidEmail)).body
      expect(emailError.message).toEqual('Email is not valid!')
    })

    it('should not accept users without password', async () => {
      const emptyPass = {
        type: 'Hairdresser',
        email: `_TestEmail_${faker.internet.email()}`,
        password: '',
        passwordConfirmation: '123',
      }

      const passError = (await request(app).post('/api/account').send(emptyPass)).body
      expect(passError.message).toEqual('Password confirmation is failed!')

      const emptyPass2 = {
        type: 'Hairdresser',
        email: `_TestEmail_${faker.internet.email()}`,
        password: '123',
        passwordConfirmation: '',
      }

      const passError2 = (await request(app).post('/api/account').send(emptyPass2)).body
      expect(passError2.message).toEqual('Password confirmation is failed!')

      const emptyPass3 = {
        type: 'Hairdresser',
        email: `_TestEmail_${faker.internet.email()}`,
        password: '',
        passwordConfirmation: '',
      }

      const passError3 = (await request(app).post('/api/account').send(emptyPass3)).body
      expect(passError3.message).toEqual('Password can not be empty!')
    })

    it('should not accept users without type', async () => {
      const emptyType = {
        type: '',
        email: `_TestEmail_${faker.internet.email()}`,
        password: '123',
        passwordConfirmation: '123',
      }

      const typeError = (await request(app).post('/api/account').send(emptyType)).body
      expect(typeError.message).toEqual('User type is wrong')
    })

    it('should not accept users with wrong type', async () => {
      const emptyType = {
        type: 'wrongType',
        email: `_TestEmail_${faker.internet.email()}`,
        password: '123',
        passwordConfirmation: '123',
      }

      const typeError = (await request(app).post('/api/account').send(emptyType)).body
      expect(typeError.message).toEqual('User type is wrong')
    })
  })

  describe('GET request to api/account/sessions', () => {
    const newUser = {
      type: 'Hairdresser',
      email: `_TestEmail_${faker.internet.email()}`,
      password: '123',
      passwordConfirmation: '123',
    }

    beforeAll(async () => {
      await request(app).post('/api/account').send(newUser)
      await request(app).post('/api/account/session').send({ email: newUser.email, password: newUser.password })
    })

    afterAll(async () => {
      await request(app).delete('/api/account/session')
      await request(app).delete('/api?testUsers=Yes')
    })

    it('should send a session cookie', async () => {
      const session = await request(app).get('/api/account/session')
      expect(session.status).toEqual(200)
    })

    it('should send user data when user logged in', async () => {
      const session = (await request(app).get('/api/account/session')).body
      expect(session.email).toEqual(newUser.email)
    })
  })

  describe('POST request to api/account/session', () => {
    const newUser = {
      type: 'Hairdresser',
      email: `_TestEmail_${faker.internet.email()}`,
      password: '123',
      passwordConfirmation: '123',
    }

    beforeAll(async () => {
      await request(app).post('/api/account').send(newUser)
    })
    afterAll(async () => {
      await request(app).delete('/api/account/session')
      await request(app).delete('/api?testUsers=Yes')
    })

    it('should add a new session', async () => {
      const addedSession = (
        await request(app).post('/api/account/session').send({ email: newUser.email, password: newUser.password })
      ).body
      expect(addedSession.email).toEqual(newUser.email)
    })

    it('should not accept users with empty email', async () => {
      const emptyEmail = {
        email: '',
        password: '123',
      }

      const emailError = (await request(app).post('/api/account/session').send(emptyEmail)).body
      expect(emailError.message).toEqual('Email can not be empty!')
    })

    it('should not accept users with invalid email', async () => {
      const invalidEmail = {
        email: 'invalidEmail',
        password: '123',
      }

      const emailError = (await request(app).post('/api/account/session').send(invalidEmail)).body
      expect(emailError.message).toEqual('Email is not valid!')
    })

    it('should not accept users without password', async () => {
      const emptyPass = {
        email: `_TestEmail_${faker.internet.email()}`,
        password: '',
      }

      const passError = (await request(app).post('/api/account/session').send(emptyPass)).body
      expect(passError.message).toEqual('Password can not be empty!')
    })

    it('should not accept false login credentials', async () => {
      const falseUser = {
        email: `_TestEmail_${faker.internet.email()}`,
        password: '123123',
      }

      const authError = (await request(app).post('/api/account/session').send(falseUser)).body
      expect(authError.message).toEqual('Authentication failed!')
    })
  })

  describe('DELETE request to api/account/sessions', () => {
    const newUser = {
      type: 'Hairdresser',
      email: `_TestEmail_${faker.internet.email()}`,
      password: '123',
      passwordConfirmation: '123',
    }

    beforeAll(async () => {
      await request(app).post('/api/account').send(newUser)
      await request(app).post('/api/account/session').send({ email: newUser.email, password: newUser.password })
    })

    afterAll(async () => {
      await request(app).delete('/api?testUsers=Yes')
    })

    it('should delete user session', async () => {
      const session = await request(app).get('/api/account/session')
      expect(session.status).toEqual(200)
    })
  })
})
