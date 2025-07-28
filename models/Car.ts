import mongoose, { Schema, models } from 'mongoose';

const CarSchema = new Schema({
  make: String,
  model: String,
  year: Number,
  price: Number,
}, { timestamps: true });

export const Car = models.Car || mongoose.model('Car', CarSchema);
