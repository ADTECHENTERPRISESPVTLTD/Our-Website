const Intern = require('../models/Intern');
exports.createIntern = async (req, res, next) => {
  try {
    const intern = await Intern.create(req.body);
    res.status(201).json({ success: true, data: intern });
  } catch (error) {
    next(error);
  }
};

exports.getInterns = async (req, res, next) => {
  try {
    const interns = await Intern.find();
    res.status(200).json({ success: true, count: interns.length, data: interns });
  } catch (error) {
    next(error);
  }
};

exports.getIntern = async (req, res, next) => {
  try {
    const intern = await Intern.findById(req.params.id);
    if (!intern) {
      return res.status(404).json({ success: false, error: 'Intern not found' });
    }
    res.status(200).json({ success: true, data: intern });
  } catch (error) {
    next(error);
  }
};

exports.updateIntern = async (req, res, next) => {
  try {
    const intern = await Intern.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!intern) {
      return res.status(404).json({ success: false, error: 'Intern not found' });
    }
    res.status(200).json({ success: true, data: intern });
  } catch (error) {
    next(error);
  }
};

exports.deleteIntern = async (req, res, next) => {
  try {
    const intern = await Intern.findByIdAndDelete(req.params.id);
    if (!intern) {
      return res.status(404).json({ success: false, error: 'Intern not found' });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};
