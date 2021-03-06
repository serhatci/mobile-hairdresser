/* eslint-disable import/no-extraneous-dependencies */
const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const passport = require('passport')
const cors = require('cors')
const helmet = require('helmet')
const mongoSanitize = require('express-mongo-sanitize')
const compression = require('compression')

const clientP = require('./database-connection')
const socketService = require('./socket-service')

const User = require('./models/user')

const usersRouter = require('./routes/users')
const photosRouter = require('./routes/photos')
const accountRouter = require('./routes/account')
const sessionRouter = require('./routes/session')
const requestsRouter = require('./routes/requests')
const locationsRouter = require('./routes/locations')

const app = express()

app.use(
  cors({
    origin: app.get('env') == 'development' ? true : 'https://mobilerfriseur.net',
    credentials: true,
  })
)

if (app.get('env') == 'development') {
  /* eslint-disable-next-line */
  app.use(require('connect-livereload')())
  /* eslint-disable-next-line */
  require('livereload')
    .createServer({ extraExts: ['pug'] })
    .watch([`${__dirname}/public`, `${__dirname}/views`])
}

app.set('trust proxy', 1)

app.set('io', socketService)

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
    // eslint-disable-next-line no-underscore-dangle
    store: new MongoStore({
      clientPromise: clientP,
      dbName: 'mobilehairdresser',
      stringify: false,
    }),
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      path: '/api',
      sameSite: process.env.NODE_ENV == 'production' ? 'none' : 'strict',
      secure: process.env.NODE_ENV == 'production',
    },
    resave: false,
    saveUninitialized: false,
  })
)

app.use(passport.initialize())
app.use(passport.session())

passport.use(User.createStrategy())

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use(express.static(path.join(__dirname, 'public')))

app.use(helmet())

app.use(
  mongoSanitize({
    replaceWith: '_',
  })
)

function shouldCompress(req, res) {
  if (req.headers['x-compression']) {
    return compression.filter(req, res)
  }
  // don't compress responses without this request header
  return false
}

app.use(compression({ filter: shouldCompress }))

app.use('/api/users', usersRouter)
app.use('/api/photos', photosRouter)
app.use('/api/account', accountRouter)
app.use('/api/session', sessionRouter)
app.use('/api/requests', requestsRouter)
app.use('/api/locations', locationsRouter)

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

  res.send({
    status: err.status,
    message: err.message,
    stack: req.app.get('env') == 'development' ? err.stack : '',
  })
})

module.exports = app
