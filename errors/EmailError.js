class EmailError extends Error {
  constructor(message) {
    super(message);
    this.status = 409;
    this.message = message;
  }
}

module.exports = EmailError;
