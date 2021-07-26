import { useContext, useState } from 'react'
import {Container, Form, Button} from 'react-bootstrap'
import { AuthContext } from '../src/context/AuthContext'


export default function Login () {
    const { signIn } = useContext(AuthContext)
    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")
    const [errorLogin, setErrorLogin] = useState("")
    return (
        <body style={{backgroundColor: "#2F4C6E", margin: 0, padding: 0}}>
        <Container style={{display: "flex", alignContent: "center", justifyContent: "center", marginTop: 120, flexDirection: "column"}}>
        <div style={{display: "flex", flexDirection: "row"}}>
        <img  width="80" height="80" src="/direito.svg"/>  
        <h1 id="title">QUESTÕES DE INFORMATIVO</h1> 
        </div>
            <Container className="container-login" style={{marginTop: 20}}>
                <Form.Label>Login</Form.Label>  
                <Form.Control style={{borderWidth: 3}} value={login} onChange={(event) => setLogin(event.target.value)} />
                <Form.Label>Senha</Form.Label>
                <Form.Control  style={{borderWidth: 3}} value={password} onChange={(event) => setPassword(event.target.value)} type="password" />
                <p style={{color: "red"}}>{errorLogin}</p>
                <Button onClick={async () => {
                   const retorno = await signIn(login,password)
                   if(retorno == false) {
                    setErrorLogin("Usuário ou senha incorretos")
                   }
                }} style={{marginTop: 25, backgroundColor: "#2F4C6E", width: 220}}>Entrar</Button>
              

            </Container>
        </Container>
        </body>
    )
}

