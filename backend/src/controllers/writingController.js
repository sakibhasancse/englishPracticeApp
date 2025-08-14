import Writing from '../models/Writing.js';
import User from '../models/User.js';

export const createWriting = async (req, res) => {
  try {
    const { mode, prompt, text, feedback } = req.body;
    const writing = await Writing.create({
      user: req.user.id,
      mode,
      prompt,
      text,
      feedback
    });
    await User.findByIdAndUpdate(req.user.id, { $push: { writings: writing._id } });
    res.status(201).json(writing);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getWritings = async (req, res) => {
  try {
    const writings = await Writing.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(writings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getDashboard = async (req, res) => {
  try {
    const writings = await Writing.find({ user: req.user.id });
    const total = writings.length;
    const avgScore = total ? (writings.reduce((sum, w) => sum + (w.feedback?.score || 0), 0) / total).toFixed(2) : 0;
    res.json({ total, avgScore, writings });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
