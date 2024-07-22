const Claim = require('../models/Claim');

exports.createClaim = async (req, res) => {
  const { description } = req.body;
  try {
    const claim = await Claim.create({
      userId: req.user.id,
      description
    });
    res.json(claim);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getClaims = async (req, res) => {
  try {
    const claims = await Claim.findAll({ where: { userId: req.user.id } });
    res.json(claims);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
