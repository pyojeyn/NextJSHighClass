import { MongoClient } from "mongodb";

// /api/new-meetup
// POST /api/new-meetup

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const client = await MongoClient.connect(
      "mongodb://localhost:27017/meetup"
    );
    const db = client.db();

    const meetupsCollection = db.collection("meetups");
    const result = await meetupsCollection.insertOne(data);
    console.log("result", result);

    client.close();

    res.status(201).json({ message: "Meetup inserted!" }); // 어떤 것이 성공적으로 삽입되었음을 의미
  }
}

export default handler;
