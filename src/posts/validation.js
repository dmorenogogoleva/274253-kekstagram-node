const IllegalArgumentError = require(`../errors/illegal-argument-error`);

const validate = (data) => {
  const errors = [];

  if (!data.date) {
    errors.push(`Field 'date' is required`);
  }
  if (errors.length > 0) {
    throw new IllegalArgumentError(errors);
  }
  return data;
};

module.exports = validate;
