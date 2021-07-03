import Head from 'next/head'
import {Container, Button, Form, Modal} from 'react-bootstrap'
import Select from 'react-select'
import {useState} from 'react'
import axios from 'axios'



export default function Home() {

  const options = [{
    label: "Direito constitucional", value: "Direito constitucional"
  }, 
  {
    label: "Direito penal", value: "Direito penal"
  },
  {
    label: "Direito administrativo", value: "Direito administrativo"
  }
  ]
  const instOpts = [{label: "STF", value: "STF"}, {label: "STJ", value:"STJ"}]

  const [pergunta, setPergunta] = useState("")
  const [alterA, setAlterA] = useState("")
  const [alterB, setAlterB] = useState("")
  const [alterC, setAlterC] = useState("")
  const [alterD, setAlterD] = useState("")
  const [alterE, setAlterE] = useState("")
  const [resp, setResp] = useState("")
  const [materia, setMateria] = useState("")
  const [informativo, setInformativo] = useState(0)
  const [instituicao, setInstituicao] = useState("")
  const [justificativa, setJustificativa] = useState("")
  /////Modal variaveis
  const [show, setShow] = useState(false)
  const handleClose = () => {

    setShow(false)
    window.location.reload()
  }
  const handleShow = () => setShow(true)
  
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
  async function enviarPergunta (pergunta,alterA,alterB,alterC,alterD,alterE,resp,materia,informativo,instituicao,justificativa) {
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
      "justificativa": justificativa
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
            <Form.Control placeholder="Escreva a materia" onChange={(event) => setMateria(event.target.value)} value={materia} style={{marginBottom:10}}type="text" />
            <Form.Label>Informativo</Form.Label>
            <Form.Control value={informativo} onChange={(event) => setInformativo(event.target.value)} placeholder="Escreva o informativo" />
            <Form.Label>Instituição</Form.Label>
            <Select options={instOpts}  onChange={(value) => setInstituicao(value.value)} placeholder="Selecionar Instituição" lassName="input-informativo"/>
            <Form.Label>Justificativa</Form.Label>
            <Form.Control value={justificativa} onChange={(event) => setJustificativa(event.target.value)} rows={2} as="textarea" type="text" placeholder="Escreva a justificativa" />
        </Form.Group>
        <Button onClick={() => enviarPergunta(pergunta,alterA,alterB,alterC,alterD,alterE,resp,materia,informativo,instituicao,justificativa)} 
        style={{marginBottom: 10}} variant="dark">Enviar</Button>
        <Button style={{marginLeft: 10,marginBottom: 10}} variant="danger" 
                onClick={() => resetarEstado()}>
            Limpar
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
