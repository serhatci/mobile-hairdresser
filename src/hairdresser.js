const User = require('./user')

class Hairdresser extends User {
  constructor(name, surname, email, password, id) {
    super(name, surname, email, password, id)
    this.availability = ''; // [weekdays, weekends, after 7 pm, etc... ]
    this.experience = ''; // [less than 1 year, 1 year, 2 year, etc... ]
    this.serviceArea = 0; // perimeter in km around a location
    this.ratings = [];
    this.videos = [];
    this.certificates = [];
    this.employerReferences = [];
    this.customerReviews = [];
  }

  get portfolio () {
    return `
        Name: ${this.name} ${this.surname}
        Address: ${this.address}
        Telephone: ${this.tel}
        
        ${this.name} ${this.surname} currently has/have ${this.photos.length} photo(s)
        ${this.name} ${this.surname} currently has/have ${this.videos.length} video(s)
        ${this.name} ${this.surname} currently has/have ${this.customerReviews.length} Customer Review(s)`
  }

  uploadVideo (video) {
    this.video.push(video)
  }

  tagVideo (video, user) {
    video.taggedUsers.push(user)
  }

  uploadCertificate (certificate) {
    this.certificates.push(certificate)
  }

  replyToCustomerRequest (request, reply) {
    request.replies.push(reply)

  }

  adviseToCustomerRequest (request, reply) {
    request.replies.push[reply]
  }
}

module.exports = Hairdresser