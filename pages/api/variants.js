import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("variants"); // Replace with your database name
  const collection = db.collection("variants");

  if (req.method === "POST") {
    const { variantsName, values } = req.body;
    const newVariant = { variantsName, values };
    await collection.insertOne(newVariant);
    return res.status(201).json(newVariant);
  } else if (req.method === "GET") {
    const variants = await collection.find({}).toArray();
    return res.status(200).json(variants);
  } else if (req.method === "PUT") {
    const { id, updatedData } = req.body;
    await collection.updateOne({ _id: new ObjectId(id) }, { $set: updatedData });
    return res.status(200).json(updatedData);
  } else if (req.method === "DELETE") {
    const { id } = req.body;
    await collection.deleteOne({ _id: new ObjectId(id) });
    return res.status(204).end();
  } else {
    return res.status(405).end(); // Method Not Allowed
  }
}