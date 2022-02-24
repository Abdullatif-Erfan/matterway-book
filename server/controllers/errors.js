exports.get404 = (req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error); // It passes control to the next matching route.
};
