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
        <Container style={{display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
        <img  width="80" height="80" src="/direito.svg"/>  
        <h1 id="title">QUESTÕES DE INFORMATIVO</h1> 
        </Container>
            <Container className="container-login" style={{marginTop: 20}}>
                <Form.Label style={{fontFamily: 'Segoe', fontSize: 15, color:"#707070", fontWeight: "bold"}}>Login</Form.Label>  
                <Form.Control style={{borderWidth: 3}} value={login} onChange={(event) => setLogin(event.target.value)} />
                <Form.Label style={{fontFamily: 'Segoe', fontSize: 15, color:"#707070", fontWeight: "bold"}}>Senha</Form.Label>
                <Form.Control  style={{borderWidth: 3}} value={password} onChange={(event) => setPassword(event.target.value)} type="password" />
                <p style={{color: "red"}}>{errorLogin}</p>
                <Button onClick={async () => {
                   const retorno = await signIn(login,password)
                   if(retorno == false) {
                    setErrorLogin("Usuário ou senha incorretos")
                   }
                }} className="btnLogin">  <p style={{fontFamily: 'Segoe', fontSize: 15}}>Entrar</p></Button>
              

            </Container>
        </Container>
        </body>
    )
}

