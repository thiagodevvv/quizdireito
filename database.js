const DB_URL = process.env.DB_URL

import {MongoClient} from 'mongodb'


export default async () => {
    const client = await MongoClient.connect(DB_URL, {useNewUrlParser: true,useUnifiedTopology: true})
    return client
    
}
