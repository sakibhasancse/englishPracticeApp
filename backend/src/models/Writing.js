import mongoose from 'mongoose';

const writingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  mode: { type: String, enum: ['free', 'guided'], required: true },
  prompt: { type: String },
  text: { type: String, required: true },
  feedback: {
    grammar: String,
    vocabulary: String,
    fluency: String,
    score: Number,
    overall: String
  },
  date: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model('Writing', writingSchema);
