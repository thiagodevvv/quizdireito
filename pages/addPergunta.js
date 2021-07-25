import { useEffect } from 'react'
import Head from 'next/head'
import {Container, Button, Form, Modal} from 'react-bootstrap'
import Select from 'react-select'
import {useState} from 'react'
import axios from 'axios'
import Router from 'next/router'



export default function Home() {
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
    const result = await axios.post('https://quizdireito.vercel.app/api/inserir', {
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
    console.log(result)
    if(result.status === 200) {
      handleShow()
      resetarEstado()
    }
    
    
  }
  return (
    <Container fluid>
      <Head>
        <title>Adicionar Perguntas</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"
          integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l"
          crossOrigin="anonymous"/>
      </Head>
    <h1>Adicionar Pergunta</h1>
    <Form>
        <Form.Group >
            <Form.Label>Pergunta</Form.Label>
            <Form.Control value={pergunta} onChange={(event) => setPergunta(event.target.value)} rows={2} as="textarea" type="text" placeholder="Escreva a pergunta" />
            <Form.Label>Alternativas</Form.Label>
            <Form.Control value={alterA} onChange={(event) => setAlterA(event.target.value)} style={{marginBottom:10}}type="text" placeholder="Alternativa A" />
            <Form.Control value={alterB} onChange={(event) => setAlterB(event.target.value)} style={{marginBottom:10}}type="text" placeholder="Alternativa B" />
            <Form.Control value={alterC} onChange={(event) => setAlterC(event.target.value)} style={{marginBottom:10}}type="text" placeholder="Alternativa C" />
            <Form.Control value={alterD} onChange={(event) => setAlterD(event.target.value)} style={{marginBottom:10}}type="text" placeholder="Alternativa D" />
            <Form.Control value={alterE} onChange={(event) => setAlterE(event.target.value)} style={{marginBottom:10}}type="text" placeholder="Alternativa E" />
            <Form.Label>Resposta correta</Form.Label>
            <Form.Control value={resp} onChange={(event) => setResp(event.target.value)} type="text" placeholder="Escreva a alternativa correta" />
            <Form.Text className="text-muted" >Exemplo: a</Form.Text>
            <Form.Label style={{marginTop: 5}}>Matéria</Form.Label>
            <Select options={materias}   value={materias.filter(({ value }) => value === myForm.mySelectKey)}
            onChange={(value) => {
              if(materia.indexOf(value.value) === -1) {
                setMateria((prevState) => [...prevState, value.value])
              } }} placeholder="Selecione Matéria" />
            <Form.Label>Ou</Form.Label>
            <Form.Control value={matInput} onKeyDown={handleKeyDown} placeholder="Escreva a materia" onChange={(event) => {
              setMatInput(event.target.value)}} style={{marginBottom:10}} type="text" />
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
            <Form.Label>Tema</Form.Label>
            <Form.Control value={temaInput} onKeyDown={handleKeyDownTema} placeholder="Escreva o tema" onChange={(event) => {
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
            <Form.Label>Informativo</Form.Label>
            <Form.Control value={informativo} onChange={(event) => setInformativo(event.target.value)} placeholder="Escreva o informativo" />
            <Form.Label>Instituição</Form.Label>
            <Select options={instOpts}  onChange={(value) => setInstituicao(value.value)} placeholder="Selecionar Instituição" />
            <Form.Label>Justificativa</Form.Label>
            <Form.Control value={justificativa} onChange={(event) => setJustificativa(event.target.value)} rows={2} as="textarea" type="text" placeholder="Escreva a justificativa" />
        </Form.Group>
        <Button onClick={() => enviarPergunta(pergunta,alterA,alterB,alterC,alterD,alterE,resp,materia,informativo,instituicao,justificativa, tema)} 
        style={{marginBottom: 10}} variant="dark">Enviar</Button>
        <Button style={{marginLeft: 10,marginBottom: 10}} variant="danger" 
                onClick={() => resetarEstado()}>
            Limpar
        </Button>
    </Form>
    <Button variant="dark" onClick={() => Router.push('/painel')} style={{marginBottom: 10}}>VOLTAR PAINEL ADM</Button>
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