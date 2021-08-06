import Head from 'next/head'
import {Container, Form, Button} from 'react-bootstrap'
import axios from 'axios'
import { useState, useEffect } from 'react'
import ListaPerguntas from '../components/ListaPerguntas'
import Select from 'react-select'
import CheckBox from '../components/CheckBox'   



export default function Home() {
  const optsInst = [{label: "STF", value:"STF"}, {label: "STJ", value:"STJ"}]
  const [perguntas, setPerguntas] = useState([])

  //FILTRO
    const [mat, setMat] = useState([])
    const [inst, setInst] = useState([])
    const [info, setInfo] = useState([])
    const [infoInit, setInfoInit] = useState("")
    const [infoEnd, setInfoEnd] = useState("")
    const [infoInitAndEnd, setInfoInitAndEnd] = useState([])
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
    const [infoFinalDisable, setInfoFinalDisable] = useState(true)
    const [infoFinalArray, setInfoFinalArray] = useState([])
    const [arrayFilter, setArrayFilter] = useState([])
    const [tipoCE, setTipoCE] = useState(null)
    const [tipoME, setTipoME] = useState(null)
    const [anyFilter, setAnyFilter] = useState(false)
    const [zerarLista, setZerarLista] = useState(false)

    async function FiltroPerguntas (mat,inst,info, temas, tipoCE, tipoME, infoInit, infoEnd) {
      setZerarLista(true)
      if(anyFilter) { setAnyFilter(false)}
      let arr = []
      if(infoInit) { arr.push(infoInit)}
      if(infoEnd) { arr.push(infoEnd)} 
        setPerguntas([])
        setBuscaFiltroTamanho(null)
        setIsLoadingFilter(true)
        const data = await axios.post('https://quizdireito.vercel.app/api/filtro', {
            "mat": mat,
            "inst": inst,
            "info": arr,
            "temas": temas,
            "tipoCE": tipoCE,
            "tipoME": tipoME
        })
        if(data.data.length === 0) {
          setIsLoadingFilter(false)
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
      const resultado = await axios.get('https://quizdireito.vercel.app/api/informativos')
      resultado.data.map((item) => {
          const opts = {
              label: `${item.numeroInfo}`,
              value: `${item.numeroInfo}`
              }
          setInformativos((prevState) => [...prevState, opts])
      })
    }
    const getMaterias = async () => {
      const resultado = await axios.get('https://quizdireito.vercel.app/api/materias')
      resultado.data.map((item) => {
        const opts = {
          label: `${item.materia}`,
          value: `${item.materia}`
          }
          setMaterias((prevState) => [...prevState, opts])
      })

    

    }

    const getTemas = async () => {
      const resultado = await axios.get('https://quizdireito.vercel.app/api/temas')
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
        const resultado = await axios.get('https://quizdireito.vercel.app/api/busca')
        setPerguntas(resultado.data)
        setBuscaFiltroTamanho(resultado.data.length)
      }
      chamando()
    }, [])

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
          primary25: '#dde4ec',
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
    <Container style={{padding: 0,margin: 0,display: "flex", flexDirection: "column", width: "100%"}} fluid>
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
      <Container className="header" fluid>
        <Container style={{display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center"}}>
          <div style={{display: "flex", flexDirection: "row", flex:14, alignItems: "center"}}>
            <img className="img-direito" width="90" height="90"  src='/direito.svg' />
            <h1 id="title">QUESTÕES DE INFORMATIVO</h1> 
          </div>
          <div style={{flex: 1, alignItems: "center"}}>
            <a target="_blank" href="https://www.instagram.com/_questaodeinformativo_/">
              <img className="img-instagram" width="60" height="60" src="/instagram.svg"/>
            </a>
          </div>
        </Container>
      </Container>
      {/* FILTRO COMEÇA AQUI */}
      <Container className="content-filters">
                <Container style={{marginBottom: -10}}>
                 {/* CONTAINER INFO INICIAL E FINAL ///////////// C.E E M.E */}
                  <Container className="content-info">
                   <div style={{marginLeft: -15, padding:0, width: "100%", marginTop: 10}}><p className="filtername">FILTRO </p></div>
                          <Form.Row style={{ padding: 0, marginLeft:-15, marginRight: -10}} >
                            <Select value={infoInit} placeholder={infoInit ? `Informativo inicial: ${infoInit}` : "Informativo inicial"} onChange={(value) => {
                                setVerific(1)
                                setInfoFinalDisable(false)
                                setInfoInit(value.value)
                                setInfoFinalArray([])
                                const posicao = informativos.findIndex(element => element.value === value.value)
                                const infoCut = informativos.slice(posicao + 1)
                                infoCut.map((element) => setInfoFinalArray((prevState) => [...prevState, element]))
                            }} styles={{dropdownIndicator: dropdownIndicatorStyles}} theme={customTheme} className="input-info-inicial" options={informativos} />

                            <Select  isDisabled={infoFinalDisable} value={infoEnd} placeholder={infoEnd ? `Informativo final: ${infoEnd}` : "Informativo final"}  onChange={(value) => {
                                setVerific(1)
                                setInfoEnd(value.value)
                            }} styles={{dropdownIndicator: dropdownIndicatorStyles}} theme={customTheme} className="input-infos" options={infoFinalArray} />
                          <div style={{display: "flex", flexDirection: "row", marginLeft: 10, marginTop: 5}}>
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
                              <CheckBox isChecked={isCheckedCe}/> <Form.Label className="ce" > C/E</Form.Label>
                            </div>

                            <div style={{display: "flex", flexDirection: "row", marginLeft: 15}} onClick={() => {
                              isCheckedMe ? setIsCheckedMe(false) : setIsCheckedMe(true)
                              if(tipoME == null)  {
                                setTipoME(1)
                              }else {
                                setTipoME(null)
                              }
                              }}>
                              <CheckBox isChecked={isCheckedMe} /> <Form.Label className="mult-escolha" >Múltipla escolha</Form.Label>
                            </div>
                          </div>
                          </Form.Row>
              </Container>
            {/* FIMMMMMMMMMMMMMMMMMMMMM INFO INICIAL FINAL C.E M.E */}
                  <Container className="content-info" >
                    {/* <Form.Group > */}
                        <Form.Row style={{marginLeft:-15, padding: 0, marginRight: -10}} >
                          <Select value={inst.filter(({ value }) => value === myForm.mySelectKey)} placeholder="Instituição" onChange={(value) => {
                            setVerific(1)
                            if(inst.indexOf(value.value) === -1) {
                              setInst((prevState) => [...prevState, value.value])
                              if(arrayFilter.indexOf(value.value) === -1) {
                                setArrayFilter((prevState) => [...prevState, value.value])
                              }
                            }
                            
                          }} styles={{dropdownIndicator: dropdownIndicatorStyles}} className="input-infos" theme={customTheme} options={optsInst} />

                          <Select value={materias.filter(({ value }) => value === myForm.mySelectKey)} placeholder="Matéria"  onChange={(value) => {
                              setVerific(1)
                              if(mat.indexOf(value.value) === -1) {
                                setMat((prevState) => [...prevState, value.value])
                                if(arrayFilter.indexOf(value.value) === -1) {
                                  setArrayFilter((prevState) => [...prevState, value.value])
                                }
                              }
                            
                          }} styles={{dropdownIndicator: dropdownIndicatorStyles}} className="input-infos"  theme={customTheme} options={materias} />
                          <Select  value={info.filter(({ value }) => value === myForm.mySelectKey)} placeholder="Tema" 
                              onChange={(value) => {
                              setVerific(1)
                              if(tema.indexOf(value.value) === -1) {
                                setTema((prevState) => [...prevState, value.value])
                                if(arrayFilter.indexOf(value.value) === -1) {
                                  setArrayFilter((prevState) => [...prevState, value.value])
                                }
                              }
                          }} styles={{dropdownIndicator: dropdownIndicatorStyles}} className="input-infos"  theme={customTheme} options={temas} />
                        </Form.Row>
                      {/* </Form.Group> */}

                  </Container>
                  <Container className="content-info">
                    <Form.Row style={{marginLeft:-15, padding: 0, marginRight: -10}}  >
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
                  </Form.Row>
                  </Container>
                  <Container style={{marginLeft: 0,padding:0, width: "100%"}}>
                    <Button className="btnFilter"  onClick={(event) => {
                      
                      event.preventDefault()
                      if(mat.length > 0 ||  inst.length > 0  || infoInit.length > 0  ||  infoEnd.length > 0  || tema.length > 0 || tipoCE !== null || tipoME !== null)
                      {
                        FiltroPerguntas(mat,inst,info, tema, tipoCE, tipoME, infoInit, infoEnd)
                      }else 
                      {
                        setAnyFilter(true)
                      }
                    }}> <p style={{fontSize: 15,fontWeight: "bold", textAlign: 'center', opacity: 0.9, fontFamily: 'Segoe', marginTop: 1}}>BUSCAR</p></Button>
                    <Button className="btnLimpar"  onClick={() => cleanFilters()}> <p style={{fontSize: 15,fontWeight: "bold",  textAlign: 'center',  opacity: 0.9, fontFamily: 'Segoe', marginTop: 1}}>
                      LIMPAR
                      </p>
                    </Button>
                  </Container>
                  </Container>
                  <Container style={{marginLeft: -13, marginTop: -10, marginBottom: 0}}>
                    <p style={{marginLeft:13,fontWeight: "bold", color: "red", marginTop: 15, fontFamily: 'Segoe', fontSize: 15, marginBottom: 4}}>{anyFilter ? "Selecione algum filtro." : ""}</p>
                    {isLoadingFilter ? <p style={{marginLeft:13, color: "#707070", marginTop: 5, fontFamily: 'Segoe', fontSize: 15}}>Buscando...</p> : ""}
                    {perguntas.length === 0 && !isLoadingFilter?  <p style={{marginLeft:13, color: "#707070", marginTop: 5, fontFamily: 'Segoe'}}>Nada encontrado!</p> : "" }
                    <p style={{marginLeft:13, color: "#707070", marginTop: 0, fontFamily: 'Segoe', fontSize: 15}}>{buscaFiltroTamanho ? `Nº de questões encontradas: ${buscaFiltroTamanho}` : "" }</p>
                  </Container>             
        </Container>
{/* FILTRO ACABA AQUI */}
          <ListaPerguntas zerar={zerarLista} perguntas={perguntas} />
  </Container>
  )
}
