import db from '../../src/database'

export default async (req, res) => {
    let idQuestion = 0
    const {pergunta, alterA, alterB, alterC, alterD, alterE, resp, materia, informativo, instituição, justificativa, temas} = req.body
        materia.sort((a,b) => a.localeCompare(b))
        temas.sort((a,b) => a.localeCompare(b))

        const respLower = resp.toLowerCase()
        const infoInt = parseInt(informativo)
        const client = await db()
        const connectDB = await client.db("dbPerguntas")

        //Verficando IDs
        const idsQuestion = await connectDB.collection('idQuestion').find({}).toArray()
        if(idsQuestion.length === 0) {
            idQuestion = 1
            await connectDB.collection('idQuestion').insertOne({
                "idQuestion": idQuestion
            })
        }else {
            idQuestion = idsQuestion.length + 1
            await connectDB.collection('idQuestion').insertOne({
                "idQuestion": idQuestion
            })
          
        }
        //Verificando temas
        const temasDB = await connectDB.collection('temas').find({}).toArray()

        if(temasDB.length === 0) {
            temas.map(async(element) => {
                await connectDB.collection('temas').insertOne({tema: element})
            })
            
        }else {
            temas.map(async(element) => {
                const retornofind = temasDB.findIndex(item => item.tema === element)
                if(retornofind === -1) {
                    await connectDB.collection('temas').insertOne({tema: element})
                }
            })
        }
       
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
            dataCadastro: new Date(),
            tema: temas,
            idQuestion: idQuestion,
            status: "atualizada"
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
        
        materia.map(async (element) => {
            const retornoMateria = await connectDB.collection('materias').findOne({
                materia : element
            })
            
            if(retornoMateria == null) {
                try{
                   await connectDB.collection('materias').insertOne({
                       materia: element
                   })
                }catch(e) {
                    console.log('Erro tabela materia')
                }
            }
            
        })
        
        
        
    return res.status(200).json({"io": "oi"})
}