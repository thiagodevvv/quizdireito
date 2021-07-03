import Head from 'next/head'
import {Container,Navbar, Form, Button} from 'react-bootstrap'
import axios from 'axios'
import ListaPerguntas from '../components/ListaPerguntas'
import { useState, useEffect, useRef } from 'react'
import Select from 'react-select'
import Condicao from '../components/Condicao'



export default function Home() {
  const optsInst = [{label: "STF", value:"STF"}, {label: "STJ", value:"STJ"}]
  const [perguntas, setPerguntas] = useState([])

  //FILTRO
    const [mat, setMat] = useState([])
    const [inst, setInst] = useState([])
    const [info, setInfo] = useState([])
    const [buscaFiltroTamanho, setBuscaFiltroTamanho] = useState(null)
    const [informativos, setInformativos] = useState([])
    const [materias, setMaterias] = useState([])
    const [controlInfo, setControlInfo] = useState(false)
    const [filters, setFilters] = useState([])
    const [verific, setVerific] = useState(0)
    const initialFormState = { mySelectKey: null }
    const [myForm, setMyForm] = useState(initialFormState)
    const [isLoadingFilter, setIsLoadingFilter] = useState(false)

    async function FiltroPerguntas (mat,inst,info) {
      setPerguntas([])
        setBuscaFiltroTamanho(null)
        setIsLoadingFilter(true)
        const data = await axios.post('/api/filtro', {
            "mat": mat,
            "inst": inst,
            "info": info
        })
        if(data.data.length === 0) {
          alert('Nenhuma pergunta encontrado com esse tipo de filtro')
          setBuscaFiltroTamanho(0)
        }else {
     
          setIsLoadingFilter(false)
          data.data.map((item) => {
            setBuscaFiltroTamanho((prevState) => prevState + item.length)
          })
        }
        console.log(data.data)
        data.data.map((item) => {
    
            item.map((pg) => {
                let busca = filters.find((item) => {
           
                  return item.pergunta === pg.pergunta
                })
                // console.log(busca)
                if(busca == undefined) {
                 
                  setPerguntas((prevState) => [...prevState, pg])
                }else {

                }
                 
            })
        })
        
     
    }

 

    useEffect(() => {
      const getInfo = async () => {
      const resultado = await axios.get('/api/informativos')
      resultado.data.map((item) => {
          const opts = {
              label: `${item.numeroInfo}`,
              value: `${item.numeroInfo}`
              }
          setInformativos((prevState) => [...prevState, opts])
      })
    }
    const getMaterias = async () => {
      const resultado = await axios.get('/api/materias')
      resultado.data.map((item) => {
        const opts = {
          label: `${item.materia}`,
          value: `${item.materia}`
          }
          setMaterias((prevState) => [...prevState, opts])
      })

    }
    getInfo()
    getMaterias()
    }, [])
  

    useEffect(() => {
        const chamando = async () => {
        const resultado = await axios.get('/api/busca')
        setPerguntas(resultado.data)
      }
      chamando()
    }, [])

    const verificandoCaixaFiltro = () => {
      if(verific === 0) {
        return 100
      }else {
        return "auto"
      }
       
    }
    const deleteElementArray = (arr,value) => {
      return arr.filter((element) => {
        return element != value
      })
    }
    
    const removeFilterMateria = (item) => {
      
      const newArr = deleteElementArray(mat,item)
      setMat(newArr)
    }
    const removeFilterInformativo = (item) => {
      const newArr = deleteElementArray(info,item)
      setInfo(newArr)
    }
    const removeFilterInstituicao = (item) => {
      const newArr = deleteElementArray(inst,item)
      setInst(newArr)
    }
    const resetForm = () => {
      setMyForm(initialFormState);
    }

    const cleanFilters = () => {
      setMat([])
      setInst([])
      setInfo([])
      resetForm()
      window.location.reload()
    }

  return (
    <Container style={{padding:0}}>
    <Head>
      <title>Quiz</title>
      <link rel="icon" href="/favicon.ico" />
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"
        integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l"
        crossorigin="anonymous"/>
         <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet" />
    </Head>
    
    <Navbar className="header" bg="light">
      <div style={{display: "flex", flexDirection: "row"}}><p id="title">Questão de Informativo</p> 
      <img  width="50" height="50" src="/notebook.png"/> </div>
      <a target="_blank" href="https://www.instagram.com/_questaodeinformativo_/"><img  width="50" height="50" src="/insta.svg"/></a>
    </Navbar>
    <Container>
            <p className="filtername">Filtrar questões <img src="/search.png" width="25" height="25" /> </p> 
            <Form.Group>
                <Form.Row>
                <Select value={materias.filter(({ value }) => value === myForm.mySelectKey)} placeholder="Selecionar materia"  onChange={(value) => {
                    setVerific(1)
                    if(mat.indexOf(value.value) === -1) {
                      setMat((prevState) => [...prevState, value.value])
                    }
                   
                }} className="input-informativo" options={materias} />
        
                <Select  value={info.filter(({ value }) => value === myForm.mySelectKey)} placeholder="Selecionar informativo" isOptionDisabled={() => controlInfo } 
                    onChange={(value) => {
                    setVerific(1)
                    let _info = parseInt(value.value)
                    if(info.indexOf(_info) === -1) {
                      setInfo((prevState) => [...prevState, _info])
                    }
                }} className="input-informativo" options={informativos} />

                <Select value={inst.filter(({ value }) => value === myForm.mySelectKey)} placeholder="Selecionar instituicação" onChange={(value, actionMeta) => {
                  setVerific(1)
                  if(inst.indexOf(value.value) === -1) {
                    setInst((prevState) => [...prevState, value.value])
                  }
                  
                }} className="input-informativo" options={optsInst} />

                
                <Container style={{height: verificandoCaixaFiltro()}} className="ContainerFiltros">
                  <Container>
                  {mat.map((item, i) => {
                    return <div  className="caixaFiltro" onClick={() => removeFilterMateria(item)} key={i}>
                      <p style={{fontWeight: "bold", marginRight: 5, marginTop: 10}}>x</p>
                      <p style={{marginTop: 10}}>{item} </p></div>
                  })}
                  </Container>

                  <Container>
                  {info.map((item, i) => {
                    return <div className="caixaFiltro" onClick={() => removeFilterInformativo(item)} key={i}>
                        <p style={{fontWeight: "bold", marginRight: 5, marginTop: 10}}>x</p>
                        <p style={{marginTop: 10}}>{item} </p></div>
                  })}
                  </Container>

                  <Container>
                  {inst.map((item, i) => {
                    return <div  className="caixaFiltro" onClick={() => removeFilterInstituicao(item)} key={i}>
                      
                      <p style={{fontWeight: "bold", marginRight: 5, marginTop: 10}}>x</p>  
                      <p style={{marginTop: 10}}>{item} </p></div>
                  })}
                  </Container>

                </Container>
                <Container style={{display:"flex", flexDirection: "row"}}>
                <Button style={{marginTop: 6, width: 80}} variant="info" onClick={(event) => {
                  event.preventDefault()
                  FiltroPerguntas(mat,inst,info)
                }}>Filtrar</Button>
                <Button style={{marginTop: 6, marginLeft: 6, width: 80}} variant="danger" onClick={() => cleanFilters()}>Limpar</Button>
                </Container>
                <p style={{marginLeft:13, fontWeight: "bold", marginTop: 5}}>{buscaFiltroTamanho ? `${buscaFiltroTamanho} questões foram encontradas.` : "" }</p>
            </Form.Row>
            </Form.Group>
        </Container>
    <Condicao isLoading={isLoadingFilter}  perguntas={perguntas} />
  </Container>
  )
}
