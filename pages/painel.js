import { useContext, useEffect, useState } from 'react'
import {Container, Button} from 'react-bootstrap'
import Router from 'next/router'
import { AuthContext } from '../src/context/AuthContext'
import AddPergunta from './addPergunta'
export default function Painel () {
    const [show, setShow] = useState(0)
    const [showCE, setShowCE] = useState(false)
    const [isVisibleCE, setIsVisibleCE] = useState(false)
    useEffect(() => {

    },[])
    const { logout } = useContext(AuthContext)
    return (

      <body style={{backgroundColor: "#2F4C6E", margin: 0, padding: 0}}>
        <Container style={{display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column"}}>
          <div style={{display: "flex", alignContent: "right"}}>
            <Button onClick={() => logout()} style={{height: 35, width: 80,marginTop: 10}} variant="danger">SAIR</Button>
          </div>
            <div style={{display: "flex", flexDirection: "row"}}>
              <img  width="80" height="80" src="/direito.svg"/>  
              <h1 id="title">QUESTÕES DE INFORMATIVO</h1> 
            </div>
            <Container className="header-painel">
                <div onClick={() => {
                  setShow(0)
                  setShowCE(false)
                  setIsVisibleCE(false)
                }}  style={{backgroundColor: `${show === 0 ? "white": ""}`}} className="opts-header-painel">MÚLTIPLA ESCOLHA</div>

                <div onClick={() => {
                  setIsVisibleCE(true)
                  setShow(1)                
                  setShowCE(true)
                  }} style={{backgroundColor: `${showCE ? "white": ""}`}}  className="opts-header-painel">CERTO/ERRADO</div>

                <div  className="opts-header-painel">GERENCIAR QUESTOÕES</div>
                <div onClick={() => console.log('ir para pagina gerar pdf')} className="opts-header-painel">GERAR PDF</div>
            </Container>
            <Container className="body-painel">
            <AddPergunta isVisibleCE={isVisibleCE}  />
            </Container>

            {/* <Container style={{marginTop: 100, display: "flex", flexDirection: "column",alignItems: "center", justifyContent: "center" }}>
                <Button  variant="dark" onClick={() => Router.push('/addPergunta') }>Adicionar Pergunta</Button>
                <Button variant="dark" style={{marginTop: 20}}>Gerar PDF</Button>
                <Button  onClick={() => logout()} variant="danger" style={{marginTop: 30}}>Sair/Logout</Button>
            </Container> */}
        </Container>
      </body>
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