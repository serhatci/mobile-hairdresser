class Rating {
  constructor(user, hairdresser, rate, id) {
    this.id = id
    this.user = user
    this.user = hairdresser
    this.rate = rate
    this.date = new Date()
  }
}

module.exports = Rating
