const CustomError = require("../errors/custom-error");

const errorHandler = (err, req, res, next) => {
  console.log("*****error******");
  console.log(err);
  console.log("*****error******");
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({ errors: err.serializeErrors() });
  }
  res.status(400).json({
    errors: [{ message: "Something went wrong!" }],
  });
  
};

module.exports = errorHandler;
