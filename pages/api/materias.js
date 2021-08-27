import db from '../../src/database'

export default async (req, res) => {
    const client = await db()
    const connectDB = await client.db('dbPerguntas')
    const materias =  await connectDB.collection('materias').find({}).toArray((err, result) => {
        result.sort((a,b) => a.materia.localeCompare(b.materia))
        res.status(200).json(result)
    })
    // res.status(200).json(materias)
}