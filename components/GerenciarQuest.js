import {Container, Button} from 'react-bootstrap'
import Router from 'next/router'

export default function GerenciarQuest () {
    return (
        <Container className="content-gerenciarquest">
            <Container style={{width: "100%", backgroundColor:"white", display: "flex", alignItems: "center", justifyContent: "center", height: "100%"}}>
                <Button onClick={() => {
                    window.open('https://cloud.mongodb.com/v2/60c688fd77a2aa370066bd6d#metrics/replicaSet/60c68c322860674bd9bb0fd9/explorer/dbPerguntas/idQuestion/find', '_blank').focus()
                }} variant="success" >Ir para MongoDB</Button>
            </Container>
        </Container>
    )
}