import { NowRequest, NowResponse } from '@vercel/node';
import { MongoClient } from 'mongodb'
const CONNECTION_STRING = "mongodb+srv://lanh:89757@blogcluster.kbrcc.mongodb.net/northwind?retryWrites=true&w=majority";
module.exports = async (req: NowRequest, res: NowResponse) => {
    const client = await MongoClient.connect(CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = await client.db('northwind');
    var result = await db.collection("northwind").find().toArray();
    res.status(200).json(result);
    return result;
}