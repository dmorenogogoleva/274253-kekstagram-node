const ValidationError = require(`../errors/validation-error`);

const validate = (date) => {
  const errors = [];

  if (!/^\d+$/.test(date)) {
    errors.push(`Field "date" should be a number!`);
  }
  if (errors.length > 0) {
    throw new ValidationError(errors);
  }
  return date;
};

module.exports = validate;
