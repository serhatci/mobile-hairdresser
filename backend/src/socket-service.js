/* eslint-disable no-console */
const io = require('socket.io')({
  cors: {
    origin: true,
    methods: ['GET', 'POST'],
    credentials: true,
  },
})

io.on('connect', socket => {
  socket.on('Connection Check', () => {
    console.log(`web socket connected!..`)
  })

  socket.on('New post', notification => {
    console.log(`new ${notification.type}`)

    return notification.type == 'Reply'
      ? socket.broadcast.emit('New reply', notification)
      : socket.broadcast.emit('New request', notification)
  })
})

module.exports = io
