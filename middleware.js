module.exports = {
  validateRecipe,
  errorHandler
};

function validateRecipe(req, res, next) {
  const { name, servings, dish, instructions } = req.body;
  if (!name || !servings || !dish || !instructions) {
    res.status(400).json({
      errorMessage: "The new recipe needs a name instructions servings and dish"
    });
  } else {
    next();
  }
}

function errorHandler(
  { message = "Something went wrong", name, status = 500 },
  req,
  res,
  next
) {
  if (res.headersSent) {
    next();
  } else {
    res.status(status).json({ errorMessage: message });
  }
}
