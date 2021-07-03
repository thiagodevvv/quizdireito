import db from '../../database'

export default async (req,res) => {
    const {mat, inst,info} = req.body
    var retornoPerguntas = []
    const sortInfo = { informativo : -1}
        const client = await db()
        const connectDB = await client.db('dbPerguntas')

        if(mat && inst.length === 0 && info.length === 0) {
           for(let i = 0; i < mat.length; i++) {
            retornoPerguntas.push(await connectDB.collection('perguntas').find({materia : `${mat[i]}`}).sort(sortInfo).toArray())
           }
        }
                
        if(inst && mat.length === 0 && info.length === 0) {
            
            for(let i = 0; i < inst.length; i++) {
                retornoPerguntas.push(await connectDB.collection('perguntas').find({instituição : `${inst[i]}`}).sort(sortInfo).toArray())
               }
        }
        if(info && mat.length === 0 && inst.length === 0) {
            info.sort()
            info.reverse()
            for(let i = 0; i < info.length; i++) {
                
                 retornoPerguntas.push(await connectDB.collection('perguntas').find({informativo : info[i]}).toArray())
               }
    
        }
        if(mat && inst && info.length === 0) {
            
            if(inst.length === 1) {
                for(let i = 0; i < mat.length; i++) {
                    retornoPerguntas.push(await connectDB.collection('perguntas').find({materia : `${mat[i]}`, instituição: `${inst}`})
                    .sort(sortInfo).toArray())
                }
            }
            if(inst.length === 2) {
                for(let i = 0; i < mat.length; i++) {
                    retornoPerguntas.push(await connectDB.collection('perguntas').find({materia : `${mat[i]}`, instituição: `${inst[0]}`})
                    .sort(sortInfo).toArray())
                    retornoPerguntas.push(await connectDB.collection('perguntas').find({materia : `${mat[i]}`, instituição: `${inst[1]}`})
                    .sort(sortInfo).toArray())
                }
            }
        }

        if(mat && info && inst.length === 0) {
            info.sort()
            info.reverse()
            if(mat.length >= info.length) {
                for(let i = 0; i < mat.length; i++) {
                    for(let j = 0; j < info.length; j++) {
                        retornoPerguntas.push(await connectDB.collection('perguntas').find({materia : `${mat[i]}`, informativo: info[j]}).toArray())
                    }
                    
                }
            }

            if(info.length > mat.length) {
                for(let i = 0; i < info.length; i++) {
                    for(let j = 0; j < mat.length; j++) {
                        retornoPerguntas.push(await connectDB.collection('perguntas').find({materia : `${mat[j]}`, informativo: info[i]}).toArray())
                    }
                    
                }
            }
                 
        }

        if(mat && inst && info) {
            info.sort()
            info.reverse()
            if(mat.length > inst.length && mat.length >= info.length) {
                if(info.length > inst.length) {
                    for(let i = 0; i < mat.length; i++) {
                        for(let j = 0; j < info.length; j++) {
                            for(let k = 0; k < inst.length; k++) {
                                retornoPerguntas.push(await connectDB.collection('perguntas').find({materia : `${mat[i]}`, informativo: info[j], instituição: inst[k]})
                                .toArray())
                            }
                        }
                    }
                }
            }
            if(info.length > mat.length && info.length > inst.length)  {

                if(mat.length >= inst.length) {
                    for(let i = 0; i < info.length; i++) {
                        for(let j = 0; j < mat.length; j++) {
                            for(let k = 0; k < inst.length; k++) {
                                retornoPerguntas.push(await connectDB.collection('perguntas').find({materia : `${mat[j]}`, informativo: info[i], instituição: inst[k]})
                                .toArray())
                            }
                        }
                    }
                }
            }
            if(inst.length >= mat.length && inst.length >= info.length) {
                if(mat.length >= info.length) {
                    for(let i = 0; i < inst.length; i++) {
                        for(let j = 0; j < mat.length; j++) {
                            for(let k = 0; k < info.length; k++) {
                                retornoPerguntas.push(await connectDB.collection('perguntas').find({materia : `${mat[j]}`, informativo: info[k], instituição: inst[i]})
                                .toArray())
                            }
                        }
                    }
                }
                if(mat.length < info.length) {
                    for(let i = 0; i < inst.length; i++) {
                        for(let j = 0; j < info.length; j++) {
                            for(let k = 0; k < mat.length; k++) {
                                retornoPerguntas.push(await connectDB.collection('perguntas').find({materia : `${mat[k]}`, informativo: info[j], instituição: inst[i]})
                                .toArray())
                            }
                        }
                    }
                }
            }
        }
        
     
        return res.json(retornoPerguntas) 
              
}