class Video {
  constructor(fileName, title, description) {
    this.id = id.generate();
    this.fileName = fileName;
    this.title = title;
    this.description = description;
    this.taggedUsers = [];
    this.likedBy = [];
  }
}

module.exports = Video;
