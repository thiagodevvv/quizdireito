import db from '../../database'
export default async (req,res) => {
    const sortInfo = { numeroInfo : 1}
    const client = await db()
    const connectDB = client.db('dbPerguntas')
        const data = await connectDB.collection('informativos').find({}).sort(sortInfo).toArray((err, result) => {
            return res.json(result)
            
        })
}