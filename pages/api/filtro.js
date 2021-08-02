import db from '../../database'
export default async (req,res) => {
 
    function removeDuplicates(originalArray, prop) {
        var newArray = [];
        var lookupObject  = {};
   
        for(var i in originalArray) {
           lookupObject[originalArray[i][prop]] = originalArray[i];
        }
   
        for(i in lookupObject) {
            newArray.push(lookupObject[i]);
        }
         return newArray;
    }
    function remove_duplicates_es6(arr) {
        let s = new Set(arr);
        let it = s.values();
        return Array.from(it);
    }
    const {mat, inst,info, temas, tipoCE, tipoME} = req.body

    if(mat.length > 0) {mat.sort((a,b) => a.localeCompare(b))}
    if(temas.length > 0) {temas.sort((a,b) => a.localeCompare(b))}
    if(inst.length > 0) {inst.sort((a,b) => a.localeCompare(b))}
    var retornoPerguntas = []
    var dataPerguntas = []
    const sortInfo = { informativo : -1}
    const client = await db()
    const connectDB = await client.db('dbPerguntas')
    let arrayStfGlobal = []
    let arrayStjGlobal = []
    let arrayOrderedMatStf 
    let arrayOrderedMatStj 
        if(mat.length > 0 && inst.length === 0 && info.length === 0 && temas.length === 0) {
            ////////Matéria OK
            for(let i = 0; i < mat.length; i++) {
                dataPerguntas.push(await connectDB.collection('perguntas').find({materia: `${mat[i]}`}).sort(sortInfo).toArray())
            }
            dataPerguntas.map((element) => {
                element.map((item) => {
                    if(item.instituição === "STF") {
                        arrayStfGlobal.push(item)
                    }
                    if(item.instituição === "STJ") {
                        arrayStjGlobal.push(item)
                    }
                })
            })
            const uniqueArrayStjGlobal = removeDuplicates(arrayStjGlobal, "idQuestion")
            const uniqueArrayStfGlobal  = removeDuplicates(arrayStfGlobal, "idQuestion")
            arrayOrderedMatStf = uniqueArrayStfGlobal.sort((a,b) => a.materia[0].localeCompare(b.materia[0]))
            arrayOrderedMatStj = uniqueArrayStjGlobal.sort((a,b) => a.materia[0].localeCompare(b.materia[0]))
            let materiasDuplicateStf = []
            let materiasDuplicateStj = []
            let materiasUniqueStf 
            let materiasUniqueStj 
            let arrayCut = []
            let arrayTodasFatiasStf = []
            let arrayTodasFatiasStj = []
         // Organização do array
         // array STF e STJ organizados por materia
         // Ler a matéria e adicionalá,
            arrayOrderedMatStf.map((element) => {
                materiasDuplicateStf.push(element.materia[0])
            })
            materiasUniqueStf= remove_duplicates_es6(materiasDuplicateStf)
            materiasUniqueStf.map((element) => {
                for(let i = 0; i < arrayOrderedMatStf.length; i++) {
                    if(element === arrayOrderedMatStf[i].materia[0]) {
                        arrayCut.push(arrayOrderedMatStf[i])
                    }
                }
                arrayCut.sort((a,b) => b.informativo - a.informativo)
                const fatia  = arrayCut
                fatia.map((element) => arrayTodasFatiasStf.push(element))
                arrayCut = []
              
            })
            ///////// STJ
            arrayOrderedMatStj.map((element) => {
                materiasDuplicateStj.push(element.materia[0])
            })
            materiasUniqueStj = remove_duplicates_es6(materiasDuplicateStj)
            materiasUniqueStj.map((element) => {
                for(let i = 0; i < arrayOrderedMatStj.length; i++) {
                    if(element === arrayOrderedMatStj[i].materia[0]) {
                        arrayCut.push(arrayOrderedMatStj[i])
                    }
                }
                arrayCut.sort((a,b) => b.informativo - a.informativo)
                const fatia = arrayCut
                fatia.map((element) => arrayTodasFatiasStj.push(element))
                arrayCut = []
            })
            let arrayCompleteStjAndStj = arrayTodasFatiasStf.concat(arrayTodasFatiasStj)
            retornoPerguntas.push(arrayCompleteStjAndStj)
           
        }
                
        if(inst.length > 0 && mat.length === 0 && info.length === 0 && temas.length === 0) {
            /////  OK!!! obs: nÃo aplicado por matéria e sim por informativos ordem decresc.
            for(let i = 0; i < inst.length; i++) {
                retornoPerguntas.push(await connectDB.collection('perguntas').find({instituição : `${inst[i]}`}).sort(sortInfo).toArray())
               }
        }
        if(info.length > 0 && mat.length === 0 && inst.length === 0 && temas.length === 0) {
            //// IINFORMATIVOS OK
            console.log(info.length)
            let inicial = parseInt(info[0])
            let final = parseInt(info[1])
           
            let arrayInfo = []

            if(info.length === 2) {
                console.log('é dois info')
                while(final >= inicial) {
                    const retorno = await connectDB.collection('perguntas').find({informativo : final}).toArray()
                    if(retorno.length > 0 ) {
                        retorno.map((element) => arrayInfo.push(element))
                    }
                    final = final - 1
                }
            }
            if(info.length === 1) {
                console.log('info 1')
                let infoInicial = parseInt(info[0])
                console.log(infoInicial)

                const sortInfo = { numeroInfo : 1}
                const ultimoInfo = await connectDB.collection('informativos').find({}).sort(sortInfo).toArray()
                const posicaoInfo = ultimoInfo.length - 1 
                const infoFinal = ultimoInfo[posicaoInfo].numeroInfo
                while(infoInicial <= infoFinal) {
                    const retorno = await connectDB.collection('perguntas').find({informativo :infoInicial}).toArray()
                    if(retorno.length > 0) {
                        retorno.map((element) => arrayInfo.push(element))
                       
                    }
                    infoInicial = infoInicial + 1
                }
            }
            arrayInfo.map((element) => {
                if(element.instituição === "STF") {
                    arrayStfGlobal.push(element)
                }
                if(element.instituição === "STJ") {
                    arrayStjGlobal.push(element)
                }
            })

            const uniqueArrayStjGlobal = removeDuplicates(arrayStjGlobal, "idQuestion")
            const uniqueArrayStfGlobal  = removeDuplicates(arrayStfGlobal, "idQuestion")
            arrayOrderedMatStf = uniqueArrayStfGlobal.sort((a,b) => a.materia[0].localeCompare(b.materia[0]))
            arrayOrderedMatStj = uniqueArrayStjGlobal.sort((a,b) => a.materia[0].localeCompare(b.materia[0]))
            let materiasDuplicateStf = []
            let materiasDuplicateStj = []
            let materiasUniqueStf 
            let materiasUniqueStj 
            let arrayCut = []
            let arrayTodasFatiasStf = []
            let arrayTodasFatiasStj = []
         
            arrayOrderedMatStf.map((element) => {
                materiasDuplicateStf.push(element.materia[0])
            })
            materiasUniqueStf= remove_duplicates_es6(materiasDuplicateStf)
            materiasUniqueStf.map((element) => {
                for(let i = 0; i < arrayOrderedMatStf.length; i++) {
                    if(element === arrayOrderedMatStf[i].materia[0]) {
                        arrayCut.push(arrayOrderedMatStf[i])
                    }
                }
                arrayCut.sort((a,b) => b.informativo - a.informativo)
                const fatia  = arrayCut
                fatia.map((element) => arrayTodasFatiasStf.push(element))
                arrayCut = []
              
            })
            ///////// STJ
            arrayOrderedMatStj.map((element) => {
                materiasDuplicateStj.push(element.materia[0])
            })
            materiasUniqueStj = remove_duplicates_es6(materiasDuplicateStj)
            materiasUniqueStj.map((element) => {
                for(let i = 0; i < arrayOrderedMatStj.length; i++) {
                    if(element === arrayOrderedMatStj[i].materia[0]) {
                        arrayCut.push(arrayOrderedMatStj[i])
                    }
                }
                arrayCut.sort((a,b) => b.informativo - a.informativo)
                const fatia = arrayCut
                fatia.map((element) => arrayTodasFatiasStj.push(element))
                arrayCut = []
            })
            let arrayCompleteStjAndStj = arrayTodasFatiasStf.concat(arrayTodasFatiasStj)
            retornoPerguntas.push(arrayCompleteStjAndStj)

        }

        if(temas.length > 0 && inst.length === 0 && info.length === 0 && mat.length === 0) {
            /////// OK!!!!!.

            let materiasUniqueStf 
            let materiasUniqueStj 
            for(let i = 0; i < temas.length; i++) {
                dataPerguntas.push(await connectDB.collection('perguntas').find({tema : `${temas[i]}`}).sort(sortInfo).toArray())
            }
            dataPerguntas[0].map((element) => {
                if(element.instituição === "STF") {
                    arrayStfGlobal.push(element)
                }
                if(element.instituição === "STJ") {
                    arrayStjGlobal.push(element)
                }
            })
            materiasUniqueStf = remove_duplicates_es6(arrayStfGlobal)
            materiasUniqueStj = remove_duplicates_es6(arrayStjGlobal)
            materiasUniqueStf.sort((a,b) => b.informativo - a.informativo)
            materiasUniqueStj.sort((a,b) => b.informativo - a.informativo)


            //// EU QUERIA FAZER POR MATERIAS, E POR ORDEM DE INFORMATIVO ..... 
                    // arrayOrderedMatStf = arrayStfGlobal.sort((a,b) => a.materia[0].localeCompare(b.materia[0]))
                    // arrayOrderedMatStj = arrayStjGlobal.sort((a,b) => a.materia[0].localeCompare(b.materia[0]))
                    // let materiasDuplicateStf = []
                    // let materiasDuplicateStj = []
                    // let materiasUniqueStf 
                    // let materiasUniqueStj 
                    // let arrayCut = []
                    // let arrayTodasFatiasStf = []
                    // let arrayTodasFatiasStj = []
                // Organização do array
                // array STF e STJ organizados por materia
                // Ler a matéria e adicionalá,
                    // arrayOrderedMatStf.map((element) => {
                    //     materiasDuplicateStf.push(element.materia[0])
                    // })
                    // materiasUniqueStf= remove_duplicates_es6(materiasDuplicateStf)
                    // materiasUniqueStf.map((element) => {
                    //     for(let i = 0; i < arrayOrderedMatStf.length; i++) {
                    //         if(element === arrayOrderedMatStf[i].materia[0]) {
                    //             arrayCut.push(arrayOrderedMatStf[i])
                    //         }
                    //     }
                    //     arrayCut.sort((a,b) => b.informativo - a.informativo)
                    //     const fatia  = arrayCut
                    //     fatia.map((element) => arrayTodasFatiasStf.push(element))
                    //     arrayCut = []
                    
                    // })
                    // ///////// STJ
                    // arrayOrderedMatStj.map((element) => {
                    //     materiasDuplicateStj.push(element.materia[0])
                    // })
                    // materiasUniqueStj = remove_duplicates_es6(materiasDuplicateStj)
                    // materiasUniqueStj.map((element) => {
                    //     for(let i = 0; i < arrayOrderedMatStj.length; i++) {
                    //         if(element === arrayOrderedMatStj[i].materia[0]) {
                    //             arrayCut.push(arrayOrderedMatStj[i])
                    //         }
                    //     }
                    //     arrayCut.sort((a,b) => b.informativo - a.informativo)
                    //     const fatia = arrayCut
                    //     fatia.map((element) => arrayTodasFatiasStj.push(element))
                    //     arrayCut = []
                    // })
            let arrayCompleteStjAndStj = materiasUniqueStf.concat(materiasUniqueStj)
            retornoPerguntas.push(arrayCompleteStjAndStj)

        }
        
        if(mat.length > 0 && inst.length > 0 && info.length === 0 && temas.length === 0) {
            /// OK!!!
            let arrayDuplicate = []
            let completearray = []
            let arrayStfUnique = []
            let arrayStjUnique = []
            if(inst.length === 1) {
                for(let i = 0; i < mat.length; i++) {
                    arrayDuplicate.push(await connectDB.collection('perguntas').find({materia : `${mat[i]}`, instituição: `${inst}`})
                    .sort(sortInfo).toArray())
                }
            }
            if(inst.length === 2) {
                for(let i = 0; i < mat.length; i++) {
                    arrayDuplicate.push(await connectDB.collection('perguntas').find({materia : `${mat[i]}`, instituição: `${inst[0]}`})
                    .sort(sortInfo).toArray())
                    arrayDuplicate.push(await connectDB.collection('perguntas').find({materia : `${mat[i]}`, instituição: `${inst[1]}`})
                    .sort(sortInfo).toArray())
                }
                
            }
            arrayDuplicate.map((element) => {
                element.map((item) => completearray.push(item))
            })
            const uniquearray = removeDuplicates(completearray, "idQuestion")
            uniquearray.map((element) => {
                if(element.instituição === "STF") {

                    arrayStfUnique.push(element)
                }
                if(element.instituição === "STJ") {
                    arrayStjUnique.push(element)
                }
            })
            const arrayOrderedAndUnique = arrayStfUnique.concat(arrayStjUnique)
            // console.log(arrayStfUnique)
           retornoPerguntas.push(arrayOrderedAndUnique)
        }

        if(mat.length > 0 && info.length > 0 && inst.length === 0 && temas.length === 0) {

            /// OK!! REFERENCIA CORTE POR MATÉRIAS!
            let arrayFatiado = []
            if(mat.length >= info.length) {
                for(let i = 0; i < mat.length; i++) {
                    if(info[1] && info[0]) {
                        console.log('inicial e final')
                        let inicial = parseInt(info[0])
                        let final = parseInt(info[1])
                        while(final >= inicial) {
                            const retorno = await connectDB.collection('perguntas').find({materia: mat[i], informativo : final}).toArray()
                            if(retorno.length > 0) {
                                dataPerguntas.push(retorno[0]) 
                            }
                            final = final - 1
                        }
                    }
                    if(info[0] && info[1] == undefined || null || info[1].length === 0) {
                        let infoInicial = parseInt(info[0])
                        const sortInfo = { numeroInfo : 1}
                        const ultimoInfo = await connectDB.collection('informativos').find({}).sort(sortInfo).toArray()
                        const posicaoInfo = ultimoInfo.length - 1 
                        const infoFinal = ultimoInfo[posicaoInfo].numeroInfo
                        while(infoInicial <= infoFinal) {
                            const retorno = await connectDB.collection('perguntas').find({materia: mat[i], informativo :infoInicial}).toArray()
                            if(retorno.length > 0) {
                                dataPerguntas.push(retorno[0])
                            }
                            infoInicial = infoInicial + 1
                        }
                    }   
                }
            }

            if(info.length > mat.length) {
                if(info[1] && info[0]) {
                    console.log('inicial e final')
                    let inicial = parseInt(info[0])
                    let final = parseInt(info[1])
                    while(final >= inicial) {
                        const retorno = await connectDB.collection('perguntas').find({materia: mat[0], informativo : final}).toArray()
                        if(retorno.length > 0) {
                            dataPerguntas.push(retorno[0]) 
                        }
                        final = final - 1
                    }
                }
                if(info[0] && info[1] == undefined || null || info[1].length === 0) {
                    let infoInicial = parseInt(info[0])
                    const sortInfo = { numeroInfo : 1}
                    const ultimoInfo = await connectDB.collection('informativos').find({}).sort(sortInfo).toArray()
                    const posicaoInfo = ultimoInfo.length - 1 
                    const infoFinal = ultimoInfo[posicaoInfo].numeroInfo
                    while(infoInicial <= infoFinal) {
                        const retorno = await connectDB.collection('perguntas').find({materia: mat[0], informativo :infoInicial}).toArray()
                        if(retorno.length > 0) {
                            dataPerguntas.push(retorno[0])
                        }
                        infoInicial = infoInicial + 1
                    }
                }   
            }
            const uniqueArr = removeDuplicates(dataPerguntas, "idQuestion")
            uniqueArr.map((element) => {
                if(element.instituição === "STF") {
                    arrayStfGlobal.push(element)
                }
                if(element.instituição === "STJ") {
                        arrayStjGlobal.push(element)
                }
            })
            mat.map((element) => {
                let arraycut = []
                arrayStfGlobal.map((element2) => {
                    for(let i = 0; i < element2.materia.length;i++) {
                        console.log('??')
                        if(element === element2.materia[i]) {
                            arraycut.push(element2)
                        }
                    }
                })
                arraycut.sort((a,b) => b.informativo - a.informativo)
                arraycut.map((element) => arrayFatiado.push(element))
            })

            mat.map((element) => {
                let arraycut = []
                arrayStjGlobal.map((element2) => {
                    for(let i = 0; i < element2.materia.length;i++) {
                        if(element === element2.materia[i]) {
                            arraycut.push(element2)
                        }
                    }
                })
                arraycut.sort((a,b) => b.informativo - a.informativo)
                arraycut.map((element) => arrayFatiado.push(element))
            })
            retornoPerguntas.push(arrayFatiado)    
        }

        if(mat.length > 0 && inst.length > 0 && info.length > 0 && temas.length === 0) {
            let arrayFatiado = []
            let arrayDataPerguntas = []
            if(mat.length >= inst.length && mat.length >= info.length) {
                if(info.length > inst.length) {
                    console.log('infooormativo maior que inst')
                    for(let i = 0; i < mat.length; i++) {
                        if(info[1] && info[0]) {
                            let inicial = parseInt(info[0])
                            let final = parseInt(info[1])
                            while(final >= inicial) {
                                const retorno = await connectDB.collection('perguntas').find({materia: mat[i], informativo : final, instituição:inst[0]}).toArray()
                                // console.log(retorno)
                                if(retorno.length > 0) {
                                    // console.log(retorno)
                                    retorno.map((element) => arrayDataPerguntas.push(element))   
                                } 
                                final = final - 1
                            }
                        }
                        if(info[0] && info[1] == undefined || null || info[1].length === 0) {
                            let infoInicial = parseInt(info[0])
                            const sortInfo = { numeroInfo : 1}
                            const ultimoInfo = await connectDB.collection('informativos').find({}).sort(sortInfo).toArray()
                            const posicaoInfo = ultimoInfo.length - 1 
                            const infoFinal = ultimoInfo[posicaoInfo].numeroInfo
                            while(infoInicial <= infoFinal) {
                                const retorno = await connectDB.collection('perguntas').find({materia: mat[i], informativo :infoInicial, instituição:inst[0]}).toArray()
                                if(retorno.length > 0){
                                    retorno.map((element) => arrayDataPerguntas.push(element))
                                }
                                infoInicial = infoInicial + 1
                            }
                        }
                    }
                }
                if(info.length === inst.length) {
    
                    console.log('infooormativo IGUAL que inst')
                    for(let i = 0; i < mat.length; i++) {
                        if(info[1] && info[0]) {
                            let inicial = parseInt(info[0])
                            let final = parseInt(info[1])
                            while(final >= inicial) {
                                for(let k = 0; k < inst.length; k++) {
                                    const retorno = await connectDB.collection('perguntas').find({materia: mat[i], informativo : final, instituição:inst[k]}).toArray()
                                    if(retorno.length > 0 ){
                                        retorno.map((element) => arrayDataPerguntas.push(element)) 
                                    }
                                    
                                    final = final - 1
                                }
                            }
                        }
                        if(info[0] && info[1] == undefined || null || info[1].length === 0) {
                            let infoInicial = parseInt(info[0])
                            const sortInfo = { numeroInfo : 1}
                            const ultimoInfo = await connectDB.collection('informativos').find({}).sort(sortInfo).toArray()
                            const posicaoInfo = ultimoInfo.length - 1 
                            const infoFinal = ultimoInfo[posicaoInfo].numeroInfo
                            while(infoInicial <= infoFinal) {
                                for(let k = 0; k < inst.length; k++) {
                                    const retorno = await connectDB.collection('perguntas').find({materia: mat[i], informativo :infoInicial, instituição:inst[k]}).toArray()
                                    if(retorno.length > 0 ) {
                                        retorno.map((element) => arrayDataPerguntas.push(element))
                                    }
                                    infoInicial = infoInicial + 1
                                }
                            }
                        }   
                    }
                 
                }
                if(info.length < inst.length) {
                    console.log('infooormativo menor que inst')
                    for(let i = 0; i < mat.length; i++) {
                        for(let j = 0; j < inst.length; j++) {
                            if(info[1] && info[0]) {
                                console.log('inicial e final')
                                let inicial = parseInt(info[0])
                                let final = parseInt(info[1])
                                while(final >= inicial) {
                                    for(let j = 0; j < inst.length; j++) {
                                        const retorno = await connectDB.collection('perguntas').find({materia: mat[i], informativo : final, instituição:inst[j]}).toArray()
                                        if(retorno.length > 0) {
                                            retorno.map((element) => arrayDataPerguntas.push(element))
                                        } 
                                        final = final - 1
                                    }
                                }
                            }
                            if(info[0] && info[1] == undefined || null || info[1].length === 0) {
                                let infoInicial = parseInt(info[0])
                                const sortInfo = { numeroInfo : 1}
                                const ultimoInfo = await connectDB.collection('informativos').find({}).sort(sortInfo).toArray()
                                const posicaoInfo = ultimoInfo.length - 1 
                                const infoFinal = ultimoInfo[posicaoInfo].numeroInfo
                                while(infoInicial <= infoFinal) {
                                    for(let j = 0; j < inst.length; j++) {
                                        const retorno = await connectDB.collection('perguntas').find({materia: mat[i], informativo :infoInicial, instituição:inst[j]}).toArray()
                                        if(retorno.length > 0) {
                                            retorno.map((element) => arrayDataPerguntas.push(element))
                                        }
                                        infoInicial = infoInicial + 1
                                    }
                                }
                            }
                        }   
                    }
                }
            }

            if(info.length > mat.length && info.length > inst.length && temas.length === 0)  {

                if(mat.length >= inst.length) {
                        for(let j = 0; j < mat.length; j++) {
                            for(let k = 0; k < inst.length; k++) {
                                if(info[1] && info[0]) {
                                    console.log('inicial e final')
                                    let inicial = info[0]
                                    let final = info[1]
                                    while(final >= inicial) {
                                        const retorno = await connectDB.collection('perguntas').find({materia: mat[j], informativo : final, instituição:inst[k]}).toArray()
                                        if(retorno.length > 0) {
                                            retorno.map((element) => arrayDataPerguntas.push(element))
                                        }
                                            final = final - 1
                                    }
                                }
                                if(info[0] && info[1] == undefined || null || info[1].length === 0) {
                                    let infoInicial = parseInt(info[0])
                                    const sortInfo = { numeroInfo : 1}
                                    const ultimoInfo = await connectDB.collection('informativos').find({}).sort(sortInfo).toArray()
                                    const posicaoInfo = ultimoInfo.length - 1 
                                    const infoFinal = ultimoInfo[posicaoInfo].numeroInfo
                                    while(infoInicial <= infoFinal) {
                                        const retorno = await connectDB.collection('perguntas').find({materia: mat[j], informativo :infoInicial, instituição:inst[k]}).toArray()
                                        if(retorno.length > 0) {
                                            retorno.map((element) => arrayDataPerguntas.push(element) )
                                        }
                                            infoInicial = infoInicial + 1
                                    }
                                }
                            }
                        }
                }
            }
            if(inst.length >= mat.length && inst.length >= info.length && temas.length === 0) {
                if(mat.length >= info.length) {
                    for(let i = 0; i < inst.length; i++) {
                        for(let j = 0; j < mat.length; j++) {
                            if(info[1] && info[0]) {
                                let inicial = info[0]
                                let final = info[1]
                                while(final >= inicial) {
                                    const retorno = await connectDB.collection('perguntas').find({materia: mat[j], informativo : final, instituição:inst[i]}).toArray()
                                    if(retorno.length > 0 ) {
                                        retorno.map((element) => arrayDataPerguntas.push(element) )
                                    }
                                        final = final - 1
                                }
                            }
                            if(info[0] && info[1] == undefined || null || info[1].length === 0) {
                                console.log('oi undefined info')
                                let infoInicial = parseInt(info[0])
                                const sortInfo = { numeroInfo : 1}
                                const ultimoInfo = await connectDB.collection('informativos').find({}).sort(sortInfo).toArray()
                                const posicaoInfo = ultimoInfo.length - 1 
                                const infoFinal = ultimoInfo[posicaoInfo].numeroInfo
                                while(infoInicial <= infoFinal) {
                                    const retorno = await connectDB.collection('perguntas').find({materia: mat[j], informativo :infoInicial, instituição:inst[i]}).toArray()
                                    if(retorno.length > 0 ) {
                                        retorno.map((element) => arrayDataPerguntas.push(element))
                                    }
                                        infoInicial = infoInicial + 1
                                }
                            }
                        }
                    }
                }
                if(mat.length <= info.length) {
                    for(let i = 0; i < inst.length; i++) {
                            for(let k = 0; k < mat.length; k++) {
                                if(info[1] && info[0]) {
                                    console.log('inicial e final')
                                    let inicial = info[0]
                                    let final = info[1]
                                    while(final >= inicial) {
                                        for(let j = 0; j < inst.length; j++) {
                                            const retorno = await connectDB.collection('perguntas').find({materia: mat[k], informativo : final, instituição:inst[i]}).toArray()
                                            if(retorno.length > 0 ) {
                                                retorno.map((element) => arrayDataPerguntas.push(element) )
                                            }
                                            final = final - 1
                                        }
                                    }
                                }
                                if(info[0] && info[1] == undefined || null || info[1].length === 0) {
                                    let infoInicial = parseInt(info[0])
                                    const sortInfo = { numeroInfo : 1}
                                    const ultimoInfo = await connectDB.collection('informativos').find({}).sort(sortInfo).toArray()
                                    const posicaoInfo = ultimoInfo.length - 1 
                                    const infoFinal = ultimoInfo[posicaoInfo].numeroInfo
                                    while(infoInicial <= infoFinal) {
                                        for(let j = 0; j < inst.length; j++) {
                                            const retorno = await connectDB.collection('perguntas').find({materia: mat[k], informativo :infoInicial, instituição:inst[i]}).toArray()
                                            if(retorno.length > 0) {
                                                retorno.map((element) => arrayDataPerguntas.push(element))
                                            }
                                            infoInicial = infoInicial + 1
                                        }
                                    }
                                }
                            }
                    }
                }
            }

            const uniqueArr = removeDuplicates(arrayDataPerguntas, "idQuestion")
            uniqueArr.map((element) => {
                if(element.instituição === "STF") {
                    arrayStfGlobal.push(element)
                }
                if(element.instituição === "STJ") {
                        arrayStjGlobal.push(element)
                }
            })
            mat.map((element) => {
                let arraycut = []
                arrayStfGlobal.map((element2) => {
                    for(let i = 0; i < element2.materia.length;i++) {
                        if(element === element2.materia[i]) {
                            arraycut.push(element2)
                        }
                    }
                })
                arraycut.sort((a,b) => b.informativo - a.informativo)
                arraycut.map((element) => arrayFatiado.push(element))
            })

            mat.map((element) => {
                let arraycut = []
                arrayStjGlobal.map((element2) => {
                    for(let i = 0; i < element2.materia.length;i++) {
                        if(element === element2.materia[i]) {
                            arraycut.push(element2)
                        }
                    }
                })
                arraycut.sort((a,b) => b.informativo - a.informativo)
                arraycut.map((element) => arrayFatiado.push(element))
            })
            retornoPerguntas.push(arrayFatiado)
          
        }
        if(inst.length > 0 && info.length > 0 && mat.length === 0 && temas.length === 0) {
            /////// OK
            for(let i = 0; i < inst.length; i++) {
                if(info[1] && info[0]) {
                    let inicial = parseInt(info[0])
                    let final = parseInt(info[1])
                    while(final >= inicial) {
                        const retorno = await connectDB.collection('perguntas').find({informativo : final, instituição:inst[i]}).toArray()
                        // console.log(retorno)
                        if(retorno.length > 0) {
                            // console.log(retorno)
                            retorno.map((element) => dataPerguntas.push(element))   
                        } 
                        final = final - 1
                    }
                }
                if(info[0] && info[1] == undefined || null || info[1].length === 0) {
                    let infoInicial = parseInt(info[0])
                    const sortInfo = { numeroInfo : 1}
                    const ultimoInfo = await connectDB.collection('informativos').find({}).sort(sortInfo).toArray()
                    const posicaoInfo = ultimoInfo.length - 1 
                    const infoFinal = ultimoInfo[posicaoInfo].numeroInfo
                    while(infoInicial <= infoFinal) {
                        const retorno = await connectDB.collection('perguntas').find({informativo :infoInicial, instituição:inst[i]}).toArray()
                        if(retorno.length > 0){
                            retorno.map((element) => dataPerguntas.push(element))
                        }   
                        infoInicial = infoInicial + 1
                    }
                }
            }
            dataPerguntas.map((element) => {
                if(element.instituição === "STF") {arrayStfGlobal.push(element)}
                if(element.instituição === "STJ") {arrayStjGlobal.push(element)}
            })
            arrayStfGlobal.sort((a,b) => b.informativo - a.informativo)
            arrayStjGlobal.sort((a,b) => b.informativo - a.informativo)
            const stfAndStj = arrayStfGlobal.concat(arrayStjGlobal)
            retornoPerguntas.push(stfAndStj)
        }
        
        if(temas.length > 0 && mat.length > 0 && inst.length === 0 && info.length === 0) {
            //// /// OK
            let arrayFatiado = []
            if(temas.length >= mat.length) {
                for(let i = 0; i < temas.length; i++) {
                    for(let j = 0; j < mat.length; j++) {
                        const retorno = await connectDB.collection('perguntas').find({materia: mat[j], tema: temas[i]}).toArray()
                        if(retorno.length > 0) {retorno.map((element) => dataPerguntas.push(element))}
                    }
                } 
            }
            if(mat.length > temas.length) {
                for(let i = 0; i< mat.length; i++) {
                    for(let j = 0; j < temas.length; j++) {
                        const retorno = await connectDB.collection('perguntas').find({materia: mat[i], tema: temas[j]}).toArray()
                        if(retorno.length > 0) {retorno.map((element) => dataPerguntas.push(element))}
                    }
                }
            }
            const uniqueArray = removeDuplicates(dataPerguntas, "idQuestion")
            uniqueArray.map((element) => {
                if(element.instituição === "STF") {arrayStfGlobal.push(element)}
                if(element.instituição === "STJ") {arrayStjGlobal.push(element)}
            })


            mat.map((element) => {
                let arraycut = []
                arrayStfGlobal.map((element2) => {
                    for(let i = 0; i < element2.materia.length;i++) {
                        if(element === element2.materia[i]) {
                            arraycut.push(element2)
                        }
                    }
                })
                arraycut.sort((a,b) => b.informativo - a.informativo)
                arraycut.map((element) => arrayFatiado.push(element))
            })

            mat.map((element) => {
                let arraycut = []
                arrayStjGlobal.map((element2) => {
                    for(let i = 0; i < element2.materia.length;i++) {
                        if(element === element2.materia[i]) {
                            arraycut.push(element2)
                        }
                    }
                })
                arraycut.sort((a,b) => b.informativo - a.informativo)
                arraycut.map((element) => arrayFatiado.push(element))
            })
            retornoPerguntas.push(arrayFatiado)
        }
        if(temas.length > 0 && inst.length > 0  && mat.length === 0 && info.length === 0) {
            ///////// OK !!!
            if(inst[0] && inst[1] == undefined) {
                console.log('somente 1 !')
                let arrayInst = []
                let arrayMat = []
                let arrayCut = []
                let arrayCutFinally = []
                let arrayIds = []
            
                for(let i = 0; i < temas.length; i++) {
                    const retorno = await connectDB.collection('perguntas').find({tema: temas[i], instituição: inst[0]}).toArray()
                    // console.log(retorno)
                    if(retorno.length > 0) {
                        retorno.map((element) => arrayInst.push(element) )
                    }
                }
                function removeDuplicates(originalArray, prop) {
                    var newArray = [];
                    var lookupObject  = {};
               
                    for(var i in originalArray) {
                       lookupObject[originalArray[i][prop]] = originalArray[i];
                    }
               
                    for(i in lookupObject) {
                        newArray.push(lookupObject[i]);
                    }
                     return newArray;
                }
                const uniqueArray = removeDuplicates(arrayInst, "idQuestion")
                uniqueArray.map((element) => {
                    element.materia.map((item) => {
                        if(arrayMat.indexOf(item) === -1) {
                            arrayMat.push(item)
                        }
                    })
                })
                arrayMat.sort((a,b) => a.localeCompare(b))
                arrayMat.map((element) => {
                    uniqueArray.map((element2) => {
                        element2.materia.map((mat) => {
                            if(element === mat) {
                                arrayCut.push(element2)
                            }
                        })
                    })
                    arrayCut.sort((a,b) => b.informativo - a.informativo)
                    arrayCut.map((element) => {
                        if(arrayIds.indexOf(element.idQuestion) === -1) {
                            arrayIds.push(element.idQuestion)
                            arrayCutFinally.push(element)
                        }

                    })
                    arrayCut = []
                })
                retornoPerguntas.push(arrayCutFinally)
            }
            if(inst.length === 2) {
                function removeDuplicates(originalArray, prop) {
                    var newArray = [];
                    var lookupObject  = {};
               
                    for(var i in originalArray) {
                       lookupObject[originalArray[i][prop]] = originalArray[i];
                    }
               
                    for(i in lookupObject) {
                        newArray.push(lookupObject[i]);
                    }
                     return newArray;
                }
                ///STF, STJ SERVIDORES PUBLICOS
                let arrayStj = []
                let arrayStf = []
                let retornoStf = []
                let retornoStj = []
                let arrayCutStf = []
                let arrayCutStj = []
                let arrayIdsStf = []
                let arrayIdsStj = []
                let arrayCutFinally = []
                let arrayMatStf = []
                let arrayMatStj = []
                for(let i = 0; i < temas.length; i++) {
                    const stf = await connectDB.collection('perguntas').find({tema: temas[i], instituição: "STF"}).toArray()
                    if(stf.length > 0) {
                        stf.map((element) => retornoStf.push(element))
                    }
                    const stj = await connectDB.collection('perguntas').find({tema: temas[i], instituição: "STJ"}).toArray()
                    if(stj.length > 0) {
                        stj.map((element) => retornoStj.push(element))
                    }
                    const newarraystf = removeDuplicates(retornoStf, "idQuestion")
                const newarraystj = removeDuplicates(retornoStj, "idQuestion")
                newarraystf.map((element) => {
                    element.materia.map((item) => {
                        if(arrayMatStf.indexOf(item) === -1) {
                            arrayMatStf.push(item)
                        }
                    })
                })
                newarraystj.map((element) => {
                    element.materia.map((item) => {
                        if(arrayMatStj.indexOf(item) === -1) {
                            arrayMatStj.push(item)
                        }
                    })
                })
                arrayMatStf.sort((a,b) => a.localeCompare(b))
                arrayMatStj.sort((a,b) => a.localeCompare(b))
                arrayMatStf.map((element) => {
                    newarraystf.map((element2) => {
                        element2.materia.map((mat) => {
                            if(element === mat) {
                                if(arrayIdsStf.indexOf(element2.idQuestion) === -1) {
                                    arrayIdsStf.push(element2.idQuestion)
                                    arrayCutStf.push(element2)
                                }
                            }
                        })
                    })
                    arrayCutStf.sort((a,b) => b.informativo - a.informativo)
                    arrayCutStf.map((element) => arrayStf.push(element))
                    arrayCutStf = []
                })

                arrayMatStj.map((element) => {
                    newarraystj.map((element2) => {
                        element2.materia.map((mat) => {
                            if(element === mat) {
                                if(arrayIdsStj.indexOf(element2.idQuestion) === -1) {
                                    arrayIdsStj.push(element2.idQuestion)
                                    arrayCutStj.push(element2)
                                }
                            }
                        })
                    })
                    arrayCutStj.sort((a,b) => b.informativo - a.informativo)
                    arrayCutStj.map((element) => arrayStj.push(element))
                    arrayCutStj = []
                })
                arrayStf.map((element) => arrayCutFinally.push(element))
                arrayStj.map((element) => arrayCutFinally.push(element))
                arrayStf = []
                arrayStj = []
                }
                retornoPerguntas.push(arrayCutFinally)
            }
            
        }

        if(temas.length > 0 && info.length > 0 && mat.length === 0 && inst.length === 0) {
            /////// OK
            let arrayTemas = []
            let retornoStf = []
            let retornoStj = []
            let arrayStf = []
            let arrayStj = []
            let arrayMats = []
            let arrayMatStj = []
            let arrayCut = []
            let arrayCutStj = []
            let arrayIdStf = []
            let arrayIdStj = []
            for(let i = 0; i < temas.length; i++) {
                if(info.length === 1) {
                    let infoInicial = parseInt(info[0])
                    const sortInfo = { numeroInfo : 1}
                    const ultimoInfo = await connectDB.collection('informativos').find({}).sort(sortInfo).toArray()
                    const posicaoInfo = ultimoInfo.length - 1 
                    const infoFinal = ultimoInfo[posicaoInfo].numeroInfo
                    while(infoInicial <= infoFinal) {
                        const retorno =  await connectDB.collection('perguntas').find({tema: temas[i], informativo :infoInicial}).toArray()
                        if(retorno.length > 0) {
                            if(retorno.length > 1) {
                                retorno.map((element) => arrayTemas.push(element))
                            }
                            if(retorno.length === 1) {
                                arrayTemas.push(retorno[0])
                            }
                        }
                        infoInicial = infoInicial + 1
                    }
                }
                if(info.length === 2 ) {
                    let inicial = info[0]
                    let final = info[1]
                    while(final >= inicial) {
                        const retorno = await connectDB.collection('perguntas').find({tema: temas[i],informativo : final}).toArray()
                        if(retorno.length > 0 ) {
                            if(retorno.length > 1) {
                                retorno.map((element) => arrayTemas.push(element))
                            }
                            if(retorno.length === 1) {
                                arrayTemas.push(retorno[0])
                            }
                        }
                        final = final - 1
                        }
                }
            }
            const uniqueArray = removeDuplicates(arrayTemas,"idQuestion")
            uniqueArray.map((element) => {
                if(element.instituição === "STF") {
                    retornoStf.push(element)
                }
                if(element.instituição === "STJ") {
                    retornoStj.push(element)
                }
            })
            const uniqueArrStf = removeDuplicates(retornoStf, "idQuestion")
            const uniqueArrStj = removeDuplicates(retornoStj, "idQuestion")

            uniqueArrStf.map((element) => {
                element.materia.map((mat) => {
                    if(arrayMats.indexOf(mat) === -1) {
                        arrayMats.push(mat)
                    }
                })
            })
            uniqueArrStj.map((element) => {
                element.materia.map((mat) => {
                    if(arrayMatStj.indexOf(mat) === -1) {
                        arrayMatStj.push(mat)
                    }
                })
            })

            arrayMats.sort((a,b) => a.localeCompare(b))
            arrayMatStj.sort((a,b) => a.localeCompare(b))

            arrayMats.map((element) => {
                uniqueArrStf.map((element2) => {
                    element2.materia.map((mat) => {
                        if(element === mat) {
                            if(arrayIdStf.indexOf(element2.idQuestion) === -1) {
                                arrayIdStf.push(element2.idQuestion)
                                arrayCut.push(element2)
                            }
                        }
                    })
                })
                arrayCut.sort((a,b) => b.informativo - a.informativo)
                arrayCut.map((element) => arrayStf.push(element))
                arrayCut = []
            })

            arrayMatStj.map((element) => {
                uniqueArrStj.map((element2) => {
                    element2.materia.map((mat) => {
                        if(element === mat) {
                            if(arrayIdStj.indexOf(element2.idQuestion) === -1) {
                                arrayIdStj.push(element2.idQuestion)
                                arrayCutStj.push(element2)
                            }
                        }
                    })
                })
                arrayCutStj.sort((a,b) => b.informativo - a.informativo)
                arrayCutStj.map((element) => arrayStj.push(element))
                arrayCutStj = []
            })
            const completeArrayOrdered = arrayStf.concat(arrayStj)
            retornoPerguntas.push(completeArrayOrdered)
        }
        
        if(temas.length > 0 && mat.length > 0 && info.length > 0 && inst.length === 0) {
            /// OK
            let arrayGeral = []
            let arrayStf = []
            let arrayStj = []
            let arrayIds = []
            let arrayCut = []
            let arrayComplete = []
            if(temas.length >= mat.length && temas.length >= info.length) {
              
                if(mat.length >= info.length) {
                    console.log('if')
                    for(let i = 0; i < temas.length; i++) {
                        for(let j = 0; j < mat.length; j++) {
                            let inicial = parseInt(info[0])
                            let final = parseInt(info[1])
                
                            if(info[1] && info[0]) {
                                while(final >= inicial) {
                                    const retorno = await connectDB.collection('perguntas').find({materia: mat[j], tema: temas[i],informativo : final}).toArray()
                                    if(retorno.length > 0) {retorno.map((element) => arrayGeral.push(element))}
                                    final = final - 1
                                }
                            }
                            if(info[0] && info[1] == undefined || null || info[1].length === 0) {
                                let infoInicial = parseInt(info[0])
                                const sortInfo = { numeroInfo : 1}
                                const ultimoInfo = await connectDB.collection('informativos').find({}).sort(sortInfo).toArray()
                                const posicaoInfo = ultimoInfo.length - 1 
                                const infoFinal = ultimoInfo[posicaoInfo].numeroInfo
                                while(infoInicial <= infoFinal) {
                                    const retorno = await connectDB.collection('perguntas').find({materia: mat[j], tema: temas[i], informativo :infoInicial}).toArray()
                                    if(retorno.length > 0 ) {retorno.map((element) => arrayGeral.push(element))}
                                    infoInicial = infoInicial + 1
                                }
                            }
                        }
                    }
                }
                if(info.length > mat.length) {
                    console.log('info é maior que materia...')
                    for(let i = 0; i < temas.length; i++) {
                        for(let j = 0; j < mat.length; j++) {

                            let inicial = parseInt(info[0])
                            let final = parseInt(info[1])
                
                            if(info[1] && info[0]) {
                                while(final >= inicial) {
                                    const retorno = await connectDB.collection('perguntas').find({materia: mat[j], tema: temas[i],informativo : final}).toArray()
                                    if(retorno.length > 0) {retorno.map((element) => arrayGeral.push(element))}
                                    final = final - 1
                                }
                            }
                            if(info[0] && info[1] == undefined || null || info[1].length === 0) {
                                let infoInicial = parseInt(info[0])
                                const sortInfo = { numeroInfo : 1}
                                const ultimoInfo = await connectDB.collection('informativos').find({}).sort(sortInfo).toArray()
                                const posicaoInfo = ultimoInfo.length - 1 
                                const infoFinal = ultimoInfo[posicaoInfo].numeroInfo
                                while(infoInicial <= infoFinal) {
                                    const retorno = await connectDB.collection('perguntas').find({materia: mat[j], tema: temas[i], informativo :infoInicial}).toArray()
                                    if(retorno.length > 0) {retorno.map((element) => arrayGeral.push(element))}
                                    infoInicial = infoInicial + 1
                                }
                            }

                        }
                    }
                }
            }

            if(mat.length > temas.length) {
                for(let i = 0; i < mat.length; i++) {
                    for(let j = 0; j < temas.length; j++) {
                            let inicial = parseInt(info[0])
                            let final = parseInt(info[1])
                
                            if(info[1] && info[0]) {
                                while(final >= inicial) {
                                    const retorno = await connectDB.collection('perguntas').find({materia: mat[i], tema: temas[j],informativo : final}).toArray()
                                    if(retorno.length > 0) {retorno.map((element) => arrayGeral.push(element))}
                                    final = final - 1
                                }
                            }
                            if(info[0] && info[1] == undefined || null || info[1].length === 0) {
                                let infoInicial = parseInt(info[0])
                                const sortInfo = { numeroInfo : 1}
                                const ultimoInfo = await connectDB.collection('informativos').find({}).sort(sortInfo).toArray()
                                const posicaoInfo = ultimoInfo.length - 1 
                                const infoFinal = ultimoInfo[posicaoInfo].numeroInfo
                                while(infoInicial <= infoFinal) {
                                    const retorno = await connectDB.collection('perguntas').find({materia: mat[i], tema: temas[j], informativo :infoInicial}).toArray()
                                    if(retorno.length > 0) {retorno.map((element) => arrayGeral.push(element))}
                                    infoInicial = infoInicial + 1
                                }
                            }
                    }
                }
            }
            arrayGeral.map((element) => {
                if(element.instituição === "STF") {
                    arrayStf.push(element)
                }
                if(element.instituição === "STJ") {
                    arrayStj.push(element)
                }
            })

            mat.map((element) => {
                arrayStf.map((element2) => {
                    element2.materia.map((mat) => {
                        if(element === mat) {
                            if(arrayIds.indexOf(element2.idQuestion) === -1) {
                                arrayIds.push(element2.idQuestion)
                                arrayCut.push(element2)
                            }
                        }
                    })
                })
                arrayCut.sort((a,b) => b.informativo - a.informativo)
                arrayCut.map((element) => arrayComplete.push(element))
                arrayCut = []

            })
            mat.map((element) => {
                arrayStj.map((element2) => {
                    element2.materia.map((mat) => {
                        if(element === mat) {
                            if(arrayIds.indexOf(element2.idQuestion) === -1) {
                                arrayIds.push(element2.idQuestion)
                                arrayCut.push(element2)
                            }
                        }
                    })
                })
                arrayCut.sort((a,b) => b.informativo - a.informativo)
                arrayCut.map((element) => arrayComplete.push(element))
                arrayCut = []

            })
            retornoPerguntas.push(arrayComplete)
        }

        if(temas.length > 0 && mat.length > 0 && info.length > 0 && inst.length > 0) {  

            /// OK!!
            let arrayCutStf = []
            let arrayCutStj = []
            let arrayGeral = []
            let arrayGeralUnique = []
            let arrayStf = []
            let arrayStj = []
            let arrayIds = []
            if(mat.length >= temas.length && mat.length >= inst.length) {
                if(temas.length >= inst.length) {
                    for(let i = 0; i < mat.length; i++) {
                        for(let j = 0 ; j < temas.length; j++) {
                            for(let k = 0 ; k < inst.length; k++) {
                                let inicial = parseInt(info[0])
                                let final = parseInt(info[1])
                    
                                if(info[1] && info[0]) {
                                    while(final >= inicial) {
                                        const retorno = await connectDB.collection('perguntas').find({materia: mat[i], tema: temas[j],informativo : final, instituição: inst[k]}).toArray()
                                        if(retorno.length > 0) {retorno.map((element) => arrayGeral.push(element))}
                                        final = final - 1
                                    }
                                }
                                if(info[0] && info[1] == undefined || null || info[1].length === 0) {
                                    let infoInicial = parseInt(info[0])
                                    const sortInfo = { numeroInfo : 1}
                                    const ultimoInfo = await connectDB.collection('informativos').find({}).sort(sortInfo).toArray()
                                    const posicaoInfo = ultimoInfo.length - 1 
                                    const infoFinal = ultimoInfo[posicaoInfo].numeroInfo
                                    while(infoInicial <= infoFinal) {
                                        const retorno = await connectDB.collection('perguntas').find({materia: mat[i], tema: temas[j], informativo :infoInicial, instituição: inst[k]}).toArray()
                                        if(retorno.length > 0) {retorno.map((element) => arrayGeral.push(element))}                            
                                        infoInicial = infoInicial + 1
                                    }
                                }
                            }
                        }
                    }
                }
                if(inst.length > temas.length) {
                    for(let i = 0; i < mat.length; i++) {
                        for(let j = 0 ; j < inst.length; j++) {
                            for(let k = 0 ; k < temas.length; k++) {
                                let inicial = parseInt(info[0])
                                let final = parseInt(info[1])
                    
                                if(info[1] && info[0]) {
                                    console.log('2 infos setados')
                                    while(final >= inicial) {
                                        const retorno = await connectDB.collection('perguntas').find({materia: mat[i], tema: temas[k],informativo : final, instituição: inst[j]}).toArray()
                                        if(retorno.length > 0) {retorno.map((element) => arrayGeral.push(elment))}
                                        final = final - 1
                                    }
                                }
                                if(info[0] && info[1] == undefined || null || info[1].length === 0) {
                                    let infoInicial = parseInt(info[0])
                                    const sortInfo = { numeroInfo : 1}
                                    const ultimoInfo = await connectDB.collection('informativos').find({}).sort(sortInfo).toArray()
                                    const posicaoInfo = ultimoInfo.length - 1 
                                    const infoFinal = ultimoInfo[posicaoInfo].numeroInfo
                                    while(infoInicial <= infoFinal) {
                                        const retorno = await connectDB.collection('perguntas').find({materia: mat[i], tema: temas[k], informativo :infoInicial, instituição: inst[j]}).toArray()
                                        if(retorno.length > 0) {retorno.map((element) => arrayGeral.push(element))}                              
                                        infoInicial = infoInicial + 1
                                    }
                                }
                            }
                        }
                    }
                }
            }
            if(temas.length > mat.length && temas.length >= inst.length) {
                console.log('temas maior que todos')
                if(mat.length > inst.length) {
                    console.log('materia maior que insttttt')
                    for(let i = 0; i < temas.length; i++) {
                        for(let j = 0; j < mat.length; j++) {
                            for(let k = 0; k < inst.length; k++) {
                                let inicial =  parseInt(info[0])
                                let final = parseInt(info[1])
                    
                                if(info[1] && info[0]) {
                                    console.log('2 infos setados')
                                    while(final >= inicial) {
                                        const retorno = await connectDB.collection('perguntas').find({materia: mat[j], tema: temas[i],informativo : final, instituição: inst[k]}).toArray()
                                        if(retorno.length > 0) {retorno.map((element) => arrayGeral.push(element))}
                                        final = final - 1
                                    }
                                }
                                if(info[0] && info[1] == undefined || null || info[1].length === 0) {
                                    let infoInicial = parseInt(info[0])
                                    const sortInfo = { numeroInfo : 1}
                                    const ultimoInfo = await connectDB.collection('informativos').find({}).sort(sortInfo).toArray()
                                    const posicaoInfo = ultimoInfo.length - 1 
                                    const infoFinal = ultimoInfo[posicaoInfo].numeroInfo
                                    while(infoInicial <= infoFinal) {
                                        const retorno = await connectDB.collection('perguntas').find({materia: mat[j], tema: temas[i], informativo :infoInicial, instituição: inst[k]}).toArray()
                                        if(retorno.length > 0) {retorno.map((element) => arrayGeral.push(element))}                              
                                        infoInicial = infoInicial + 1
                                    }
                                }
                            }
                        }
                    }
                }
            } 
            if(inst.length >= temas.length && inst.length > mat.length) {
                console.log('inst maior que todddddddus')
                if(temas.length >= mat.length) {
                    console.log('temas maior que matttt')
                   for(let i = 0; i < inst.length; i++) {
                       for(let j = 0; j < temas.length; j++) {
                           for(let k = 0; k < mat.length; k++) {
                                let inicial = parseInt(info[0])
                                let final = parseInt(info[1])
                    
                                if(info[1] && info[0]) {
                                    console.log('2 infos setados')
                                    while(final >= inicial) {
                                        const retorno = await connectDB.collection('perguntas').find({materia: mat[k], tema: temas[j],informativo : final, instituição: inst[i]}).toArray()
                                        if(retorno.length > 0) {retorno.map((element) => arrayGeral.push(element))}
                                        final = final - 1
                                    }
                                }
                                if(info[0] && info[1] == undefined || null || info[1].length === 0) {
                                    let infoInicial = parseInt(info[0])
                                    const sortInfo = { numeroInfo : 1}
                                    const ultimoInfo = await connectDB.collection('informativos').find({}).sort(sortInfo).toArray()
                                    const posicaoInfo = ultimoInfo.length - 1 
                                    const infoFinal = ultimoInfo[posicaoInfo].numeroInfo
                                    while(infoInicial <= infoFinal) {
                                        const retorno = await connectDB.collection('perguntas').find({materia: mat[k], tema: temas[j], informativo :infoInicial, instituição: inst[i]}).toArray()
                                        if(retorno.length > 0) {retorno.map((element) => arrayGeral.push(element))}                              
                                        infoInicial = infoInicial + 1
                                    }
                                }                      
                           }
                       }
                   } 
                }
                if(mat.length > temas.length) {
                    console.log('///////////// mat maior que temas')
                    for(let i = 0; i < inst.length; i++) {
                        for(let j = 0; j < mat.length; j++) {
                            for(let k = 0; k < temas.length; k++) {
                                let inicial = parseInt(info[0])
                                let final = parseInt(info[1])
                    
                                if(info[1] && info[0]) {
                                    console.log('2 infos setados')
                                    while(final >= inicial) {
                                        const retorno = await connectDB.collection('perguntas').find({materia: mat[j], tema: temas[k],informativo : final, instituição: inst[i]}).toArray()
                                        if(retorno.length > 0) {retorno.map((element) => arrayGeral.push(element))}
                                        final = final - 1
                                    }
                                }
                                if(info[0] && info[1] == undefined || null || info[1].length === 0) {
                                    let infoInicial = parseInt(info[0])
                                    const sortInfo = { numeroInfo : 1}
                                    const ultimoInfo = await connectDB.collection('informativos').find({}).sort(sortInfo).toArray()
                                    const posicaoInfo = ultimoInfo.length - 1 
                                    const infoFinal = ultimoInfo[posicaoInfo].numeroInfo
                                    while(infoInicial <= infoFinal) {
                                        const retorno = await connectDB.collection('perguntas').find({materia: mat[j], tema: temas[k], informativo :infoInicial, instituição: inst[i]}).toArray()
                                        if(retorno.length > 0) {retorno.map((element) => arrayGeral.push(element))}                              
                                        infoInicial = infoInicial + 1
                                    }
                                }                      
                            }
                        }
                    } 
                }
            }
            arrayGeral.map((element) => {
                if(element.instituição === "STF") {arrayStf.push(element)}
                if(element.instituição === "STJ") {arrayStj.push(element)}
            })
            mat.map((element) => {
                arrayStf.map((element2) => {
                    element2.materia.map((mat) =>{
                        if(element === mat) {
                            if(arrayIds.indexOf(element2.idQuestion) === -1) {
                                arrayIds.push(element2.idQuestion)
                                arrayCutStf.push(element2)
                            }
                        }
                    })
                })
                arrayCutStf.sort((a,b) => b.informativo - a.informativo)
                arrayCutStf.map((element) => arrayGeralUnique.push(element))
                arrayCutStf = []

            })
            mat.map((element) => {
                arrayStj.map((element2) => {
                    element2.materia.map((mat) =>{
                        if(element === mat) {
                            if(arrayIds.indexOf(element2.idQuestion) === -1) {
                                arrayIds.push(element2.idQuestion)
                                arrayCutStj.push(element2)
                            }
                        }
                    })
                })
                arrayCutStj.sort((a,b) => b.informativo - a.informativo)
                arrayCutStj.map((element) => arrayGeralUnique.push(element))
                arrayCutStj = []

            })
            retornoPerguntas.push(arrayGeralUnique)
        }
        
        if(temas.length > 0 && inst.length > 0 && info.length > 0 && mat.length === 0) {

            // NÃO MEXI POR AQUE NÃO ESCOLHEU TEMA.
            let arrayComplete = []
            let arrayStf = []
            let arrayStj = []
            const ttInst = inst.length
            if(temas.length >= inst.length) {

                if(ttInst === 1) {
                    console.log('instituicao é uma só')
                if(info.length === 1) {
                    console.log('só tem o informativo inicial')
                    let infoInicial = parseInt(info[0])
                    const sortInfo = { numeroInfo : 1}
                    const ultimoInfo = await connectDB.collection('informativos').find({}).sort(sortInfo).toArray()
                    const posicaoInfo = ultimoInfo.length - 1 
                    const infoFinal = ultimoInfo[posicaoInfo].numeroInfo
                    for(let i = 0; i < temas.length; i++) {
                        while(infoInicial <= infoFinal) {
                            const retorno = await connectDB.collection('perguntas').find({tema: temas[i], instituição:inst[0], informativo :infoInicial}).toArray()
                            if(retorno.length > 0) {
                                arrayComplete.push(retorno[0])
                            }
                            infoInicial = infoInicial + 1
                        }   
                      }
                    const uniqueArray = removeDuplicates(arrayComplete, "idQuestion")
                    uniqueArray.sort((a,b) => b.informativo - a.informativo)
                    retornoPerguntas.push(uniqueArray)
                }
                if(info.length === 2) {
                    console.log('é dois informativossss')
                    let inicial = parseInt(info[0])
                    let final = parseInt(info[1])
                    for(let i = 0; i < temas.length; i++) {
                        while(final >= inicial) {
                            const retorno = await connectDB.collection('perguntas').find({tema: temas[i], instituição: inst[0], informativo : final}).toArray()
                            if(retorno.length > 0) {
                                arrayComplete.push(retorno[0])
                            }
                            final = final - 1
                        }   
                    }
                    const uniqueArray = removeDuplicates(arrayComplete, "idQuestion")
                    uniqueArray.sort((a,b) => b.informativo - a.informativo)
                    retornoPerguntas.push(uniqueArray)

                }
                }

                if(ttInst === 2) {
                    console.log('é dois instituito')
                    if(info.length === 1) {
                        console.log('só tem o informativo inicial')
                       
                        const sortInfo = { numeroInfo : 1}
                        const ultimoInfo = await connectDB.collection('informativos').find({}).sort(sortInfo).toArray()
                        const posicaoInfo = ultimoInfo.length - 1 
                        const infoFinal = ultimoInfo[posicaoInfo].numeroInfo
                        for(let i = 0; i < temas.length; i++) {
                            let infoInicial = parseInt(info[0])
                            while(infoInicial <= infoFinal) {
                                console.log(temas[i])
                                const retorno = await connectDB.collection('perguntas').find({tema: temas[i], instituição:inst[0], informativo :infoInicial}).toArray()
                                // console.log(retorno)
                                const retorno2 = await connectDB.collection('perguntas').find({tema: temas[i], instituição:inst[1], informativo :infoInicial}).toArray()
                                // console.log(retorno2)
                                if(retorno.length > 0) {
                                    if(retorno.length > 1) {
                                        retorno.map((element) => arrayComplete.push(element))
                                    }
                                    if(retorno.length === 1) {
                                        arrayComplete.push(retorno[0])
                                    }
                                }
                                if(retorno2.length > 0) {
                                    if(retorno2.length > 1) {
                                        retorno2.map((element) => arrayComplete.push(element))
                                    }
                                    if(retorno2.length === 1) {
                                        arrayComplete.push(retorno2[0])
                                    }
                                }
                                infoInicial = infoInicial + 1
                            }   
                          }
                        const uniqueArray = removeDuplicates(arrayComplete, "idQuestion")
                        uniqueArray.map((element) => {
                            if(element.instituição === "STF") {
                                arrayStf.push(element)
                            }
                            if(element.instituição === "STJ") {
                                arrayStj.push(element)
                            }
                        })
                        arrayStf.sort((a,b) => b.informativo - a.informativo)
                        arrayStj.sort((a,b) => b.informativo - a.informativo)
                        const arrayCompleteOrdered = arrayStf.concat(arrayStj)
                      
                        retornoPerguntas.push(arrayCompleteOrdered)
                    }
                    if(info.length === 2) {
                        console.log('é dois informativossss')
                        let inicial = info[0]
                        let final = info[1]
                        for(let i = 0; i < temas.length; i++) {
                            while(final >= inicial) {
                                const retorno = await connectDB.collection('perguntas').find({tema: temas[i], instituição: inst[0], informativo : final}).toArray()
                                if(retorno.length > 0) {
                                    arrayComplete.push(retorno[0])
                                }
                                final = final - 1
                            }   
                        }
                        const uniqueArray = removeDuplicates(arrayComplete, "idQuestion")
                        uniqueArray.sort((a,b) => b.informativo - a.informativo)
                        retornoPerguntas.push(uniqueArray)
    
                    }
                }
            }
            if(inst.length > temas.length) {
               inst.sort()
               if(info.length === 1) {
                console.log('só tem o informativo inicial')
               
                const sortInfo = { numeroInfo : 1}
                const ultimoInfo = await connectDB.collection('informativos').find({}).sort(sortInfo).toArray()
                const posicaoInfo = ultimoInfo.length - 1 
                const infoFinal = ultimoInfo[posicaoInfo].numeroInfo
                for(let i = 0; i < temas.length; i++) {
                    let infoInicial = parseInt(info[0])
                    while(infoInicial <= infoFinal) {
                        const retorno = await connectDB.collection('perguntas').find({tema: temas[i], instituição:inst[0], informativo :infoInicial}).toArray()
                        // console.log(retorno)
                        const retorno2 = await connectDB.collection('perguntas').find({tema: temas[i], instituição:inst[1], informativo :infoInicial}).toArray()
                        // console.log(retorno2)
                        if(retorno.length > 0) {
                            if(retorno.length > 1) {
                                retorno.map((element) => arrayComplete.push(element))
                            }
                            if(retorno.length === 1) {
                                arrayComplete.push(retorno[0])
                            }
                        }
                        if(retorno2.length > 0) {
                            if(retorno2.length > 1) {
                                retorno2.map((element) => arrayComplete.push(element))
                            }
                            if(retorno2.length === 1) {
                                arrayComplete.push(retorno2[0])
                            }
                        }
                        infoInicial = infoInicial + 1
                    }   
                  }
                const uniqueArray = removeDuplicates(arrayComplete, "idQuestion")
                uniqueArray.map((element) => {
                    if(element.instituição === "STF") {
                        arrayStf.push(element)
                    }
                    if(element.instituição === "STJ") {
                        arrayStj.push(element)
                    }
                })
                arrayStf.sort((a,b) => b.informativo - a.informativo)
                arrayStj.sort((a,b) => b.informativo - a.informativo)
                const arrayCompleteOrdered = arrayStf.concat(arrayStj)
              
                retornoPerguntas.push(arrayCompleteOrdered)
            }
            if(info.length === 2) {
                console.log('é dois informativossss')
                let inicial = parseInt(info[0])
                let final = parseInt(info[1])
                for(let i = 0; i < temas.length; i++) {
                    while(final >= inicial) {
                        const retorno = await connectDB.collection('perguntas').find({tema: temas[i], instituição: inst[0], informativo : final}).toArray()
                        if(retorno.length > 0) {
                            arrayComplete.push(retorno[0])
                        }
                        final = final - 1
                    }   
                }
                const uniqueArray = removeDuplicates(arrayComplete, "idQuestion")
                uniqueArray.sort((a,b) => b.informativo - a.informativo)
                retornoPerguntas.push(uniqueArray)

            }
            }

        }

        if(temas.length > 0 && mat.length > 0 && inst.length > 0 && info.length === 0) {
            let arrayGeral = []
            let newarrayzz = []
            let arrayStf = []
            let arrayStj = []
            let arrayIds = []
            let arrayCutStf = []
            let arrayCutStj = []
            console.log('sem informativos')
            if(mat.length >= temas.length && mat.length >= inst.length) {
                if(temas.length >= inst.length) {
                    console.log('tema é maior que inst')
                    for(let i = 0; i < mat.length;i++) {
                        for(let j = 0; j < temas.length; j++) {
                            for(let k = 0; k < inst.length; k++) {
                                const retorno = await connectDB.collection('perguntas').find({materia : mat[i], tema: temas[j], instituição:inst[k]}).sort(sortInfo).toArray()
                                if(retorno.length > 0) {
                                    retorno.map((element) => newarrayzz.push(element))
                                }
                            }
                        }
                    }
                }
                if(inst.length > temas.length) {
                    for(let i = 0; i < mat.length;i++) {
                        for(let j = 0; j < inst.length; j++) {
                            for(let k = 0; k < temas.length; k++) {
                                const retorno = await connectDB.collection('perguntas').find({materia : mat[i], tema: temas[k], instituição:inst[j]}).sort(sortInfo).toArray()
                                if(retorno.length > 0) {
                                    retorno.map((element) => newarrayzz.push(element) )
                                }
                            }
                        }
                    }
                }
            }

            if(temas.length >= mat.length && temas.length >= inst.length) {
                let arraydupli = []
                console.log('temas é maior que tudo')
                if(mat.length >= inst.length) {
                    console.log('mat maior que inst')
                    for(let i = 0; i < temas.length; i++) {
                        for(let j = 0; j < mat.length; j++) {
                            for(let k = 0; k < inst.length; k++) {
                                const retorno = await connectDB.collection('perguntas').find({materia : mat[j], tema: temas[i], instituição:inst[k]}).sort(sortInfo).toArray()
                                if(retorno.length > 0) {
                                    for(let p = 0; p < retorno.length; p++) {
                                        arraydupli.push(retorno[p])
                                    }
                                }
                            }
                        }
                    }
                }
                if(inst.length > mat.length) {
                    for(let i = 0; i < temas.length; i++) {
                        for(let j = 0; j < inst.length; j++) {
                            for(let k = 0; k < mat.length; k++) {
                                const retorno = await connectDB.collection('perguntas').find({materia : mat[k], tema: temas[i], instituição:inst[j]}).sort(sortInfo).toArray()
                                if(retorno.length > 0) {
                                    for(let p = 0; p < retorno.length; p++) {
                                        arraydupli.push(retorno[p])
                                    }
                                }
                            }
                        }
                    }
                }
                //ORDENANDO ARRAY PELA INST DPS INFO ETC..
               const arrayUnique = removeDuplicates(arraydupli, "idQuestion")
               arrayUnique.map((element) => newarrayzz.push(element))
            //    const arrayOrdenado = arrayUnique.sort((a,b) => {
            //         return a.instituição.localeCompare(b.instituição)
            //     })

            //     let indexCut = []
            //     const totalTamArray = arrayOrdenado.length
            //     arrayOrdenado.map((element, i) => {
            //         if(element.instituição !== 'STF') {
            //             indexCut.push(i)
            //         }
            //     })
               
            //     const arrayCut = arrayOrdenado.slice(0,indexCut[0])
            //     arrayCut.sort((a,b) => {
            //         return b.informativo - a.informativo
            //     })

            //     const arrayCut2 = arrayOrdenado.slice(indexCut[0],totalTamArray)
            //     arrayCut2.sort((a,b) => {
            //         return b.informativo -  a.informativo
            //     })
            //    const arrayComplete = arrayCut.concat(arrayCut2)
  
            //     retornoPerguntas.push(arrayComplete)
            }

            //a function e a const uniqueArray são para certo ifs ai em cima
            function removeDuplicates(originalArray, prop) {
                var newArray = [];
                var lookupObject  = {};
           
                for(var i in originalArray) {
                   lookupObject[originalArray[i][prop]] = originalArray[i];
                }
           
                for(i in lookupObject) {
                    newArray.push(lookupObject[i]);
                }
                 return newArray;
            }
            const uniqueArray = removeDuplicates(newarrayzz, "idQuestion")
            uniqueArray.map((element) => {
                if(element.instituição === "STF") {arrayStf.push(element)}
                if(element.instituição === "STJ") {arrayStj.push(element)}
            })
            mat.map((element) => {
                arrayStf.map((element2) => {
                    element2.materia.map((mat) => {
                        if(element === mat) {
                            if(arrayIds.indexOf(element2.idQuestion) === -1){
                                arrayCutStf.push(element2)
                            }
                        }
                    })
                })
                arrayCutStf.sort((a,b) => b.informativo - a.informativo)
                arrayCutStf.map((element) => arrayGeral.push(element))
                arrayCutStf = []

            })

            mat.map((element) => {
                arrayStj.map((element2) => {
                    element2.materia.map((mat) => {
                        if(element === mat) {
                            if(arrayIds.indexOf(element2.idQuestion) === -1){
                                arrayCutStj.push(element2)
                            }
                        }
                    })
                })
                arrayCutStj.sort((a,b) => b.informativo - a.informativo)
                arrayCutStj.map((element) => arrayGeral.push(element))
                arrayCutStj = []

            })
            retornoPerguntas.push(arrayGeral)

        }


        //////// Fazer um devolução para cada caso de FILTRO C.E / M .E    ///////////
        if(tipoCE === 1 && tipoME == null || undefined) {
            let arrayCe = []
            retornoPerguntas[0].map((element) => {
                if(element.a == null || undefined) {
                    arrayCe.push(element)
                }
            })
            return res.json([arrayCe])
        }

        if(tipoME === 1 && tipoCE == null || undefined) {
            console.log('ME SETADO!')
            let arrayMe = []
            retornoPerguntas[0].map((element) => {
                if(element.a) {
                    arrayMe.push(element)
                }
            })
            return res.json([arrayMe])
        }

        if(tipoCE == null || undefined && tipoME == null || undefined) {
            return res.json(retornoPerguntas)
        }
        if(tipoCE === 1 && tipoME === 1) {
            return res.json(retornoPerguntas)
        }
        // return res.json(retornoPerguntas) 
              
}