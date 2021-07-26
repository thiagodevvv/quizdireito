import db from '../../database'

export default async (req,res) => {
    const client = await db()
    const connectDB =  await client.db('dbPerguntas')
    const data = await connectDB.collection('temas').find({}).toArray()
    const tester = data.sort((a,b) => a.tema.localeCompare(b.tema))
    JSON.stringify(data)
    return res.status(200).send(tester)
}