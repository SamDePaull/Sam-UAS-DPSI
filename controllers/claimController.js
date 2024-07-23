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

exports.adminGetAllClaims = async (req, res) => {
  try {
    const claims = await Claim.findAll();
    res.json(claims);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.updateClaim = async (req, res) => {
  const { id, status } = req.body;
  try {
    let claim = await Claim.findByPk(id);
    if (!claim) {
      return res.status(404).json({ msg: 'Claim not found' });
    }
    claim.status = status;
    await claim.save();
    res.json(claim);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.deleteClaim = async (req, res) => {
  const { id } = req.body;
  try {
    let claim = await Claim.findByPk(id);
    if (!claim) {
      return res.status(404).json({ msg: 'Claim not found' });
    }
    await claim.destroy();
    res.json({ msg: 'Claim deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
