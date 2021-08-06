import db from '../../database'

export default async (req,res) => {
    const {id} = req.body
    const client = await db()
    const connectDB = await client.db("dbPerguntas")
    const resposta =  await connectDB.collection('perguntas').findOneAndDelete({idQuestion: parseInt(id)})
    if(resposta.lastErrorObject.n === 0) {
        return res.status(400).send('0')
    }else {
        return res.status(200).send('1')
    }
}