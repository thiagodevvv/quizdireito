import ListaPerguntas from './ListaPerguntas'
export default function Condicao ({perguntas, isLoading, filters}) {
    if(isLoading == true) {
        return <div style={{display: 'flex', justifyContent: "center", alignItems: "center"}}><h1>Buscando...</h1></div>
    }
    if(perguntas.length === 0) {
        return <div style={{display: 'flex', justifyContent: "center", alignItems: "center"}}><h1>Nada encontrado</h1></div>
    }else {
        return <ListaPerguntas perguntas={perguntas} />
        
    }
}