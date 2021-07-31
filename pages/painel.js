import { useContext, useEffect, useState } from 'react'
import {Container, Button} from 'react-bootstrap'
import Router from 'next/router'
import { AuthContext } from '../src/context/AuthContext'
import AddPergunta from './addPergunta'
import GerarPDF from '../components/GerarPDF'
import GerenciarQuest from '../components/GerenciarQuest'

export default function Painel () {
    const [show, setShow] = useState(0)
    const [showCE, setShowCE] = useState(false)
    const [showPDF, setShowPDF] = useState(false)
    const [isVisibleCE, setIsVisibleCE] = useState(false)
    const [isVisiblePDF, setIsVisiblePDF] = useState(true)
    const [isVisibleAddPergunta, setIsVisibleAddPergunta] = useState(true)
    const [showGerenciar, setShowGerenciar] = useState(false)
    const [isVisibleGerenciarQuest, setIsVisibleGerenciarQuest] = useState(false)
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
                  setIsVisibleGerenciarQuest(false)
                  setShow(0)
                  setShowCE(false)
                  setShowGerenciar(false)
                  setIsVisibleCE(false)
                  setIsVisiblePDF(true)
                  setIsVisibleAddPergunta(true)
                  setShowPDF(false)
                }}  style={{backgroundColor: `${show === 0 ? "white": ""}`}} className="opts-header-painel"> <p className="opts-painel">
                  MÚLTIPLA ESCOLHA</p></div>

                <div onClick={() => {
                  setIsVisibleGerenciarQuest(false)
                  setIsVisibleCE(true)
                  setShowGerenciar(false)
                  setShow(1)                
                  setShowCE(true)
                  setShowPDF(false)
                  }} style={{backgroundColor: `${showCE ? "white": ""}`}}  className="opts-header-painel"><p className="opts-painel">CERTO/ERRADO </p></div>

                <div  onClick={() => {
                  
                  setIsVisibleAddPergunta(false)
                  setIsVisiblePDF(true)
                  setShow(1)
                  setShowCE(false)
                  setShowPDF(false)
                  setShowGerenciar(true)
                  setIsVisibleGerenciarQuest(true)
                }}  style={{backgroundColor: `${showGerenciar ? "white": ""}`}}className="opts-header-painel"><p className="opts-painel">GERENCIAR QUESTÕES </p></div>

                <div onClick={() => {
                  setIsVisibleGerenciarQuest(false)
                  setIsVisibleAddPergunta(false)
                  setIsVisiblePDF(false)
                  setShowGerenciar(false)
                  setShow(1)
                  setShowCE(false)
                  setShowPDF(true)
                }} style={{backgroundColor: `${showPDF ? "white" : ""}`}} className="opts-header-painel"><p className="opts-painel">GERAR PDF</p></div>
            </Container>
            <Container className="body-painel">
            <AddPergunta isVisibleAddPergunta={isVisibleAddPergunta} isVisibleCE={isVisibleCE}  />
            {isVisiblePDF ? "" : <GerarPDF />}
           {isVisibleGerenciarQuest ? <GerenciarQuest /> : ""}
            </Container>
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