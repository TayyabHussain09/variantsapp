import mongoose from 'mongoose';

const VariantSchema = new mongoose.Schema({
  variantsName: { type: String, required: true },
  values: { type: [String], required: true },
});

export default mongoose.models.Variant || mongoose.model('Variant', VariantSchema);