import db from '../../database'
import axios from 'axios'
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
            let informativos = []
            const {data} = await axios.get('https://quizdireito.vercel.app/api/informativos')
            data.map((element) => informativos.push(element.numeroInfo))
            let inicial = parseInt(info[0])
            let final = parseInt(info[1])
            
            const indexInfoInicial = informativos.indexOf(inicial)
            const indexInfoFinal = informativos.indexOf(final)
            
            const newArrayInformativos = informativos.slice(indexInfoInicial, info[1] ? indexInfoFinal + 1: informativos.length)
            let arrayInfo = []

            if(info.length === 2) {
                let contador = 0
                console.log('é dois info')
                while(contador <= newArrayInformativos.length) {
                    const retorno = await connectDB.collection('perguntas').find({informativo : newArrayInformativos[contador]}).toArray()
                    if(retorno.length > 0 ) {
                        retorno.map((element) => arrayInfo.push(element))
                    }
                    contador = contador + 1
                }
            }
            if(info.length === 1) {
                console.log('info 1 contadoooooooooooooooooooor')
                let contador = 0
                while(contador <= newArrayInformativos.length) {
                    const retorno = await connectDB.collection('perguntas').find({informativo :newArrayInformativos[contador]}).toArray()
                    if(retorno.length > 0) {
                        retorno.map((element) => arrayInfo.push(element))
                       
                    }
                    contador = contador + 1
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
            let informativos = []
            let arrayIds = []
            const {data} = await axios.get('https://quizdireito.vercel.app/api/informativos')
            data.map((element) => informativos.push(element.numeroInfo))
            let inicial = parseInt(info[0])
            let final = parseInt(info[1])
            const indexInfoInicial = informativos.indexOf(inicial)
            const indexInfoFinal = informativos.indexOf(final)
            
            const newArrayInformativos = informativos.slice(indexInfoInicial, info[1] ? indexInfoFinal + 1: informativos.length)
            
            /// OK!! REFERENCIA CORTE POR MATÉRIAS!
            let arrayFatiado = []
            if(mat.length >= info.length) {
                for(let i = 0; i < mat.length; i++) {
                    if(info.length === 2) {
                        let contador = 0
                        console.log('inicial e final')
                        while(contador <= newArrayInformativos.length) {
                            const retorno = await connectDB.collection('perguntas').find({materia: mat[i], informativo : newArrayInformativos[contador]}).toArray()
                            if(retorno.length > 0) {
                                dataPerguntas.push(retorno[0]) 
                            }
                            contador = contador + 1
                        }
                    }
                    if(info.length === 1) {
                        let contador = 0
                        while(contador <= newArrayInformativos.length) {
                            const retorno = await connectDB.collection('perguntas').find({materia: mat[i], informativo :newArrayInformativos[contador]}).toArray()
                            if(retorno.length > 0) {
                                dataPerguntas.push(retorno[0])
                            }
                            contador = contador + 1
                        }
                    }   
                }
            }

            if(info.length > mat.length) {
                if(info.length === 2) {
                    let contador = 0
                    console.log('inicial e final')
                    
                    while(contador <= newArrayInformativos.length) {
                        const retorno = await connectDB.collection('perguntas').find({materia: mat[0], informativo : newArrayInformativos[contador]}).toArray()
                        if(retorno.length > 0) {
                            dataPerguntas.push(retorno[0]) 
                        }
                        contador = contador + 1
                    }
                }
                if(info.length === 1) {
                    let contador = 0
                    while(contador <= newArrayInformativos.length) {
                        const retorno = await connectDB.collection('perguntas').find({materia: mat[0], informativo :newArrayInformativos[contador]}).toArray()
                        if(retorno.length > 0) {
                            dataPerguntas.push(retorno[0])
                        }
                        contador = contador + 1
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
                        
                        if(element === element2.materia[i]) {
                            if(arrayIds.indexOf(element2.idQuestion) === -1) {
                                arrayIds.push(element2.idQuestion)
                                arraycut.push(element2)
                            }
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
                            if(arrayIds.indexOf(element2.idQuestion) === -1) {
                                arrayIds.push(element2.idQuestion)
                                arraycut.push(element2)
                            }
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
            let informativos = []
            let arrayIds = []
            const {data} = await axios.get('https://quizdireito.vercel.app/api/informativos')
            data.map((element) => informativos.push(element.numeroInfo))
            let inicial = parseInt(info[0])
            let final = parseInt(info[1])
            
            const indexInfoInicial = informativos.indexOf(inicial)
            const indexInfoFinal = informativos.indexOf(final)
            const newArrayInformativos = informativos.slice(indexInfoInicial, info[1] ? indexInfoFinal + 1: informativos.length)

            if(mat.length >= inst.length && mat.length >= info.length) {
                if(info.length > inst.length) {
                    console.log('infooormativo maior que inst')
                    for(let i = 0; i < mat.length; i++) {
                        if(info.length === 2) {
                            let contador = 0
                            while(contador <= newArrayInformativos.length) {
                                const retorno = await connectDB.collection('perguntas').find({materia: mat[i], informativo : newArrayInformativos[contador], instituição:inst[0]}).toArray()
                                if(retorno.length > 0) {
                                    retorno.map((element) => arrayDataPerguntas.push(element))   
                                } 
                                contador = contador + 1
                            }
                        }
                        if(info.length === 1) {
                            let contador = 0
                            while(contador <= newArrayInformativos.length) {
                                const retorno = await connectDB.collection('perguntas').find({materia: mat[i], informativo :newArrayInformativos[contador], instituição:inst[0]}).toArray()
                                if(retorno.length > 0){
                                    retorno.map((element) => arrayDataPerguntas.push(element))
                                }
                                contador = contador + 1
                            }
                        }
                    }
                }
                if(info.length === inst.length) {
    
                    console.log('infooormativo IGUAL que inst')
                    for(let i = 0; i < mat.length; i++) {
                        if(info.length === 2) {
                            let contador = 0
                            while(contador <= newArrayInformativos.length) {
                                for(let k = 0; k < inst.length; k++) {
                                    const retorno = await connectDB.collection('perguntas').find({materia: mat[i], informativo : newArrayInformativos[contador], instituição:inst[k]}).toArray()
                                    if(retorno.length > 0 ){
                                        retorno.map((element) => arrayDataPerguntas.push(element)) 
                                    }
                                    
                                    contador = contador + 1
                                }
                            }
                        }
                        if(info.length === 1) {
                            let contador = 0
                            while(contador <= newArrayInformativos.length) {
                                for(let k = 0; k < inst.length; k++) {
                                    const retorno = await connectDB.collection('perguntas').find({materia: mat[i], informativo :newArrayInformativos[contador], instituição:inst[k]}).toArray()
                                    if(retorno.length > 0 ) {
                                        retorno.map((element) => arrayDataPerguntas.push(element))
                                    }
                                    contador = contador + 1
                                }
                            }
                        }   
                    }
                 
                }
                if(info.length < inst.length) {
                    console.log('infooormativo menor que inst')
                    for(let i = 0; i < mat.length; i++) {
                        for(let j = 0; j < inst.length; j++) {
                            if(info.length === 2) {
                                let contador = 0
                                while(contador <= newArrayInformativos.length) {
                                    for(let j = 0; j < inst.length; j++) {
                                        const retorno = await connectDB.collection('perguntas').find({materia: mat[i], informativo : newArrayInformativos[contador], instituição:inst[j]}).toArray()
                                        if(retorno.length > 0) {
                                            retorno.map((element) => arrayDataPerguntas.push(element))
                                        } 
                                        contador = contador + 1
                                    }
                                }
                            }
                            if(info.length === 1) {
                                let contador = 0
                                while(contador <= newArrayInformativos.length) {
                                    for(let j = 0; j < inst.length; j++) {
                                        const retorno = await connectDB.collection('perguntas').find({materia: mat[i], informativo :newArrayInformativos[contador], instituição:inst[j]}).toArray()
                                        if(retorno.length > 0) {
                                            retorno.map((element) => arrayDataPerguntas.push(element))
                                        }
                                        contador = contador + 1
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
                                if(info.length === 2) {
                                    let contador = 0
                                    console.log('inicial e final')
                                    while(contador <= newArrayInformativos.length) {
                                        const retorno = await connectDB.collection('perguntas').find({materia: mat[j], informativo : newArrayInformativos[contador], instituição:inst[k]}).toArray()
                                        if(retorno.length > 0) {
                                            retorno.map((element) => arrayDataPerguntas.push(element))
                                        }
                                            contador = contador + 1
                                    }
                                }
                                if(info.length === 1) {
                                    let contador = 0
                                    while(contador <= newArrayInformativos.length) {
                                        const retorno = await connectDB.collection('perguntas').find({materia: mat[j], informativo :newArrayInformativos[contador], instituição:inst[k]}).toArray()
                                        if(retorno.length > 0) {
                                            retorno.map((element) => arrayDataPerguntas.push(element) )
                                        }
                                            contador = contador + 1
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
                            if(info.length === 2) {
                                let contador = 0
                                while(contador <= newArrayInformativos.length) {
                                    const retorno = await connectDB.collection('perguntas').find({materia: mat[j], informativo : newArrayInformativos[contador], instituição:inst[i]}).toArray()
                                    if(retorno.length > 0 ) {
                                        retorno.map((element) => arrayDataPerguntas.push(element) )
                                    }
                                        contador = contador +1
                                }
                            }
                            if(info.length === 1) {
                                console.log('oi undefined info')
                                let contador = 0
                                while(contador <= newArrayInformativos.length) {
                                    const retorno = await connectDB.collection('perguntas').find({materia: mat[j], informativo :newArrayInformativos[contador], instituição:inst[i]}).toArray()
                                    if(retorno.length > 0 ) {
                                        retorno.map((element) => arrayDataPerguntas.push(element))
                                    }
                                        contador = contador + 1
                                }
                            }
                        }
                    }
                }
                if(mat.length <= info.length) {
                    for(let i = 0; i < inst.length; i++) {
                            for(let k = 0; k < mat.length; k++) {
                                if(info.length === 2) {
                                    let contador = 0
                                    while(contador <= newArrayInformativos.length) {
                                        for(let j = 0; j < inst.length; j++) {
                                            const retorno = await connectDB.collection('perguntas').find({materia: mat[k], informativo : newArrayInformativos[contador], instituição:inst[i]}).toArray()
                                            if(retorno.length > 0 ) {
                                                retorno.map((element) => arrayDataPerguntas.push(element) )
                                            }
                                            contador = contador + 1
                                        }
                                    }
                                }
                                if(info.length === 1) {
                                    let contador = 0
                                    while(contador <= newArrayInformativos.length) {
                                        for(let j = 0; j < inst.length; j++) {
                                            const retorno = await connectDB.collection('perguntas').find({materia: mat[k], informativo :newArrayInformativos[contador], instituição:inst[i]}).toArray()
                                            if(retorno.length > 0) {
                                                retorno.map((element) => arrayDataPerguntas.push(element))
                                            }
                                            contador = contador + 1
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
                            if(arrayIds.indexOf(element2.idQuestion) === -1) {
                                arrayIds.push(element2.idQuestion)
                                arraycut.push(element2)
                            }
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
                            if(arrayIds.indexOf(element2.idQuestion) === -1) {
                                arrayIds.push(element2.idQuestion)
                                arraycut.push(element2)
                            }
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
            let informativos = []
            const {data} = await axios.get('https://quizdireito.vercel.app/api/informativos')
            data.map((element) => informativos.push(element.numeroInfo))
            let inicial = parseInt(info[0])
            let final = parseInt(info[1])
            
            const indexInfoInicial = informativos.indexOf(inicial)
            const indexInfoFinal = informativos.indexOf(final)
            const newArrayInformativos = informativos.slice(indexInfoInicial, info[1] ? indexInfoFinal + 1: informativos.length)
            for(let i = 0; i < inst.length; i++) {
                if(info.length === 2) {
                    let contador = 0
                    while(contador <= newArrayInformativos.length) {
                        const retorno = await connectDB.collection('perguntas').find({informativo : newArrayInformativos[contador], instituição:inst[i]}).toArray()
                        if(retorno.length > 0) {
                            retorno.map((element) => dataPerguntas.push(element))   
                        } 
                        contador = contador + 1
                    }
                }
                if(info.length === 1) {
                    let contador = 0
                    while(contador <= newArrayInformativos.length) {
                        const retorno = await connectDB.collection('perguntas').find({informativo :newArrayInformativos[contador], instituição:inst[i]}).toArray()
                        if(retorno.length > 0){
                            retorno.map((element) => dataPerguntas.push(element))
                        }   
                        contador = contador + 1
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
            console.log('tester')
            //// /// OK
            let arrayFatiado = []
            let arrIds = []
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
                            if(arrIds.indexOf(element2.idQuestion) === -1 ) {
                                arrIds.push(element2.idQuestion)
                                arraycut.push(element2)
                            }
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
                            if(arrIds.indexOf(element2.idQuestion) === -1 ) {
                                arrIds.push(element2.idQuestion)
                                arraycut.push(element2)
                            }
                        }
                    }
                })
                arraycut.sort((a,b) => b.informativo - a.informativo)
                arraycut.map((element) => arrayFatiado.push(element))
            })
            console.log('///////////////////////////////////////////////////////////////////////')
           
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
            let informativos = []

            const {data} = await axios.get('https://quizdireito.vercel.app/api/informativos')
            data.map((element) => informativos.push(element.numeroInfo))
            let inicial = parseInt(info[0])
            let final = parseInt(info[1])
            
            const indexInfoInicial = informativos.indexOf(inicial)
            const indexInfoFinal = informativos.indexOf(final)
            const newArrayInformativos = informativos.slice(indexInfoInicial, info[1] ? indexInfoFinal + 1: informativos.length)

            for(let i = 0; i < temas.length; i++) {
                if(info.length === 1) {
                    let contador = 0
                    while(contador <= newArrayInformativos.length) {
                        const retorno =  await connectDB.collection('perguntas').find({tema: temas[i], informativo :newArrayInformativos[contador]}).toArray()
                        if(retorno.length > 0) {
                            if(retorno.length > 1) {
                                retorno.map((element) => arrayTemas.push(element))
                            }
                            if(retorno.length === 1) {
                                arrayTemas.push(retorno[0])
                            }
                        }
                        contador = contador + 1
                    }
                }
                if(info.length === 2 ) {
                    let contador = 0
                    while(contador <= newArrayInformativos.length) {
                        const retorno = await connectDB.collection('perguntas').find({tema: temas[i],informativo : newArrayInformativos[contador]}).toArray()
                        if(retorno.length > 0 ) {
                            if(retorno.length > 1) {
                                retorno.map((element) => arrayTemas.push(element))
                            }
                            if(retorno.length === 1) {
                                arrayTemas.push(retorno[0])
                            }
                        }
                        contador = contador + 1
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
            let informativos = []
            const {data} = await axios.get('https://quizdireito.vercel.app/api/informativos')
            data.map((element) => informativos.push(element.numeroInfo))
            let inicial = parseInt(info[0])
            let final = parseInt(info[1])
            
            const indexInfoInicial = informativos.indexOf(inicial)
            const indexInfoFinal = informativos.indexOf(final)
            const newArrayInformativos = informativos.slice(indexInfoInicial, info[1] ? indexInfoFinal + 1: informativos.length)
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
                
                            if(info.length === 2) {
                                let contador = 0
                                while(contador <= newArrayInformativos.length) {
                                    const retorno = await connectDB.collection('perguntas').find({materia: mat[j], tema: temas[i],informativo : newArrayInformativos[contador]}).toArray()
                                    if(retorno.length > 0) {retorno.map((element) => arrayGeral.push(element))}
                                    contador = contador + 1
                                }
                            }
                            if(info.length === 1) {
                                let contador = 0
                                while(contador <= newArrayInformativos.length) {
                                    const retorno = await connectDB.collection('perguntas').find({materia: mat[j], tema: temas[i], informativo :newArrayInformativos[contador]}).toArray()
                                    if(retorno.length > 0 ) {retorno.map((element) => arrayGeral.push(element))}
                                    contador = contador + 1
                                }
                            }
                        }
                    }
                }
                if(info.length > mat.length) {
                    console.log('info é maior que materia...')
                    for(let i = 0; i < temas.length; i++) {
                        for(let j = 0; j < mat.length; j++) {
                            if(info.length === 2) {
                                let contador = 0
                                while(contador <= newArrayInformativos.length) {
                                    const retorno = await connectDB.collection('perguntas').find({materia: mat[j], tema: temas[i],informativo : newArrayInformativos[contador]}).toArray()
                                    if(retorno.length > 0) {retorno.map((element) => arrayGeral.push(element))}
                                    contador = contador + 1
                                }
                            }
                            if(info.length === 1) {
                                let contador = 0
                                while(contador <= newArrayInformativos.length) {
                                    const retorno = await connectDB.collection('perguntas').find({materia: mat[j], tema: temas[i], informativo :newArrayInformativos[contador]}).toArray()
                                    if(retorno.length > 0) {retorno.map((element) => arrayGeral.push(element))}
                                    contador = contador + 1
                                }
                            }

                        }
                    }
                }
            }

            if(mat.length > temas.length) {
                for(let i = 0; i < mat.length; i++) {
                    for(let j = 0; j < temas.length; j++) {
                            if(info.length === 2) {
                                let contador = 0
                                while(contador <= newArrayInformativos.length) {
                                    const retorno = await connectDB.collection('perguntas').find({materia: mat[i], tema: temas[j],informativo: newArrayInformativos[contador]}).toArray()
                                    if(retorno.length > 0) {retorno.map((element) => arrayGeral.push(element))}
                                    contador = contador + 1
                                }
                            }
                            if(info.length === 1) {
                                let contador = 0
                                while(contador <= newArrayInformativos.length) {
                                    const retorno = await connectDB.collection('perguntas').find({materia: mat[i], tema: temas[j], informativo :newArrayInformativos[contador]}).toArray()
                                    if(retorno.length > 0) {retorno.map((element) => arrayGeral.push(element))}
                                    contador = contador + 1
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
            let informativos = []
            const {data} = await axios.get('https://quizdireito.vercel.app/api/informativos')
            data.map((element) => informativos.push(element.numeroInfo))
            let inicial = parseInt(info[0])
            let final = parseInt(info[1])
            
            const indexInfoInicial = informativos.indexOf(inicial)
            const indexInfoFinal = informativos.indexOf(final)
            const newArrayInformativos = informativos.slice(indexInfoInicial, info[1] ? indexInfoFinal + 1: informativos.length)

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
                                if(info.length === 2) {
                                    let contador = 0
                                    while(contador <= newArrayInformativos.length) {
                                        const retorno = await connectDB.collection('perguntas').find({materia: mat[i], tema: temas[j],informativo: newArrayInformativos[contador], instituição: inst[k]}).toArray()
                                        if(retorno.length > 0) {retorno.map((element) => arrayGeral.push(element))}
                                        contador = contador + 1
                                    }
                                }
                                if(info.length === 1) {
                                    let contador = 0
                                    while(contador <= newArrayInformativos.length) {
                                        const retorno = await connectDB.collection('perguntas').find({materia: mat[i], tema: temas[j], informativo:newArrayInformativos[contador], instituição: inst[k]}).toArray()
                                        if(retorno.length > 0) {retorno.map((element) => arrayGeral.push(element))}                            
                                        contador = contador + 1
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
                                if(info.length === 2) {
                                    console.log('2 infos setados')
                                    let contador = 0
                                    while(contador <= newArrayInformativos.length) {
                                        const retorno = await connectDB.collection('perguntas').find({materia: mat[i], tema: temas[k],informativo : newArrayInformativos[contador], instituição: inst[j]}).toArray()
                                        if(retorno.length > 0) {retorno.map((element) => arrayGeral.push(elment))}
                                        contador = contador + 1
                                    }
                                }
                                if(info.length === 1) {
                                    let contador = 0
                                    while(contador <= newArrayInformativos.length) {
                                        const retorno = await connectDB.collection('perguntas').find({materia: mat[i], tema: temas[k], informativo :newArrayInformativos[contador], instituição: inst[j]}).toArray()
                                        if(retorno.length > 0) {retorno.map((element) => arrayGeral.push(element))}                              
                                        contador = contador + 1
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
                                if(info.length === 2) {
                                    let contador = 0
                                    console.log('2 infos setados')
                                    while(contador <= newArrayInformativos.length) {
                                        const retorno = await connectDB.collection('perguntas').find({materia: mat[j], tema: temas[i],informativo: newArrayInformativos[contador], instituição: inst[k]}).toArray()
                                        if(retorno.length > 0) {retorno.map((element) => arrayGeral.push(element))}
                                        contador = contador + 1
                                    }
                                }
                                if(info.length === 1) {
                                    let contador = 0
                                    while(contador <= newArrayInformativos.length) {
                                        const retorno = await connectDB.collection('perguntas').find({materia: mat[j], tema: temas[i], informativo:newArrayInformativos[contador], instituição: inst[k]}).toArray()
                                        if(retorno.length > 0) {retorno.map((element) => arrayGeral.push(element))}                              
                                        contador = contador + 1
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
                    
                                if(info.length === 2) {
                                    let contador = 0
                                    console.log('2 infos setados')
                                    while(contador <= newArrayInformativos.length) {
                                        const retorno = await connectDB.collection('perguntas').find({materia: mat[k], tema: temas[j],informativo :newArrayInformativos[contador], instituição: inst[i]}).toArray()
                                        if(retorno.length > 0) {retorno.map((element) => arrayGeral.push(element))}
                                        contador = contador + 1
                                    }
                                }
                                if(info.length === 1) {
                                    while(contador <= newArrayInformativos.length) {
                                        const retorno = await connectDB.collection('perguntas').find({materia: mat[k], tema: temas[j], informativo:newArrayInformativos[contador], instituição: inst[i]}).toArray()
                                        if(retorno.length > 0) {retorno.map((element) => arrayGeral.push(element))}                              
                                        contador = contador + 1
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
                                if(info.length === 2) {
                                    let contador = 0
                                    console.log('2 infos setados')
                                    while(contador <= newArrayInformativos.length) {
                                        const retorno = await connectDB.collection('perguntas').find({materia: mat[j], tema: temas[k],informativo:newArrayInformativos[contador], instituição: inst[i]}).toArray()
                                        if(retorno.length > 0) {retorno.map((element) => arrayGeral.push(element))}
                                        contador = contador + 1
                                    }
                                }
                                if(info.length === 1) {
                                    let contador = 0
                                    while(contador <= newArrayInformativos.length) {
                                        const retorno = await connectDB.collection('perguntas').find({materia: mat[j], tema: temas[k], informativo :newArrayInformativos[contador], instituição: inst[i]}).toArray()
                                        if(retorno.length > 0) {retorno.map((element) => arrayGeral.push(element))}                              
                                        contador = contador + 1
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
            let informativos = []
            const {data} = await axios.get('https://quizdireito.vercel.app/api/informativos')
            data.map((element) => informativos.push(element.numeroInfo))
            let inicial = parseInt(info[0])
            let final = parseInt(info[1])
            
            const indexInfoInicial = informativos.indexOf(inicial)
            const indexInfoFinal = informativos.indexOf(final)
            
            const newArrayInformativos = informativos.slice(indexInfoInicial, info[1] ? indexInfoFinal + 1: informativos.length)

            let arrayComplete = []
            let arrayStf = []
            let arrayStj = []
            const ttInst = inst.length
            if(temas.length >= inst.length) {

                if(ttInst === 1) {
                    console.log('instituicao é uma só')
                if(info.length === 1) {
                    console.log('só tem o informativo inicial')
                    let contador = 0
                    for(let i = 0; i < temas.length; i++) {
                        while(contador <= newArrayInformativos.length) {
                            const retorno = await connectDB.collection('perguntas').find({tema: temas[i], instituição:inst[0], informativo :newArrayInformativos[contador]}).toArray()
                            if(retorno.length > 0) {
                                arrayComplete.push(retorno[0])
                            }
                            contador = contador + 1
                        }   
                      }
                    const uniqueArray = removeDuplicates(arrayComplete, "idQuestion")
                    uniqueArray.sort((a,b) => b.informativo - a.informativo)
                    retornoPerguntas.push(uniqueArray)
                }
                if(info.length === 2) {
                    let contador = 0
                    console.log('é dois informativossss')
                    for(let i = 0; i < temas.length; i++) {
                        while(contador <= newArrayInformativos.length) {
                            const retorno = await connectDB.collection('perguntas').find({tema: temas[i], instituição: inst[0], informativo : newArrayInformativos[contador]}).toArray()
                            if(retorno.length > 0) {
                                arrayComplete.push(retorno[0])
                            }
                            contador = contador + 1
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
                        let contador = 0
                        const sortInfo = { numeroInfo : 1}
                        const ultimoInfo = await connectDB.collection('informativos').find({}).sort(sortInfo).toArray()
                        const posicaoInfo = ultimoInfo.length - 1 
                        const infoFinal = ultimoInfo[posicaoInfo].numeroInfo
                        for(let i = 0; i < temas.length; i++) {
                            while(contador <= newArrayInformativos.length) {
                                const retorno = await connectDB.collection('perguntas').find({tema: temas[i], instituição:inst[0], informativo :newArrayInformativos[contador]}).toArray()
                                // console.log(retorno)
                                const retorno2 = await connectDB.collection('perguntas').find({tema: temas[i], instituição:inst[1], informativo :newArrayInformativos[contador]}).toArray()
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
                                contador = contador + 1
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
                        let contador = 0
                        for(let i = 0; i < temas.length; i++) {
                            while(contador <= newArrayInformativos.length) {
                                const retorno = await connectDB.collection('perguntas').find({tema: temas[i], instituição: inst[0], informativo : newArrayInformativos[contador]}).toArray()
                                if(retorno.length > 0) {
                                    arrayComplete.push(retorno[0])
                                }
                                contador = contador + 1
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
                let contador = 0
                for(let i = 0; i < temas.length; i++) {
                    while(contador <= newArrayInformativos.length) {
                        const retorno = await connectDB.collection('perguntas').find({tema: temas[i], instituição:inst[0], informativo :newArrayInformativos[contador]}).toArray()
                        // console.log(retorno)
                        const retorno2 = await connectDB.collection('perguntas').find({tema: temas[i], instituição:inst[1], informativo :newArrayInformativos[contador]}).toArray()
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
                        contador = contador + 1
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
                let contador = 0
                for(let i = 0; i < temas.length; i++) {
                    while(contador <= newArrayInformativos.length) {
                        const retorno = await connectDB.collection('perguntas').find({tema: temas[i], instituição: inst[0], informativo : newArrayInformativos[contador]}).toArray()
                        if(retorno.length > 0) {
                            arrayComplete.push(retorno[0])
                        }
                        contador = contador + 1
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
            
            if(retornoPerguntas.length < 1) {
                const {data} = await axios.get('https://quizdireito.vercel.app/api/busca')
                 retornoPerguntas.push(data)
            }
            let arrayCe = []
            retornoPerguntas[0].map((element) => {
                if(!element.a) {
                    arrayCe.push(element)
                }
            })
            return res.json([arrayCe])
        }

        if(tipoME === 1 && tipoCE == null || undefined) {
            console.log('ME SETADO!')
            if(retornoPerguntas.length < 1) {
                const {data} = await axios.get('https://quizdireito.vercel.app/api/busca')
                 retornoPerguntas.push(data)
            }
            let arrayMe = []
            retornoPerguntas[0].map((element) => {
                if(element.a) {
                    arrayMe.push(element)
                }
            })
            return res.json([arrayMe])
        }

        if(tipoCE == null || undefined && tipoME == null || undefined) {
            if(retornoPerguntas.length < 1) {
                const {data} = await axios.get('https://quizdireito.vercel.app/api/busca')
                 retornoPerguntas.push(data)
            }
            return res.json(retornoPerguntas)

        }
        if(tipoCE === 1 && tipoME === 1) {
            if(retornoPerguntas.length < 1) {
                const {data} = await axios.get('https://quizdireito.vercel.app/api/busca')
                 retornoPerguntas.push(data)
            }
            return res.json(retornoPerguntas)
        }
        // return res.json(retornoPerguntas) 
              
}