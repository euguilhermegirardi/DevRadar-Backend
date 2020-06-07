const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {

  async index(req, res) {
    const devs = await Dev.find();

    return res.json(devs);
  },

  async store(req, res) {
    const { github_username, techs, longitude, latitude  } = req.body;

    // Check if there is a user in tha database with the same 'github_username'
    let dev = await Dev.findOne({ github_username });

    if (!dev) {
      const response = await axios.get(`https://api.github.com/users/${github_username}`);
      //console.log(response.data);

      const { name = login, avatar_url, bio } = response.data;
      //console.log(name, avatar_url, bio);

      // Get the full string and turn it into an array with a comma and the space.
      const techsArray = parseStringAsArray(techs);

      const location = {
        type: 'Point',
        coordinates: [longitude, latitude]
      };

      dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location
      });
    }
    return res.json(dev);
  }
};

// index: list of
// show: shows just one
// store: create
// update: edit
// destroy: delete
