import db from '../../database'
export default async (req,res) => {
    const sortInfo = { informativo : -1}
    const client = await db()
    const connectDB = client.db('dbPerguntas')
        const data = await connectDB.collection('perguntas').find({}).sort(sortInfo).toArray((err, result) => {
            return res.json(result)
        })
         
}