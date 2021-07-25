import { useContext, useEffect } from 'react'
import {Container, Button} from 'react-bootstrap'
import Router from 'next/router'
import { AuthContext } from '../src/context/AuthContext'

export default function Painel () {

    useEffect(() => {

    },[])
    const { logout } = useContext(AuthContext)
    return (
        <Container style={{display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column"}}>
            <h1 style={{textAlign: "center", marginTop:15}}>Painel Adm</h1>
            <Container style={{marginTop: 100, display: "flex", flexDirection: "column",alignItems: "center", justifyContent: "center" }}>
                <Button  variant="dark" onClick={() => Router.push('/addPergunta') }>Adicionar Pergunta</Button>
                <Button variant="dark" style={{marginTop: 20}}>Gerar PDF</Button>
                <Button  onClick={() => logout()} variant="danger" style={{marginTop: 30}}>Sair/Logout</Button>
            </Container>
        </Container>
    )
}


export const getServerSideProps = async (ctx) => {
    const { token } = ctx.req.cookies
    if(!token) {
      return {
        redirect: {
          destination: '/login',
          permanent: false
        }
      }
    }
    return {
      props: {}
    }
  }