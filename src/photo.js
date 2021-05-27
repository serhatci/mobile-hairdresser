const idGenerator = require('./id-generator');

class Photo {
  constructor(fileName, id) {
    this.id = id;
    this.fileName = fileName;
    this.taggedUsers = [];
    this.likedBy = [];
  }
}

module.exports = Photo;
