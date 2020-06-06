module.exports = function parseStringAsArray(arrayAsString) {
  return arrayAsString.split(',').map(tech => tech.trim());
};

// Get the full string and turn it into an array with a comma and the space.
