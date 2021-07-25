import Head from 'next/head'
import {Container,Navbar, Form, Button} from 'react-bootstrap'
import axios from 'axios'
import { useState, useEffect, useRef } from 'react'
import Select from 'react-select'
import Condicao from '../components/Condicao'
import CheckBox from '../components/CheckBox'



export default function Home() {
  const optsInst = [{label: "STF", value:"STF"}, {label: "STJ", value:"STJ"}]
  const [perguntas, setPerguntas] = useState([])

  //FILTRO
    const [mat, setMat] = useState([])
    const [inst, setInst] = useState([])
    const [info, setInfo] = useState([])
    const [tema, setTema] = useState([])
    const [buscaFiltroTamanho, setBuscaFiltroTamanho] = useState(null)
    const [informativos, setInformativos] = useState([])
    const [materias, setMaterias] = useState([])
    const [temas, setTemas] = useState([])
    const [filters, setFilters] = useState([])
    const [verific, setVerific] = useState(0)
    const initialFormState = { mySelectKey: null }
    const [myForm, setMyForm] = useState(initialFormState)
    const [isLoadingFilter, setIsLoadingFilter] = useState(false)
    const [isCheckedCe, setIsCheckedCe] = useState(false)
    const [isCheckedMe, setIsCheckedMe] = useState(false)
    const [infoFinal, setInfoFinal] = useState(true)
    const [infoInicial, setInfoInicial] = useState(false)
    const [infoFinalArray, setInfoFinalArray] = useState([])
    const [arrayFilter, setArrayFilter] = useState([])
    const [tipoCE, setTipoCE] = useState(null)
    const [tipoME, setTipoME] = useState(null)
    const [anyFilter, setAnyFilter] = useState(false)

    async function FiltroPerguntas (mat,inst,info, temas, tipoCE, tipoME) {
      setPerguntas([])
        setBuscaFiltroTamanho(null)
        setIsLoadingFilter(true)
        const data = await axios.post('/api/filtro', {
            "mat": mat,
            "inst": inst,
            "info": info,
            "temas": temas,
            "tipoCE": tipoCE,
            "tipoME": tipoME
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

    const getTemas = async () => {
      const resultado = await axios.get('/api/temas')
      resultado.data.map((item) => {
        const opts = {
          label: `${item.tema}`,
          value: `${item.tema}`
          }
          setTemas((prevState) => [...prevState, opts])
      })
    }
    getInfo()
    getMaterias()
    getTemas()
    }, [])
  

    useEffect(() => {
        const chamando = async () => {
        const resultado = await axios.get('/api/busca')
        setPerguntas(resultado.data)

      }
      chamando()
    }, [])

    useEffect(() => {

      if(info.length === 0) {
        setInfoInicial(false)
        setInfoFinal(true)
      }
      if(info.length === 1) {
        setInfoInicial(true)
      }
      if(info.length === 2) {
        setInfoInicial(true)
        setInfoFinal(true)
      }
    },[info])

    const verificandoCaixaFiltro = () => {
      if(arrayFilter.length === 0) {
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


    function customTheme (theme) {
      return  {
        ...theme,
        colors: {
          ...theme.colors,
          primary25: '#cb605d',
          primary: '#cb605d',
          neutral50: "#cb605d"
          
        }
      }
    }

    const dropdownIndicatorStyles = (base, state) => {
      let changes = {
        // all your override styles
        color: '#cb605d'
      };
      return Object.assign(base, changes);
    }
   

    

  return (
    <Container style={{padding: 0, margin: 0, display: "flex", flexDirection: "column"}} fluid="true">
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
      <Navbar className="header">
        <img width="80" height="80" src="/direito.svg"/>  
        <h1 id="title">QUESTÕES DE INFORMATIVO</h1> 
        <a target="_blank" href="https://www.instagram.com/_questaodeinformativo_/">
          <img  width="50" height="50" src="/instagram.svg"/>
        </a>
      </Navbar>
      {/* FILTRO COMEÇA AQUI */}
      <p className="filtername">FILTRO </p>
      <Container className="content-filters">
   
                <Container  >
                  <Container  className="content-selects-filters" style={{display: "flex", flexDirection: "row"}}>
                    <Form.Group >
                        <Form.Row>
                          <Select value={inst.filter(({ value }) => value === myForm.mySelectKey)} placeholder="Instituição" onChange={(value) => {
                            setVerific(1)
                            if(inst.indexOf(value.value) === -1) {
                              setInst((prevState) => [...prevState, value.value])
                              if(arrayFilter.indexOf(value.value) === -1) {
                                setArrayFilter((prevState) => [...prevState, value.value])
                              }
                            }
                            
                          }} styles={{dropdownIndicator: dropdownIndicatorStyles}} className="input-informativo" theme={customTheme} options={optsInst} />

                          <Select value={materias.filter(({ value }) => value === myForm.mySelectKey)} placeholder="Matéria"  onChange={(value) => {
                              setVerific(1)
                              if(mat.indexOf(value.value) === -1) {
                                setMat((prevState) => [...prevState, value.value])
                                if(arrayFilter.indexOf(value.value) === -1) {
                                  setArrayFilter((prevState) => [...prevState, value.value])
                                }
                              }
                            
                          }} styles={{dropdownIndicator: dropdownIndicatorStyles}} className="input-informativo"  theme={customTheme} options={materias} />
                          <Select  value={info.filter(({ value }) => value === myForm.mySelectKey)} placeholder="Tema" 
                              onChange={(value) => {
                              setVerific(1)
                              if(tema.indexOf(value.value) === -1) {
                                setTema((prevState) => [...prevState, value.value])
                                if(arrayFilter.indexOf(value.value) === -1) {
                                  setArrayFilter((prevState) => [...prevState, value.value])
                                }
                              }
                          }} styles={{dropdownIndicator: dropdownIndicatorStyles}} className="input-informativo"  theme={customTheme} options={temas} />
                        </Form.Row>
                      </Form.Group>

                  </Container>
                {/* HACKZINHO PROVISORIO */}

                <Container className="content-info-hack">
                  <Form.Group>
                        <Form>
                          <Select isDisabled={infoInicial} value={info.filter(({ value }) => value === myForm.mySelectKey)} placeholder="Informativo inicial" onChange={(value) => {
                            setInfoFinal(false)
                            if(info.indexOf(value.value) === -1) {
                              setInfo((prevState) => [...prevState, value.value])
                              const posicao = informativos.findIndex(element => element.value === value.value)
                              const infoCut = informativos.slice(posicao + 1)
                              infoCut.map((element) => setInfoFinalArray((prevState) => [...prevState, element]))
                              if(arrayFilter.indexOf(value.value) === -1) {
                                setArrayFilter((prevState) => [...prevState, value.value])
                              }
                            }
                            
                          }} styles={{dropdownIndicator: dropdownIndicatorStyles}} className="input-infos"  theme={customTheme} options={informativos} />

                          <Select isDisabled={infoFinal} value={info.filter(({ value }) => value === myForm.mySelectKey)} placeholder="Informativo final" onChange={(value) => {
                              setVerific(1)
                              if(info.indexOf(value.value) === -1) {
                                setInfo((prevState) => [...prevState, value.value])
                                if(arrayFilter.indexOf(value.value) === -1) {
                                  setArrayFilter((prevState) => [...prevState, value.value])
                                }
                              }
                            
                          }} styles={{dropdownIndicator: dropdownIndicatorStyles}} className="input-infos" theme={customTheme} options={infoFinalArray} />

                        <div className="content-checkboxs" onClick={() => {
                          isCheckedCe ? setIsCheckedCe(false) : setIsCheckedCe(true)
                          if(tipoCE == null)  {
                            setTipoCE(1)
                            console.log(tipoCE)
                          }else {
                             setTipoCE(null)
                          }
                        }}
                            style={{display: "flex", flexDirection: "row"}}> 
                           <CheckBox isChecked={isCheckedCe}/> <Form.Label style={{marginTop: 10}}> C/E</Form.Label>
                        </div>

                        <div style={{display: "flex", flexDirection: "row"}} onClick={() => {
                          isCheckedMe ? setIsCheckedMe(false) : setIsCheckedMe(true)
                          if(tipoME == null)  {
                            setTipoME(1)
                          }else {
                             setTipoME(null)
                          }
                        }}>
                            <CheckBox isChecked={isCheckedMe} /> <Form.Label style={{marginTop: 10}}>Múltipla escolha</Form.Label>
                        </div>

                        </Form>
                  </Form.Group>
            </Container>
                {/* FIM DO HACKZINHO PROVISORIO */}
                    
                <Container style={{height: verificandoCaixaFiltro()}} className="ContainerFiltros">
                    {arrayFilter.map((item,i) => {
                      return (
                        <div key={i} className="caixaFiltro" onClick={() => {

                          mat.map((element, i) => {
                            if(element === item ){
                               setArrayFilter(deleteElementArray(arrayFilter, item))
                               setMat(deleteElementArray(mat, item))
                            }
                          })

                          inst.map((element, i) => {
                            if(element === item ){
                               setArrayFilter(deleteElementArray(arrayFilter, item))
                               setInst(deleteElementArray(inst, item))
                            }
                          })

                          info.map(async(element, index) => {
                            if(element === item ){
                              if(index === 0) {
                                const infofinal = info[1]
                                const infoinicial = item
                                const newArray = deleteElementArray(arrayFilter, infoinicial)
                                const newArrayFinaly = deleteElementArray(newArray, infofinal)
                                setArrayFilter(newArrayFinaly)
                                setInfo([])
                              }else {
                                setArrayFilter(deleteElementArray(arrayFilter, item))
                                setInfo(deleteElementArray(info, item))
                                setInfoFinal(false)
                              }
                              
                            }
                          })

                          tema.map((element, i) => {
                            if(element === item ){
                               setArrayFilter(deleteElementArray(arrayFilter, item))
                               setTema(deleteElementArray(tema, item))
                            }
                          })
                         

                        }}>
                          <p style={{margin:10, fontSize: 11, color:"#cb605d"}}> {item}</p>
                          <p className="xis">x</p>
                        </div>
                      )
                    })}
                </Container>
                <Container style={{display:"flex", flexDirection: "row"}}>
                <Button className="btnFilter"  onClick={(event) => {
                  event.preventDefault()
                  if(mat.length > 0 ||  inst.length > 0  || info.length > 0  || tema.length > 0 || tipoCE !== null || tipoME !== null)
                  {
                    FiltroPerguntas(mat,inst,info, tema, tipoCE, tipoME)
                  }else 
                  {
                    setAnyFilter(true)
                  }
                }}> <p style={{fontSize: 20,fontWeight: "bold", margintTop: 10}}>BUSCAR</p></Button>
                <Button className="btnLimpar"  variant="danger" onClick={() => cleanFilters()}> <p style={{fontSize: 20,fontWeight: "bold"}}>
                  LIMPAR
                  </p>
                </Button>
                </Container>
                <p style={{marginLeft:13,fontWeight: "bold", color: "red", marginTop: 6}}>{anyFilter ? "Selecione algum filtro." : ""}</p>
                <p style={{marginLeft:13, fontWeight: "bold", marginTop: 5}}>{buscaFiltroTamanho ? `${buscaFiltroTamanho} questões foram encontradas.` : "" }</p>
          
           
            </Container>
            {/* CONTAINER DOS INFORMATIVOS C/E E MULTIPLA ESCOLHA */}
            <Container className="content-info">
                  <Form.Group>
                        <Form>
                          <Select isDisabled={infoInicial} value={info.filter(({ value }) => value === myForm.mySelectKey)} placeholder="Informativo inicial" onChange={(value) => {
                            setInfoFinal(false)
                            setVerific(1)
                            if(info.indexOf(value.value) === -1) {
                              setInfo((prevState) => [...prevState, value.value])
                              const posicao = informativos.findIndex(element => element.value === value.value)
                              const infoCut = informativos.slice(posicao + 1)
                              infoCut.map((element) => setInfoFinalArray((prevState) => [...prevState, element]))
                              if(arrayFilter.indexOf(value.value) === -1) {
                                setArrayFilter((prevState) => [...prevState, value.value])
                              }
                            }
                            
                          }} styles={{dropdownIndicator: dropdownIndicatorStyles}} theme={customTheme} className="input-infos" options={informativos} />

                          <Select isDisabled={infoFinal} value={info.filter(({ value }) => value === myForm.mySelectKey)} placeholder="Informativo final"  onChange={(value) => {
                              setVerific(1)
                              if(info.indexOf(value.value) === -1) {
                                setInfo((prevState) => [...prevState, value.value])
                                if(arrayFilter.indexOf(value.value) === -1) {
                                  setArrayFilter((prevState) => [...prevState, value.value])
                                }
                              }
                            
                          }} styles={{dropdownIndicator: dropdownIndicatorStyles}} theme={customTheme} className="input-infos" options={infoFinalArray} />

                        <div className="content-checkboxs" onClick={() => {
                          isCheckedCe ? setIsCheckedCe(false) : setIsCheckedCe(true)
                          if(tipoCE == null)  {
                            setTipoCE(1)
                            console.log(tipoCE)
                          }else {
                             console.log(tipoCE)
                             setTipoCE(null)
                          }
                        }}
                              style={{display: "flex", flexDirection: "row"}}> 
                          <CheckBox isChecked={isCheckedCe}/> <Form.Label style={{marginTop: 10}}> C/E</Form.Label>
                        </div>

                        <div style={{display: "flex", flexDirection: "row"}} onClick={() => {
                          isCheckedMe ? setIsCheckedMe(false) : setIsCheckedMe(true)
                          if(tipoME == null)  {
                            setTipoME(1)
                          }else {
                             setTipoME(null)
                          }
                          }}>
                          <CheckBox isChecked={isCheckedMe} /> <Form.Label style={{marginTop: 10}}>Múltipla escolha</Form.Label>
                        </div>

                        </Form>
                  </Form.Group>
            </Container>
            {/* FINALIZA CONTAINER INFO C/E ..... */}
          
        </Container>
{/* FILTRO ACABA AQUI */}
      <Container style={{marginTop: 10}}>
          <Condicao isLoading={isLoadingFilter}  perguntas={perguntas} />
      </Container>
  </Container>
  )
}
