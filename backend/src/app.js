/* eslint-disable import/no-extraneous-dependencies */
const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const session = require('express-session')
const MongoStore = require('connect-mongo')

require('./database-connection')

const indexRouter = require('./routes/index')
const customersRouter = require('./routes/customers')
const hairdressersRouter = require('./routes/hairdressers')
const photosRouter = require('./routes/photos')
const accountsRouter = require('./routes/accounts')

const app = express()

if (app.get('env') == 'development') {
  /* eslint-disable-next-line */
  app.use(require('connect-livereload')())
  /* eslint-disable-next-line */
  require('livereload')
    .createServer({ extraExts: ['pug'] })
    .watch([`${__dirname}/public`, `${__dirname}/views`])
}

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use(
  session({
    secret: ['ofCourseThisIsDifferentInProduction', 'PushedHereOnlyForLEarningPurposes'],
    store: MongoStore.create({ mongoUrl: 'mongodb://mongo/mobilehairdresser', stringify: false }),
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      path: '/api',
    },
  })
)

app.use(express.static(path.join(__dirname, 'public')))

app.use('/api', indexRouter)
app.use('/api/customers', customersRouter)
app.use('/api/hairdressers', hairdressersRouter)
app.use('/api/photos', photosRouter)
app.use('/api/accounts', accountsRouter)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404))
})

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
