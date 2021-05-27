class Certificate {
  constructor(fileName, title, id) {
    this.id = id
  constructor(fileName, title, generateId) {
    this.id = id.generate();
    this.fileName = fileName;
    this.title = title;
  }
}

module.exports = Certificate;
