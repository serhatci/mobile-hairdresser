/* eslint-disable no-await-in-loop */
/* eslint-disable no-underscore-dangle */
/* eslint-disable jest/no-disabled-tests */
/* eslint-disable jest/no-commented-out-tests */
const request = require('supertest')

const app = require('../src/app')

jest.setTimeout(120000)

describe('Account endpoints', () => {
  let addedUser

  describe('POST request to api/account', () => {
    const newUser = {
      type: 'Hairdresser',
      email: '_TestEmail_trial@trial.com',
      password: '123',
      passwordConfirmation: '123',
    }

    it('should add a new user', async () => {
      addedUser = (await request(app).post('/api/account').send(newUser)).body
      expect(addedUser.email).toEqual(newUser.email)
      expect(addedUser.type).toEqual(newUser.type)
    })

    it('should only accept unique users', async () => {
      const error = (await request(app).post('/api/account').send(newUser)).body
      expect(error.message).toBe('This user already exists!')
    })

    it('should not accept users with empty email', async () => {
      const emptyEmail = {
        type: 'Hairdresser',
        email: '',
        password: '123',
        passwordConfirmation: '123',
      }

      const emailError = (await request(app).post('/api/account').send(emptyEmail)).body
      expect(emailError.message).toBe('Email can not be empty!')
    })

    it('should not accept users with invalid email', async () => {
      const invalidEmail = {
        type: 'Hairdresser',
        email: 'invalidEmail[]',
        password: '123',
        passwordConfirmation: '123',
      }

      const emailError = (await request(app).post('/api/account').send(invalidEmail)).body
      expect(emailError.message).toBe('Email is not valid!')
    })

    it('should not accept users without password', async () => {
      const emptyPass = {
        type: 'Hairdresser',
        email: '_TestEmail_trial@trial.com',
        password: '',
        passwordConfirmation: '123',
      }

      const passError = (await request(app).post('/api/account').send(emptyPass)).body
      expect(passError.message).toBe('Password confirmation is failed!')

      const emptyPass2 = {
        type: 'Hairdresser',
        email: '_TestEmail_trial@trial.com',
        password: '123',
        passwordConfirmation: '',
      }

      const passError2 = (await request(app).post('/api/account').send(emptyPass2)).body
      expect(passError2.message).toBe('Password confirmation is failed!')

      const emptyPass3 = {
        type: 'Hairdresser',
        email: '_TestEmail_trial@trial.com',
        password: '',
        passwordConfirmation: '',
      }

      const passError3 = (await request(app).post('/api/account').send(emptyPass3)).body
      expect(passError3.message).toBe('Password can not be empty!')
    })

    it('should not accept users without type', async () => {
      const emptyType = {
        type: '',
        email: '_TestEmail_trial@trial.com',
        password: '123',
        passwordConfirmation: '123',
      }

      const typeError = (await request(app).post('/api/account').send(emptyType)).body
      expect(typeError.message).toBe('User type is wrong')
    })

    it('should not accept users with wrong type', async () => {
      const emptyType = {
        type: 'wrongType',
        email: '_TestEmail_trial@trial.com',
        password: '123',
        passwordConfirmation: '123',
      }

      const typeError = (await request(app).post('/api/account').send(emptyType)).body
      expect(typeError.message).toBe('User type is wrong')
    })
  })

  describe('DELETE request to api/account/:userId', () => {
    it('should delete a given user', async () => {
      const deletedUser = (await request(app).delete(`/api/account/${addedUser.id}`)).body
      expect(addedUser.id).toEqual(deletedUser.id)
    })

    it('should give error if given user does not exist in DB', async () => {
      const notExistErr = (await request(app).delete(`/api/account/${addedUser._id}`)).body
      expect(notExistErr.message).toBe('UserId does not exist in database!')
    })

    it('should give error if given userId is wrong', async () => {
      const wrongUserIdErr = (await request(app).delete(`/api/account/ee213eee12322`)).body
      expect(wrongUserIdErr.message).toBe('Provided UserId has wrong format!')
    })
  })
})
