const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
  async index(req, res) {
    // search all devs between 10km
    // Filter by technology

    const { latitude, longitude, techs } = req.query;

    const techsArray = parseStringAsArray(techs);
    //console.log(techsArray);

    const devs = await Dev.find({
      techs: {
        $in: techsArray,
      },
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude], // sent by the user in the login.
          },
          $maxDistance: 10000,
        },
      },
    });

    return res.json({ devs });
  }
};
