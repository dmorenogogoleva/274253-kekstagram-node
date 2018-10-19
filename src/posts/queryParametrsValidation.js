const ValidationError = require(`../errors/validation-error`);

const queryParametrsValidation = (posts, skip, limit) => {
  const queriesParams = [{'label': `skip`, 'value': skip}, {'label': `limit`, 'value': limit}];

  if (skip === undefined && limit === undefined) {
    return posts;
  }

  if (queriesParams[0].value.length === 0 && queriesParams[1].value.length === 0) {
    return posts;
  }

  const invalidQuery = queriesParams.find((que) => { //eslint-disable-line
    for (let key in que) {
      if (key === `value`) {
        return isNaN(que[key]);
      }
    }
  });

  const missingQuery = queriesParams.find((que) => {  //eslint-disable-line
    for (let key in que) {
      if (key === `value`) {
        return que[key].length === 0;
      }
    }
  });

  if (invalidQuery) {
    throw new ValidationError(`Field ${invalidQuery.label} should be a number!`);
  }

  let requestedPosts = posts.slice(queriesParams[0].value, queriesParams[1].value);

  if (missingQuery) {
    switch (missingQuery.label) {
      case `skip`:
        requestedPosts = posts.slice(0, queriesParams[1].value);
        break;
      case `limit`:
        requestedPosts = posts.slice(queriesParams[0].value);
        break;
      default:
        break;
    }
  }

  return requestedPosts;
};

module.exports = queryParametrsValidation;

