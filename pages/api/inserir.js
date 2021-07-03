import db from '../../database'

export default async (req, res) => {
    const {pergunta, alterA, alterB, alterC, alterD, alterE, resp, materia, informativo, instituição, justificativa} = req.body

        const respLower = resp.toLowerCase()
        const infoInt = parseInt(informativo)
        const client = await db()
        const connectDB = await client.db("dbPerguntas")
        await connectDB.collection('perguntas').insertOne({
            pergunta: pergunta,
            a: alterA,
            b: alterB,
            c: alterC,
            d: alterD,
            e: alterE,
            resp: respLower,
            materia: materia,
            informativo: infoInt,
            instituição: instituição,
            justificativa: justificativa,
            dataCadastro: new Date()
        })
        // Adicionando unico informativo no banco
        const retorno = await connectDB.collection('informativos').findOne({
            numeroInfo : infoInt
        })
        if(retorno == null) {
            try{
               await connectDB.collection('informativos').insertOne({
                   numeroInfo: infoInt
               })
            }catch(e) {
                console.log('Erro tabela informativos')
            }
        }
        
        
        const retornoMateria = await connectDB.collection('materias').findOne({
            materia : materia
        })
        if(retornoMateria == null) {
            try{
               await connectDB.collection('materias').insertOne({
                   materia: materia
               })
            }catch(e) {
                console.log('Erro tabela materia')
            }
        }
        
    return res.status(200).json({"io": "oi"})
}