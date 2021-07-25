require('dotenv/config')

import db from '../../database'
import jwt from 'jsonwebtoken'

const authSecret = process.env.authSecret


export default async (req,res) => {
    const { login, password } = req.body 
    const client = await db()
    const connectDB = await client.db('dbPerguntas')
    const retorno =  await connectDB.collection('user').findOne({login: login, password: password})
    if(retorno !== null) {
        const payload = {id: retorno._id}
        const token = jwt.sign(payload,authSecret)
        return res.json({"token": token})
    }else {
        return res.json({})
    }
}