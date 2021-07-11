import db from '../../database'

export default async (req,res) => {
    const client = await db()
    const connectDB =  await client.db('dbPerguntas')
    const data = await connectDB.collection('temas').find({}).toArray()
    JSON.stringify(data)
    return res.status(200).send(data)
}