import db from '../../src/database'
export default async (req,res) => {
    const sortInfo = { informativo : -1}
    const client = await db()
    const connectDB = client.db('dbPerguntas')
    let arrayStf = []
    let arrayStj = []
        const data = await connectDB.collection('perguntas').find({}).sort(sortInfo).toArray((err, result) => {
            result.map((element) => {
                if(element.instituição === "STF") {
                    arrayStf.push(element)
                }
                if(element.instituição === "STJ") {
                    arrayStj.push(element)
                }
            })
            arrayStf.sort((a,b) => a.materia[0].localeCompare(b.materia[0]))
            arrayStj.sort((a,b) => a.materia[0].localeCompare(b.materia[0]))
            
            // arrayStf.sort((a,b) => b.informativo - a.informativo)
            // arrayStj.sort((a,b) => b.informativo - a.informativo)
            const arrayOrdered = arrayStf.concat(arrayStj)
            return res.json(arrayOrdered)
        })
         
}