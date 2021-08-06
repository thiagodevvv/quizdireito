import { useState } from 'react'
import {Container, Button, Form} from 'react-bootstrap'
import axios from 'axios'

export default function GerenciarQuest () {
    const [id, setId ] = useState(0)
    const [errorDelete, setErrorDelete] = useState(false)
    const [succesDelete, setSuccesDelete] = useState(false)
    const deletarQuestao = async (id) => {
        try {
            await axios.post('https://quizdireito.vercel.app/api/deletarQuestao', {
            "id": id
            })
            setSuccesDelete(true)
            setErrorDelete(false)
        }
        catch(e) {
            setSuccesDelete(false)
            setErrorDelete(true)
        }
    }
    return (
        <Container className="content-gerenciarquest">
            <Container style={{width: "auto",display: "flex", alignItems: "center", justifyContent: "center", height: "100%", flexDirection: "column"}}>
                <Container style={{width: 200}}>
                    <Form.Label style={{fontFamily: 'Segoe', fontSize: 15, fontWeight: "bold", color: "#707070"}}>Digite a ID da questão</Form.Label>
                    <Form.Control onChange={(event) => {
                        setId(event.target.value)
                    }} style={{width: "100%", marginBottom: 10}} />
                    {succesDelete ? <p style={{fontFamily: 'Segoe', fontSize: 15, color: 'green'}}>Pergunta deletada</p> : ""}
                    {errorDelete ? <p style={{fontFamily: 'Segoe', fontSize: 15, color: 'red'}}>Nenhuma pergunta encontrada com esse ID</p> : ""}
                    <Button style={{marginBottom: 10, width: "100%"}} onClick={()  => deletarQuestao(id)} variant="danger" >DELETAR</Button>
                    <Button style={{width: "100%"}} onClick={() => {
                        window.open('https://cloud.mongodb.com/v2/60c688fd77a2aa370066bd6d#metrics/replicaSet/60c68c322860674bd9bb0fd9/explorer/dbPerguntas/idQuestion/find', '_blank').focus()
                    }} variant="success" >Ir para MongoDB</Button>
                </Container>
            </Container>
        </Container>
    )
}