export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  if (err.statusCode) {
    res.status(err.statusCode).json({ message: err.message });
  } else {
    res.status(500).json({ message: "internal server error" });
  }
};
