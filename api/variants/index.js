import connectDB from '../../../lib/db';
import Variant from '../../../models/Variant';
import axios from 'axios';

export default async function handler(req, res) {
  await connectDB();

  const { method } = req;

  switch (method) {
    case 'GET': 
      try {
        const variants = await Variant.find();
        res.status(200).json({ success: true, data: variants });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;

    case 'POST': 
      try {
        const variant = await Variant.create(req.body);
        res.status(201).json({ success: true, data: variant });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;

    default:
      res.status(405).json({ success: false, message: 'Method not allowed' });
      break;
  }
}