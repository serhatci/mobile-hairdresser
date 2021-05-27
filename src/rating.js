class Rating {
  constructor(user, rate) {
    this.user = user;
    this.rate = rate;
    this.date = new Date();
  }
}

module.exports = Rating;
