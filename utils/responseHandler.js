const createResponse = (action, status, data, error = null) => {
  return {
    action,
    status,
    data, // Only include data if it's not null
    ...(error && { error }), // Only include error if it's not null
  };
};

module.exports = createResponse;
