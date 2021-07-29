

import Head from 'next/head'
import {Container, Form, Button} from 'react-bootstrap'
import axios from 'axios'
import { useState, useEffect } from 'react'
import Select from 'react-select'
import CheckBox from '../components/CheckBox'   
import pdfMake from "pdfmake/build/pdfmake"
import pdfFonts from "pdfmake/build/vfs_fonts"
pdfMake.vfs = pdfFonts.pdfMake.vfs

export default function Home() {
  const optsInst = [{label: "STF", value:"STF"}, {label: "STJ", value:"STJ"}]
  const [perguntas, setPerguntas] = useState([])

  //FILTRO
    const [mat, setMat] = useState([])
    const [inst, setInst] = useState([])
    const [info, setInfo] = useState([])
    const [infoInit, setInfoInit] = useState(0)
    const [infoEnd, setInfoEnd] = useState(0)
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
    

    async function FiltroPerguntas (mat,inst,info, temas, tipoCE, tipoME, infoInit, infoEnd) {
      
      let arr = []
      arr.push(infoInit)
      arr.push(infoEnd)
        setPerguntas([])
        setBuscaFiltroTamanho(null)
        setIsLoadingFilter(true)
        const data = await axios.post('/api/filtro', {
            "mat": mat,
            "inst": inst,
            "info": `${infoInit === 0 && infoEnd === 0 ? "" : arr}`,
            "temas": temas,
            "tipoCE": tipoCE,
            "tipoME": tipoME
        })
        console.log(data)
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
          primary25: '#B0C4DE',
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
    const gabarito = (data) => {
        let arraygabarito = []
        let arrResp = []
        let start = 0
        let end  = 10
        let contador = 1
        let somador = 0
        const perColunm = 10
        const totalColunms = Math.ceil(buscaFiltroTamanho / perColunm)
        for(let i = 0; i < totalColunms; i++) {

            const arrColunm = data.slice(start,end)
          
            if(contador === 1) {
                arrColunm.map((element, index) => {
                    arrResp.push(`${index < 9 ? "0"+ `${index + 1}` : `${index + 1}` }` + ")" + " - " + element.resp.toUpperCase())
                })
                
            }
            if(contador > 1) {
                arrColunm.map((element, index) => {
                   
                    arrResp.push(`${index+1 + somador}` + ")" + " - " + element.resp.toUpperCase())
                })
            } 
            contador = contador + 1
            somador = somador + 10
            arraygabarito.push(arrResp)
            arrResp = []
            start = start + 10
            end = end + 10
        }
        
        function returnGabarito () {
            let arr = []
            arraygabarito.map((element) => arr.push(element))
            return [arr]
        }

        return {style: 'tableStyle',table: {body: returnGabarito() } }
    }
  return (
    <Container style={{padding: 0, margin: 0, display: "flex", flexDirection: "column"}} fluid="true">
      <Head>
        <title>GERAR PDF</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"
          integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l"
          crossorigin="anonymous"/>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet" />
      </Head>
      {/* FILTRO COMEÇA AQUI */}
      <Container className="content-filters">
      <p className="filtername">FILTRO </p>
                <Container >
                 {/* CONTAINER INFO INICIAL E FINAL ///////////// C.E E M.E */}
                  <Container className="content-info">
                    <Form.Group>
                          <Form.Row>
                            <Select value={infoInit} placeholder={infoInit ? `Informativo inicial: ${infoInit}` : "Informativo inicial"} onChange={(value) => {
                                setVerific(1)
                                setInfoFinalDisable(false)
                                setInfoInit(value.value)
                                setInfoEnd(null)
                                setInfoFinalArray([])
                                const posicao = informativos.findIndex(element => element.value === value.value)
                                const infoCut = informativos.slice(posicao + 1)
                                infoCut.map((element) => setInfoFinalArray((prevState) => [...prevState, element]))
                            }} styles={{dropdownIndicator: dropdownIndicatorStyles}} theme={customTheme} className="input-infos" options={informativos} />

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
                              <CheckBox isChecked={isCheckedCe}/> <Form.Label style={{marginTop: 10}}> C/E</Form.Label>
                            </div>

                            <div style={{display: "flex", flexDirection: "row", marginLeft: 15}} onClick={() => {
                              isCheckedMe ? setIsCheckedMe(false) : setIsCheckedMe(true)
                              if(tipoME == null)  {
                                setTipoME(1)
                              }else {
                                setTipoME(null)
                              }
                              }}>
                              <CheckBox isChecked={isCheckedMe} /> <Form.Label style={{marginTop: 10}}>Múltipla escolha</Form.Label>
                            </div>
                          </div>
                          

                          </Form.Row>
                    </Form.Group>
              </Container>
            {/* FIMMMMMMMMMMMMMMMMMMMMM INFO INICIAL FINAL C.E M.E */}
                  <Container  className="content-selects-filters" >
                    {/* <Form.Group > */}
                        <Form.Row>
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
                <Container style={{display:"flex", flexDirection: "row", marginLeft: -5}}>
                    <Button className="btnFilter"  onClick={(event) => {
                    event.preventDefault()
                    if(mat.length > 0 ||  inst.length > 0  || infoInit.length > 0  ||  infoEnd.length > 0  || tema.length > 0 || tipoCE !== null || tipoME !== null)
                    {
                        FiltroPerguntas(mat,inst,info, tema, tipoCE, tipoME, infoInit, infoEnd)
                    }else 
                    {
                        setAnyFilter(true)
                    }
                    }}> <p style={{fontSize: 15,fontWeight: "bold", margintTop: 50}}>BUSCAR</p></Button>
                    <Button className="btnLimpar"  variant="danger" onClick={() => cleanFilters()}> <p style={{fontSize: 15,fontWeight: "bold"}}>
                    LIMPAR
                    </p>
                    </Button>
                </Container>
                <Button className="btnGerarPDF"  variant="success" onClick={() => {
                    const docDefinition = {
                        // header: [
                        //     {columns: [
                        //     {text: 'www.questaodeinformativo.com.br', alignment: 'left', margin: [45,10,0,0]}, 
                        //     {text: `Nº de questões: ${buscaFiltroTamanho}`, alignment: 'right', margin: [0,10,50,0]},
                        //     ]},
                        //     {text:'______________________________________________________________________________________________', 
                        //     style: 'barraHeader',margin: [45,0,10,0]}],
                        pageSize: 'A4',
                        content:[{columns: [
                            {text: 'www.questaodeinformativo.com.br', alignment: 'left', margin: [15,10,0,0]}, 
                            {text: `Nº de questões: ${buscaFiltroTamanho}`, alignment: 'right', margin: [0,10,50,0]},
                            ]},
                            {text:'_______________________________________________________________________________________________', 
                            style: 'barraHeader',margin: [1,0,1,5]},
                            {columns: [
                                {image: 'direito',width: 100, heigth: 120, margin: [0,15,0,0]},
                                {text:'QUESTÕES DE INFORMATIVO', style: 'titlePDF',margin:[0,30,0,0]}
                            ]},
                            {text:'_______________________________________________________________________________________________', style: 'barraHeader',margin: [1,0,1,15]},
                            perguntas.map((element, i) =>  {
                                if(element.a) {
                                    return [
                                        { text: `${i+1}) ${element.pergunta}`, alignment: 'justify', margin:[0,0,0,20]}, 
                                        {text: `A) ${element.a}`,alignment: 'justify', margin:[0,0,0,10] },
                                        {text: `B) ${element.b}`,alignment: 'justify', margin:[0,0,0,10] },
                                        {text: `C) ${element.c}`,alignment: 'justify', margin:[0,0,0,10] },
                                        {text: `D) ${element.d}`,alignment: 'justify', margin:[0,0,0,10] },
                                        {text: `${element.e ? "E)" + element.e : ""}`,alignment: 'justify', margin:[0,0,0,5] },
                                        {text:'______________________________________________________________________________________________', style: 'barraPergunta',margin: [0,0,0,25]}

                                    ]
                                }else {
                                    return [
                                    { text: `${i+1}) ${element.pergunta}`, alignment: 'justify', margin:[0,0,0,10]}, 
                                    {text: 'A) Certo', margin:[0,0,0,20] }, {text: 'B) Errado', margin:[0,0,0,5]},
                                    {text:'______________________________________________________________________________________________', style: 'barraPergunta', margin: [0,0,0,25]}]
                                }
                            }),
                            //gabarito

                            [{columns: [
                                {text: 'www.questaodeinformativo.com.br', alignment: 'left', margin: [15,10,0,0], pageBreak: 'before'}, 
                                {text: `Nº de questões: ${buscaFiltroTamanho}`, alignment: 'right', margin: [0,10,50,0], pageBreak: 'before'},
                                ]},
                                {text:'_______________________________________________________________________________________________', 
                                style: 'barraHeader',margin: [1,0,1,5]},
                                {columns: [
                                    {image: 'direito',width: 100, heigth: 120, margin: [0,15,0,0]},
                                    {text:'QUESTÕES DE INFORMATIVO', style: 'titlePDF',margin:[0,30,0,0]}
                                ]},
                                {text:'_______________________________________________________________________________________________', style: 'barraHeader',margin: [1,0,1,15]},
                                {text: 'Gabarito', style: 'titleGabarito'},
                                // perguntas.map((element, i) => {
                                    
                                //     if(i < 9) {
                                //         return [
                                //             {text: `0${i+1} -  ${element.resp}`}
                                //         ]
                                //     }
                                //     if(i >= 9 ) {
                                //         return [
                                //             {text: `${i+1} - ${element.resp}`}
                                //         ]
                                //     }
                                // })
                                gabarito(perguntas)
                            ], 
                            ///footer
                            // {
                            //     columns: [
                            //         {image:'snow', width: 10, heigth: 10, margin:[10,0,0,0], link: 'https://www.instagram.com/_questaodeinformativo_/'}, {
                            //          text: '@nomeInstagram', style: 'nomeinsta', margin:[15,5,0,0], link: 'https://www.instagram.com/_questaodeinformativo_/'}
                            //     ]}
                                ],
                        footer: {
                            columns: [
                                {image:'snow', width: 15, heigth: 15, margin:[5,23,5,0]}, {
                                 text: '@nomeInstagram', style: 'nomeinsta', margin:[10,25,0,0]}
                            ]},
                        images: {
                            snow: 'https://image.flaticon.com/icons/png/512/1384/1384031.png',
                            direito: 'https://i.imgur.com/x49W1o4.png'
                        },
                        styles: {
                             barraHeader: {
                                 bold: true
                            },
                            titlePDF: {
                                fontSize: 30,
                                bold: true
                            },
                            barraPergunta: {
                                color: "#A9A9A9"
                            },
                            nomeinsta: {
                                fontSize: 10,
                                bold: true,
                                color: "#A9A9A9"
                            },
                            titleGabarito: {
                                fontSize: 20,
                                margin: [0,0,0,10]
                            },
                            tableStyle: {
                              margin: [10,25,0,0]
                            }
                        }
                    }
                    pdfMake.createPdf(docDefinition).open()
                }}> 
                    <p style={{fontSize: 15,fontWeight: "bold"}}>
                        GERAR PDF
                     </p>
                </Button>
                <p style={{marginLeft:13,fontWeight: "bold", color: "red", marginTop: 6}}>{anyFilter ? "Selecione algum filtro." : ""}</p>
                <p style={{marginLeft:13, fontWeight: "bold", marginTop: 5}}>{buscaFiltroTamanho ? `${buscaFiltroTamanho} questões foram encontradas.` : "" }</p>
            </Container>     
        </Container>
{/* FILTRO ACABA AQUI */}
      
  </Container>
  )
}
