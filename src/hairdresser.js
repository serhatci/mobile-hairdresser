const User = require('./user');

class Hairdresser extends User {
  constructor(name, surname, email, password, id) {
    super(name, surname, email, password, id);
    this.availability = 'available'; // [weekdays, weekends, after 7 pm, etc... ]
    this.experience = 'less than 1 year'; // [less than 1 year, 1 year, 2 year, etc... ]
    this.serviceArea = undefined; // perimeter in km around a location
    this.ratings = [];
    this.videos = [];
    this.photos = [];
    this.certificates = [];
    this.employerReferences = [];
    this.customerReviews = [];
    this.repliedRequests = [];
  }

  get portfolio() {
    return `
        Name: ${this.name} ${this.surname}
        Address: ${this.address}
        Telephone: ${this.tel}
        
        ${this.name} ${this.surname} currently has/have ${this.photos.length} photo(s)
        ${this.name} ${this.surname} currently has/have ${this.videos.length} video(s)
        ${this.name} ${this.surname} currently has/have ${this.customerReviews.length} Customer Review(s)`;
  }

  uploadVideo(video) {
    this.video.push(video);
  }

  tagVideo(video, user) {
    video.taggedUsers.push(user);
  }

  uploadCertificate(certificate) {
    this.certificates.push(certificate);
  }

  replyToCustomerRequest(request, reply) {
    request.replies.push(reply);
    this.repliedRequests.push(request);
  }

  adviseToCustomerRequest(request, reply) {
    request.replies.push(reply);
    this.repliedRequests.push(request);
  }
}

module.exports = Hairdresser;
