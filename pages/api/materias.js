import db from '../../database'

export default async (req, res) => {
    const client = await db()
    const connectDB = await client.db('dbPerguntas')
    const materias =  await connectDB.collection('materias').find({}).toArray((err, result) => {
        res.status(200).json(result)
    })
    // res.status(200).json(materias)
}