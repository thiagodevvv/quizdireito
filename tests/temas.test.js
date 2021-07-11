const assert =  require('assert')
const http = require('http')



// describe('Temas', () => {
//     it('retorno de temas', async () =>{
//         const expected = [{
//             _id: "60e78585bd015f5bd8823a92",
//             tema: 'Controle de Constitucionalidade'
//           },
//           { _id: "60e785f8bd015f5bd8823a9b", tema: 'Servidores públicos' }]

       http.get('http://localhost:3000/api/temas', (response) => {
            console.log(response)
        })
        
//         assert.strictEqual(retornoApi, expected)
//     })
// })

