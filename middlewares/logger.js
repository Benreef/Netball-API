function logger(req, res, next) {
  // This prints the date in the terminal and the method + path
  console.log(`${new Date()} ${req.method} ${req.path}`);

  // next calls the next function in middleware to run
  next();
}

module.exports = logger;