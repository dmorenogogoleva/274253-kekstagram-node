const ValidationError = require(`../errors/validation-error`);

const queryParametrsValidation = (posts, skip, limit) => {
  const queriesParams = [{'label': `skip`, 'value': skip || 0}, {'label': `limit`, 'value': limit || posts.length}];

  const invalidQuery = queriesParams.find((que) => { //eslint-disable-line
    for (let key in que) {
      if (key === `value`) {
        return isNaN(que[key]);
      }
    }
  });

  if (invalidQuery) {
    throw new ValidationError(`Field ${invalidQuery.label} should be a number!`);
  }

  let requestedPosts = posts.slice(queriesParams[0].value, +(queriesParams[0].value) + +(queriesParams[1].value));

  return requestedPosts;
};

module.exports = queryParametrsValidation;

