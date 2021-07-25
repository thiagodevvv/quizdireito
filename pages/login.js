import { useContext, useState } from 'react'
import {Container, Form, Button} from 'react-bootstrap'
import { AuthContext } from '../src/context/AuthContext'


export default function Login () {
    const { signIn } = useContext(AuthContext)
    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")
    const [errorLogin, setErrorLogin] = useState("")
    return (
        <Container style={{display: "flex", alignContent: "center", justifyContent: "center", marginTop: 120, flexDirection: "column"}}>
            <h1>Entrar painel</h1>
            <Container className="container-login" style={{marginTop: 100}}>
                <Form.Label>Login</Form.Label>  
                <Form.Control value={login} onChange={(event) => setLogin(event.target.value)} />
                <Form.Label>Password</Form.Label>
                <Form.Control value={password} onChange={(event) => setPassword(event.target.value)} type="password" />
                <p style={{color: "red"}}>{errorLogin}</p>
                <Button onClick={async () => {
                   const retorno = await signIn(login,password)
                   if(retorno == false) {
                    setErrorLogin("Usuário ou senha incorretos")
                   }
                }} style={{marginTop: 25, backgroundColor: "black"}}>Entrar</Button>
              

            </Container>
        </Container>
    )
}

