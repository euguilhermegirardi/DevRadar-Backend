const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
  async index(req, res) {
    const { longitude, latitude, techs } = req.query;

    const techsArray = parseStringAsArray(techs);
    //console.log(techsArray);

    const devs = await Dev.find({
      techs: {
        $in: techsArray, // Filter by technology
      },
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude], // sent by the user in the login.
          },
          $maxDistance: 10000000000000, // Search all devs between 10km
        },
      },
    });

    return res.json({ devs });
  }
};
