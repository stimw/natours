// return a function for callback

module.exports = (fn) => (req, res, next) => {
  fn(req, res, next).catch(next);
};
