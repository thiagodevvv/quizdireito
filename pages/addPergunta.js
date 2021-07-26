import { useEffect } from 'react'
import Head from 'next/head'
import {Container, Button, Form, Modal} from 'react-bootstrap'
import Select from 'react-select'
import {useState} from 'react'
import axios from 'axios'
import Router from 'next/router'



export default function Home({isVisibleAddPergunta, isVisibleCE}) {
  console.log(isVisibleAddPergunta)
  const [temasApi,setTemasApi] = useState([])
  useEffect(() => {
    const getMat = async () => {
      const resultado = await axios.get('/api/materias')
      resultado.data.map((item) => {
          const opts = {
              label: `${item.materia}`,
              value: `${item.materia}`
              }
          setMaterias((prevState) => [...prevState, opts])
      })
    }
    getMat()

    const getTemas = async () => {
      const resultado = await axios.get('/api/temas')
      resultado.data.map((item) => {
        const opts = {
          label: `${item.tema}`,
          value: `${item.tema}`
        }
        setTemasApi((prevState) => [...prevState, opts])
      })
    }
    getTemas()
  },[])
  const instOpts = [{label: "STF", value: "STF"}, {label: "STJ", value:"STJ"}]

  const [pergunta, setPergunta] = useState("")
  const [alterA, setAlterA] = useState("")
  const [alterB, setAlterB] = useState("")
  const [alterC, setAlterC] = useState("")
  const [alterD, setAlterD] = useState("")
  const [alterE, setAlterE] = useState("")
  const [resp, setResp] = useState("")
  const [matInput, setMatInput] = useState("")
  const [materia, setMateria] = useState([])
  const [materias, setMaterias] = useState([])
  const [temaInput, setTemaInput] = useState("")
  const [tema, setTema] = useState([])
  const [temas, setTemas] = useState([])
  const [informativo, setInformativo] = useState(0)
  const [instituicao, setInstituicao] = useState("")
  const [justificativa, setJustificativa] = useState("")
  const initialFormState = { mySelectKey: null }
  const [myForm, setMyForm] = useState(initialFormState)
  /////Modal variaveis
  const [show, setShow] = useState(false)
  const handleClose = () => {

    setShow(false)
    window.location.reload()
  }
  const handleShow = () => setShow(true)
  const resetForm = () => {
    setMyForm(initialFormState);
  }
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      setMateria((prevState) => [...prevState, matInput])
      setMatInput("")
      console.log(matInput)
    }
  }

  const handleKeyDownTema = (event) => {
    if (event.key === 'Enter') {
      setTema((prevState) => [...prevState, temaInput])
      setTemaInput("")
    }
  }

  const deleteElementArray = (arr,value) => {
    return arr.filter((element) => {
      return element != value
    })
  }
  
  const resetarEstado = () => {
    setPergunta("")
    setAlterA("")
    setAlterB("")
    setAlterC("")
    setAlterD("")
    setAlterE("")
    setResp("")
    setMateria("")
    setInformativo(0)
    setInstituicao("")
    setJustificativa("")
  }
  async function enviarPergunta (pergunta,alterA,alterB,alterC,alterD,alterE,resp,materia,informativo,instituicao,justificativa,temas) {
    const result = await axios.post('/api/inserir', {
      "pergunta": pergunta,
      "alterA": alterA,
      "alterB": alterB,
      "alterC": alterC,
      "alterD": alterD,
      "alterE": alterE,
      "resp": resp,
      "materia": materia,
      "informativo": informativo,
      "instituição": instituicao,
      "justificativa": justificativa,
      "temas": temas

    })
    if(result.status === 200) {
      handleShow()
      resetarEstado()
    }
    
    
  }
  return (
    <Container style={{display: "flex", alignItems: "center", justifyContent: "left"}} fluid>
      <Head>
        <title>Adicionar Perguntas</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"
          integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l"
          crossOrigin="anonymous"/>
      </Head>
    <Form style={{marginTop:50}}>
        <Form.Group >
            <Form.Label>Texto do enunciado</Form.Label>
            <Form.Control value={pergunta} style={{marginBottom:10,borderWidth: 3, borderColor: "#C0C0C0"}} onChange={(event) => setPergunta(event.target.value)} rows={2} as="textarea" type="text"  />
            <Form.Label style={{display: `${isVisibleCE ? "none": ""}`}} >texto da assertiva a</Form.Label>
            <Form.Control value={alterA} onChange={(event) => setAlterA(event.target.value)} style={{display: `${isVisibleCE ? "none": ""}`,marginBottom:10,borderWidth: 3, borderColor: "#C0C0C0"}}type="text"  />
            <Form.Label style={{display: `${isVisibleCE ? "none": ""}`}}>texto da assertiva b</Form.Label>
            <Form.Control value={alterB} onChange={(event) => setAlterB(event.target.value)} style={{display: `${isVisibleCE ? "none": ""}`,marginBottom:10, borderWidth: 3, borderColor: "#C0C0C0"}}type="text"  />
            <Form.Label style={{display: `${isVisibleCE ? "none": ""}`}}>texto da assertiva c</Form.Label>
            <Form.Control value={alterC} onChange={(event) => setAlterC(event.target.value)} style={{display: `${isVisibleCE ? "none": ""}`,marginBottom:10, borderWidth: 3, borderColor: "#C0C0C0"}}type="text" />
            <Form.Label style={{display: `${isVisibleCE ? "none": ""}`}} >texto da assertiva d</Form.Label>
            <Form.Control value={alterD} onChange={(event) => setAlterD(event.target.value)} style={{display: `${isVisibleCE ? "none": ""}`,marginBottom:10, borderWidth: 3, borderColor: "#C0C0C0"}}type="text"  />
            <Form.Label style={{display: `${isVisibleCE ? "none": ""}`}}>texto da assertiva e</Form.Label>
            <Form.Control value={alterE} onChange={(event) => setAlterE(event.target.value)} style={{display: `${isVisibleCE ? "none": ""}`,marginBottom:10, borderWidth: 3, borderColor: "#C0C0C0"}}type="text" />
            <div className="separador-add-pergunta"></div>
            <Form.Label style={{display: `${isVisibleCE ? "none": ""}`}}>Digite letra da assertiva correta. P. ex: "a".</Form.Label>
            <Form.Label style={{display: `${isVisibleCE ? "": "none"}`}} >Digite "certo" ou "errado, conforme a questão seja certa ou errada".</Form.Label>
            <Form.Control style={{marginBottom:10, borderWidth: 3, borderColor: "#C0C0C0"}} value={resp} onChange={(event) => setResp(event.target.value)} type="text"  />
            <div className="separador-add-pergunta"></div>
            <Form.Label>Digite a justificativa da questão</Form.Label>
            <Form.Control  style={{marginBottom:10, borderWidth: 3, borderColor: "#C0C0C0"}} value={justificativa} onChange={(event) => setJustificativa(event.target.value)} rows={2} as="textarea" type="text" />
            <div className="separador-add-pergunta"></div>
            <Form.Label style={{marginTop: 5}}>Seleciona a matéria</Form.Label>
            <Form.Row>
              <Select  className="input-add-pergunta" options={materias}   value={materias.filter(({ value }) => value === myForm.mySelectKey)}
              onChange={(value) => {
                if(materia.indexOf(value.value) === -1) {
                  setMateria((prevState) => [...prevState, value.value])
                } }} placeholder="" />
              <Form.Label className="ou-add-pergunta">ou</Form.Label>
              <Form.Control placeholder="Escreva a matéria" className="input-add-materia" value={matInput} onKeyDown={handleKeyDown} onChange={(event) => {
                setMatInput(event.target.value)}} style={{marginBottom:10}} type="text" />
            </Form.Row>
            
            
            <div style={{display: "flex", flexDirection: "row"}}>
              {materia ? materia.map((element, i) => {
                return (
                  <div onClick={() => {
                    const newArray = deleteElementArray(materia, element)
                    setMateria(newArray)
                  } } key={i} className="content-materias-addpergunta">
                    <p style={{margin: 15,textAlign: "center"}}>{element} </p> <p style={{margin: 15,textAlign: "center", fontWeight: "bold"}}>X</p>
                  </div>
                )
              }) : ""}
            </div>
            <div className="separador-add-pergunta"></div>
            <Form.Label>Selecione o tema</Form.Label>
            <Form.Row>
            <Select className="input-add-pergunta" options={temasApi}   value={materias.filter(({ value }) => value === myForm.mySelectKey)}
              onChange={(value) => {
                if(tema.indexOf(value.value) === -1) {
                  setTema((prevState) => [...prevState, value.value])
                } }} placeholder="" />
            <Form.Label className="ou-add-pergunta">ou</Form.Label>
            <Form.Control  className="input-add-pergunta" placeholder="Escreva o tema" value={temaInput} onKeyDown={handleKeyDownTema} onChange={(event) => {
              setTemaInput(event.target.value)}} style={{marginBottom:10}} type="text" />
            <div style={{display: "flex", flexDirection: "row"}}>
              {tema ? tema.map((element, i) => {
                  return (
                    <div onClick={() => {
                      const newArray = deleteElementArray(tema, element)
                      setTema(newArray)
                    } } key={i} className="content-materias-addpergunta">
                      <p style={{margin: 15,textAlign: "center"}}>{element} </p> <p style={{margin: 15,textAlign: "center", fontWeight: "bold"}}>X</p>
                    </div>
                  )
                }) : ""}
            </div>
            </Form.Row>
            <div className="separador-add-pergunta"></div>
            <Form.Row>
              <div style={{display: "flex", flexDirection: "column", width: "49%"}}>
              <Form.Label>Digite o número do informativo. P. ex:"900"</Form.Label>
              <Form.Control  className="input-add-pergunta-info-inst" onChange={(event) => setInformativo(event.target.value)} placeholder="" />
              </div>
              <div style={{display: "flex", flexDirection: "column", width: "49%"}}>
              <Form.Label>Digite o número da instituição. P. ex:"STF"</Form.Label>
              <Form.Control className="input-add-pergunta-info-inst" onChange={(value) => setInstituicao(value.value)} placeholder="" />
              </div>
            </Form.Row>
        </Form.Group>
        <Button onClick={() => enviarPergunta(pergunta,alterA,alterB,alterC,alterD,alterE,resp,materia,informativo,instituicao,justificativa, tema)} 
        style={{marginBottom: 10, backgroundColor: "#274160"}} >CADASTRAR</Button>
        <Button style={{marginLeft: 10,marginBottom: 10}} variant="danger" 
                onClick={() => resetarEstado()}>
                LIMPAR
        </Button>
    </Form>
      <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Pergunta adicionada com sucesso</Modal.Title>
          </Modal.Header>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
    </Container>
  )
}


export const getServerSideProps = async (ctx) => {
  const {token } = ctx.req.cookies
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