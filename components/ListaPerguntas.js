import {Container, Row,  Button, Form, Modal} from 'react-bootstrap'
import { useState, useEffect } from 'react'


export default function ListaPerguntas ({perguntas}) {
    const [perPage, setPerpage] = useState(10)
    const [page, setPage] = useState(1)
    const totalResults = perguntas.length
    const totalPage = Math.ceil(totalResults / perPage)
    const [previousButton, setPreviousButton] = useState("none")
    const [nextButton, setNextButton] = useState("flex")
    const [resposta, setResposta] = useState("")
    const [resultadoResp1, setResultadoResp1] = useState("")
    const [resultadoResp2, setResultadoResp2] = useState("")
    const [resultadoResp3, setResultadoResp3] = useState("")
    const [resultadoResp4, setResultadoResp4] = useState("")
    const [resultadoResp5, setResultadoResp5] = useState("")
    const [resultadoResp6, setResultadoResp6] = useState("")
    const [resultadoResp7, setResultadoResp7] = useState("")
    const [resultadoResp8, setResultadoResp8] = useState("")
    const [resultadoResp9, setResultadoResp9] = useState("")
    const [resultadoResp10, setResultadoResp10] = useState("")
    const [justi1, setJusti1] = useState("")
    const [justi2, setJusti2] = useState("")
    const [justi3, setJusti3] = useState("")
    const [justi4, setJusti4] = useState("")
    const [justi5, setJusti5] = useState("")
    const [justi6, setJusti6] = useState("")
    const [justi7, setJusti7] = useState("")
    const [justi8, setJusti8] = useState("")
    const [justi9, setJusti9] = useState("")
    const [justi10, setJusti10] = useState("")
    const [color1, setColor1] = useState("")
    const [color2, setColor2] = useState("")
    const [color3, setColor3] = useState("")
    const [color4, setColor4] = useState("")
    const [color5, setColor5] = useState("")
    const [color6, setColor6] = useState("")
    const [color7, setColor7] = useState("")
    const [color8, setColor8] = useState("")
    const [color9, setColor9] = useState("")
    const [color10, setColor10] = useState("")
    const [colorx1, setColorx1] = useState("")
    const [colorx2, setColorx2] = useState("")
    const [colorx3, setColorx3] = useState("")
    const [colorx4, setColorx4] = useState("")
    const [colorx5, setColorx5] = useState("")
    const [colorx6, setColorx6] = useState("")
    const [colorx7, setColorx7] = useState("")
    const [colorx8, setColorx8] = useState("")
    const [colorx9, setColorx9] = useState("")
    const [colorx10, setColorx10] = useState("")
    const [colorBtnJust, setColorBtnJust] = useState("white")
    const [colorBtnJust2, setColorBtnJust2] = useState("white")
    const [colorBtnJust3, setColorBtnJust3] = useState("white")
    const [colorBtnJust4, setColorBtnJust4] = useState("white")
    const [colorBtnJust5, setColorBtnJust5] = useState("white")
    const [colorBtnJust6, setColorBtnJust6] = useState("white")
    const [colorBtnJust7, setColorBtnJust7] = useState("white")
    const [colorBtnJust8, setColorBtnJust8] = useState("white")
    const [colorBtnJust9, setColorBtnJust9] = useState("white")
    const [colorBtnJust10, setColorBtnJust10] = useState("white")

    const [selectedAlter, setSelectedAlter] = useState("")
    const [selectedAlter2, setSelectedAlter2] = useState("")
    const [selectedAlter3, setSelectedAlter3] = useState("")
    const [selectedAlter4, setSelectedAlter4] = useState("")
    const [selectedAlter5, setSelectedAlter5] = useState("")

    const [verificando, setVerificando] = useState(0)
    const [selectedCerto, setSelectedCerto] = useState("")
    const [selectedErrado, setSelectedErrado] = useState("")

    const [retornoResp1, setRetornoResp1] = useState("")
    const [retornoResp2, setRetornoResp2] = useState("")
    const [retornoResp3, setRetornoResp3] = useState("")
    const [retornoResp4, setRetornoResp4] = useState("")
    const [retornoResp5, setRetornoResp5] = useState("")
    const [retornoResp6, setRetornoResp6] = useState("")
    const [retornoResp7, setRetornoResp7] = useState("")
    const [retornoResp8, setRetornoResp8] = useState("")
    const [retornoResp9, setRetornoResp9] = useState("")
    const [retornoResp10, setRetornoResp10] = useState("")

    const [isVisibleJust, setIsVisibleJust] = useState("none")
    const [isVisibleJust2, setIsVisibleJust2] = useState("none")
    const [isVisibleJust3, setIsVisibleJust3] = useState("none")
    const [isVisibleJust4, setIsVisibleJust4] = useState("none")
    const [isVisibleJust5, setIsVisibleJust5] = useState("none")
    const [isVisibleJust6, setIsVisibleJust6] = useState("none")
    const [isVisibleJust7, setIsVisibleJust7] = useState("none")
    const [isVisibleJust8, setIsVisibleJust8] = useState("none")
    const [isVisibleJust9, setIsVisibleJust9] = useState("none")
    const [isVisibleJust10, setIsVisibleJust10] = useState("none")

   
    useEffect(() => {
        if(page > 1) {
            setPreviousButton("flex")
        }
        if(page === 1) {
            setPreviousButton("none")
        }
        if(page === totalPage) {
            setNextButton("none")
        }
  
        if(page < totalPage) {
            setNextButton("flex")
        }
        if(totalPage === 1) {
            setNextButton("none")
        }
    },[page])
    useEffect(() => {
        if(totalPage > 1) {
            setNextButton("flex")
        }
    },[totalResults])
    const handleResp = (respUser) => {

        setResposta(respUser)
    }

    const colorButtonJust = (i) => {
        if(i === 0) {return colorBtnJust}
        if(i === 1) {return colorBtnJust2}
        if(i === 2) {return colorBtnJust3}
        if(i === 3) {return colorBtnJust4}
        if(i === 4) {return colorBtnJust5}
        if(i === 5) {return colorBtnJust6}
        if(i === 6) {return colorBtnJust7}
        if(i === 7) {return colorBtnJust8}
        if(i === 8) {return colorBtnJust9}
        if(i === 9) {return colorBtnJust10}
    }
    const list = {
        update () {
            let _page = page - 1
            let start = _page * perPage
            let end = start + perPage
            const PaginatedItems = perguntas.slice(start,end)
            return (
                <Container >
                    {PaginatedItems.map((item, i) => {
                        localStorage.setItem(`just${i}`, item.justificativa)
                        function zero () {
                            if(page === 1 && i < 9) {
                                return "0" + (i+1)
                            }
                            if(page > 1 && i < 9) {
                                let _page  = page - 1
                                return `${_page}`+(i+1)
                            }
                            if(i <= 9) {
                                return page + "0"
                            }
                       
                        }
                        function letraA () {
                            if(item.a) {
                                return (
                                    <Container style={{display: "flex", flexDirection: "row"}} >
                                    <div><button style={{backgroundColor: verificando === i ? selectedAlter : ""}} className="ContainerAlternativa" 
                                         onClick={() => {
                                            handleResp("a")
                                            setVerificando(i)
                                            setSelectedAlter2("")
                                            setSelectedAlter3("")
                                            setSelectedAlter4("")
                                            setSelectedAlter5("")
                                            setSelectedAlter("#DF9D9C")}}>A
                                        </button></div>
                                        <p align="justify" onClick={() => {
                                            handleResp("a")
                                            setVerificando(i)
                                            setSelectedAlter2("")
                                            setSelectedAlter3("")
                                            setSelectedAlter4("")
                                            setSelectedAlter5("")
                                            setSelectedAlter("#DF9D9C")
                                        }} className="alternativa">{item.a}</p></Container>
                                )
                            }else {
                                return (
                                    <Container style={{display: "flex", flexDirection: "column"}}>
                                        <Container style={{display: "flex", flexDirection: "row", alignItems: "center", justifyItems: "center"}}>
                                            <button style={{backgroundColor: `${selectedCerto.length > 0 ? selectedCerto : ""}`}} onClick={() => {
                                                setSelectedErrado("")
                                                setSelectedCerto("#cb605d")
                                                handleResp('certo')
                                            }} className="ContainerAlternativa"></button> <p onClick={() => {
                                                setSelectedErrado("")
                                                setSelectedCerto("#cb605d")
                                                handleResp('certo')
                                            }}
                                            className="certo-errado" style={{marginTop: 15, marginLeft: 5}}>Certo</p>
                                        </Container>
                                        <Container style={{display: "flex", flexDirection: "row", alignItems: "center", justifyItems: "center"}}>
                                            <button style={{backgroundColor: `${selectedErrado.length > 0 ? selectedErrado : ""}`}}onClick={() => {
                                                setSelectedCerto("")
                                                setSelectedErrado("#cb605d")
                                                handleResp('errado')
                                            }} className="ContainerAlternativa"></button><p onClick={() => {
                                                setSelectedCerto("")
                                                setSelectedErrado("#cb605d")
                                                handleResp('errado')
                                            }}className="certo-errado" style={{marginTop: 15, marginLeft: 5}}>Errado</p>
                                        </Container>
                                    </Container>
                                )
                            }
                        }
                        function letraB () {
                            if(item.b) {
                                return (
                                    <Container style={{display: "flex", flexDirection: "row"}} >
                                    <div><button style={{backgroundColor: verificando === i ? selectedAlter2 : ""}} className="ContainerAlternativa" 
                                    onClick={() => {
                                        handleResp("b")
                                        setVerificando(i)
                                        setSelectedAlter3("")
                                        setSelectedAlter4("")
                                        setSelectedAlter5("")
                                        setSelectedAlter("")
                                        setSelectedAlter2("#DF9D9C")
                                    }}>B</button></div>
                                <p onClick={() => {
                                            handleResp("b")
                                            setVerificando(i)
                                            setSelectedAlter("")
                                            setSelectedAlter3("")
                                            setSelectedAlter4("")
                                            setSelectedAlter5("")
                                            setSelectedAlter2("#DF9D9C")
                                        }} align="justify" className="alternativa">{item.b}</p></Container>
                                )
                            }
                            else {
                                return ""
                            }
                        }
                        function letraD (i) {
                            if(item.d) {
                                return (
                                    <Container style={{display: "flex", flexDirection: "row"}} >
                                        <div><button style={{backgroundColor: verificando === i ? selectedAlter4 : ""}} className="ContainerAlternativa" onClick={() => {
                                    setVerificando(i)
                                    handleResp("d")
                                    setSelectedAlter2("")
                                    setSelectedAlter3("")
                                    setSelectedAlter5("")
                                    setSelectedAlter("")
                                    setSelectedAlter4("#DF9D9C")
                                }}>D</button></div>
                            <p onClick={() => {
                                            handleResp("d")
                                            setVerificando(i)
                                            setSelectedAlter("")
                                            setSelectedAlter2("")
                                            setSelectedAlter3("")
                                            setSelectedAlter5("")
                                            setSelectedAlter4("#DF9D9C")
                                        }} align="justify" className="alternativa">{item.d}</p> </Container>
                                )
                            }else {
                                return ""
                            }
                        }
                        function letraC (i) {
                            if(item.c) {
                                return (
                                    <Container style={{display: "flex", flexDirection: "row"}} >
                                        <div><button style={{backgroundColor: verificando === i ? selectedAlter3 : ""}} className="ContainerAlternativa" onClick={() => {
                                    setVerificando(i)
                                    handleResp("c")
                                    setSelectedAlter2("")
                                    setSelectedAlter4("")
                                    setSelectedAlter5("")
                                    setSelectedAlter("")
                                    setSelectedAlter3("#DF9D9C")
                                }}>C</button></div>
                            <p onClick={() => {
                                            handleResp("c")
                                            setVerificando(i)
                                            setSelectedAlter("")
                                            setSelectedAlter2("")
                                            setSelectedAlter4("")
                                            setSelectedAlter5("")
                                            setSelectedAlter3("#DF9D9C")
                                        }} align="justify" className="alternativa">{item.c}</p> </Container>
                                )
                            }else {
                                return ""
                            }
                        }
                        function letraE (i) {
                            if(item.e) {
                                return (
                                    <Container style={{display: "flex", flexDirection: "row"}} >
                                        <div><button style={{backgroundColor: verificando === i ? selectedAlter5 : ""}} className="ContainerAlternativa" onClick={() => {
                                    setVerificando(i)
                                    handleResp("e")
                                    setSelectedAlter2("")
                                    setSelectedAlter3("")
                                    setSelectedAlter4("")
                                    setSelectedAlter("")
                                    setSelectedAlter5("#DF9D9C")
                                }}> E</button></div>
                           <p onClick={() => {
                                            handleResp("e")
                                            setVerificando(i)
                                            setSelectedAlter("")
                                            setSelectedAlter2("")
                                            setSelectedAlter3("")
                                            setSelectedAlter4("")
                                            setSelectedAlter5("#DF9D9C")
                                        }} align="justify" className="alternativa">{item.e}</p> </Container>
                                )
                            }else {
                                return ""
                            }
                        }
                    return (
                    <Container key={i}>
                        <Container className="questao"> <p className="questaoTitle">Questão {zero()}</p></Container>
                            <Row className="ContainerDescPergunta">
                                <p align="justify" style={{fontFamily: 'Segoe   ', fontSize: 15, color: "#808080", marginLeft: 1}}>
                                    <b>Id:</b> {item.idQuestion}&nbsp; <b> Instituição:</b> {item.instituição}&nbsp;&nbsp; <b> Informativo:</b> {item.informativo} 
                                    &nbsp;&nbsp;<b> Matéria:</b> {item.materia.map((element,i) => {
                                        if(i === 0) {
                                            if(item.materia.length === 1) {
                                                return `${element}`
                                            }
                                         return `${element},`
                                        }else {
                                            return ` ${element}`
                                        }
                                        
                                    })}
                                    &nbsp;&nbsp;<b> Tema: </b> {item.tema.map((element,i) => {
                                        if(i === 0) {
                                            if(item.tema.length === 1) {
                                                return `${element}`
                                            }
                                         return `${element},`
                                        }else {
                                            return ` ${element}`
                                        }
                                        
                                    })}
                                </p>
                                {/* <div style={{display: "flex", flexDirection: "row", height:20}}><p className="descPergunta">Id:</p> <p className="dataPerguntaAll">{item.idQuestion}</p></div>
                                <div style={{display: "flex", flexDirection: "row", height:20}}><p className="descPergunta">Instituição:</p> <p className="dataPerguntaAll">{item.instituição}</p></div>
                                <div style={{display: "flex", flexDirection: "row", height:20}}><p className="descPergunta">Informativo:</p> <p className="dataPerguntaAll">{item.informativo}</p></div>
                                <div className="mat-info"> 
                                <p align="justify">
                                <p className="descMat">Matéria:</p>{item.materia.map((element, i) => {
                                    if(i === 0) {
                                        if(item.materia.length === 1) {
                                            return <p className="dataMateria">{element}</p>
                                        }
                                        return <p className="dataMateria">{element},</p>
                                    }else {
                                        return <p className="dataMateria">{element}</p>
                                    }
                                })}</p>
                                </div>
                                <div style={{display: "flex", flexWrap: 'wrap',height:"auto"}}>
                                    <p className="descPergunta">Tema:</p> <p className="dataPerguntaAll">{item.tema.map((element) => {
                                        if(i === 0) {
                                            if(item.tema.length === 1) {
                                                return ` ${element}`
                                            }
                                            return ` ${element},`
                                        }else {
                                            return ` ${element}`
                                        }
                                    })}</p>
                                </div> */}
                            </Row>
                            <p align="justify" className="TitlePergunta">{item.pergunta}</p>
                        <Container>
                            <ul>
                            {letraA()}
                            {letraB()}
                            {letraC(i)}
                            {letraD(i)}
                            {letraE(i)}
                            </ul>
                        </Container>
                        {CondicaoResp(i)}
                        <Container style={{display: "flex", flexDirection: "column", marginLeft: 5, marginTop: -20}} >
                            <Button className="btnResponder"  
                            onClick={() => verificarQuestao(item.resp, resposta, i)} type="submit">
                                <p style={{color: "white", fontFamily: "Segoe", fontWeight: "bold", marginTop:1, fontSize: 15, opacity: 0.9}}>RESPONDER</p>
                            </Button>
                            <Button onClick={() => {
                                
                               if(i === 0) {
                                   if(justi1.length > 0) {
                                       setJusti1("")
                                       setIsVisibleJust("none")
                                       setColorBtnJust("white")
                                   }else {
                                       setColorBtnJust("#93acc4")
                                       setJusti1(item.justificativa)
                                       setIsVisibleJust("flex")
                                   }
                               }
                               if(i === 1) {
                                if(justi2.length > 0) {
                                    setJusti2("")
                                    setIsVisibleJust2("none")
                                    setColorBtnJust2("white")
                                }else {
                                    setJusti2(item.justificativa)
                                    setIsVisibleJust2("flex")
                                    setColorBtnJust2("#93acc4")
                                }
                            }
                            if(i === 2) {
                                if(justi3.length > 0) {
                                    setIsVisibleJust3("none")
                                    setJusti3("")
                                    setColorBtnJust3("white")
                                }else {
                                    setJusti3(item.justificativa)
                                    setIsVisibleJust3("flex")
                                    setColorBtnJust3("#93acc4")
                                }
                            }
                            if(i === 3) {
                                if(justi4.length > 0) {
                                    setJusti4("")
                                    setIsVisibleJust4("none")
                                    setColorBtnJust4("white")
                                }else {
                                    setJusti4(item.justificativa)
                                    setIsVisibleJust4("flex")
                                    setColorBtnJust4("#93acc4")
                                }
                            }
                            if(i === 4) {
                                if(justi5.length > 0) {
                                    setJusti5("")
                                    setIsVisibleJust5("none")
                                    setColorBtnJust5("white")
                                }else {
                                    setJusti5(item.justificativa)
                                    setIsVisibleJust5("flex")
                                    setColorBtnJust5("#93acc4")
                                }
                            }
                            if(i === 5) {
                                if(justi6.length > 0) {
                                    setJusti6("")
                                    setIsVisibleJust6("none")
                                    setColorBtnJust5("white")
                                }else {
                                    setJusti6(item.justificativa)
                                    setIsVisibleJust6("flex") 
                                    setColorBtnJust6("#93acc4")                               }
                            }
                            if(i === 6) {
                                if(justi7.length > 0) {
                                    setJusti7("")
                                    setIsVisibleJust7("none")
                                    setColorBtnJust7("white")
                                }else {
                                    setJusti7(item.justificativa)
                                    setIsVisibleJust7("flex")
                                    setColorBtnJust7("#93acc4")
                                }
                            }
                            if(i === 7) {
                                if(justi8.length > 0) {
                                    setJusti8("")
                                    setIsVisibleJust8("none")
                                    setColorBtnJust8("white")

                                }else {
                                    setJusti8(item.justificativa)
                                    setIsVisibleJust8("flex")
                                    setColorBtnJust8("#93acc4")
                                }
                            }
                            if(i === 8) {
                                if(justi9.length > 0) {
                                    setJusti9("")
                                    setIsVisibleJust9("none")
                                    setColorBtnJust9("white")
                                }else {
                                    setJusti9(item.justificativa)
                                    setIsVisibleJust9("flex")
                                    setColorBtnJust9("#93acc4")
                                }
                            }
                            if(i === 9) {
                                if(justi10.length > 0) {
                                    setJusti10("")
                                    setIsVisibleJust10("none")
                                    setColorBtnJust10("white")
                                }else {
                                    setJusti10(item.justificativa)
                                    setIsVisibleJust10("flex")
                                    setColorBtnJust10("#93acc4")
                                }
                            }
                                
                            }} style={{backgroundColor: `${colorButtonJust(i)}`}} className="btnVisuJust" > 
                            <p style={{color: "#bd3330", fontFamily: "Segoe", fontWeight: "bold", marginTop:5, fontSize: 14}}>VISUALIZAR JUSTIFICATIVA</p>
                            </Button>
                          
                            </Container>
                            {CondicaoJust(i)}
                            <div className="separadorQuestão"></div>     
                    </Container>
                )
            })}
                </Container>
            )
        }
    }
    const controls  = {
        next () {
            setPage((prevState) => prevState + 1)
            window.scrollTo(0,0)
        },
        previous () {
            if(page === 1) {

            }else {
                setPage((prevState) => prevState - 1)
            }
            window.scrollTo(0,0)
        }
    }

    const verificarQuestao = (resp, respForm, i) => {
        if(resp == respForm) {
            if(i === 0) {
                setResultadoResp1("Resposta Correta!")
                setColor1("green")
            }
            if(i === 1) {
                setResultadoResp2("Resposta Correta!")
                setColor2("green")
            }
            if(i === 2) {
                setResultadoResp3("Resposta Correta!")
                setColor3("green")
            }
            if(i === 3) {
                setResultadoResp4("Resposta Correta!")
                setColor4("green")
            }
            if(i === 4) {
                setResultadoResp5("Resposta Correta!")
                setColor5("green")
            }
            if(i === 5) {
                setResultadoResp6("Resposta Correta!")
                setColor6("green")
            }
            if(i === 6) {
                setResultadoResp7("Resposta Correta!")
                setColor7("green")
            }
            if(i === 7) {
                setResultadoResp8("Resposta Correta!")
                setColor8("green") 
            }
            if(i === 8) {
                setResultadoResp9("Resposta Correta!")
                setColor9("green")
            }
            if(i === 9) {
                setResultadoResp10("Resposta Correta!")
                setColor10("green")
            }

            
        }else {
            
            if(i === 0) {
                setResultadoResp1(`Resposta Errada!`)
                setRetornoResp1(`Resposta correta: ${resp.toUpperCase()}`)
                setColorx1("red")
            }
            if(i === 1) {
                setResultadoResp2(`Resposta Errada!`)
                setRetornoResp2(`Resposta correta: ${resp.toUpperCase()}`)
                setColorx2("red")
            }
            if(i === 2) {
                setResultadoResp3(`Resposta Errada!`)
                setRetornoResp3(`Resposta correta: ${resp.toUpperCase()}`)
                setColorx3("red")
            }
            if(i === 3) {
                setResultadoResp4(`Resposta Errada!`)
                setRetornoResp4(`Resposta correta: ${resp.toUpperCase()}`)
                setColorx4("red")
            }
            if(i === 4) {
                setResultadoResp5(`Resposta Errada!`)
                setRetornoResp5(`Resposta correta: ${resp.toUpperCase()}`)
                setColorx5("red")
            }
            if(i === 5) {
                setResultadoResp6(`Resposta Errada!`)
                setRetornoResp6(`Resposta correta: ${resp.toUpperCase()}`)
                setColorx6("red")
            }
            if(i === 6) {
                setResultadoResp7(`Resposta Errada!`)
                setRetornoResp7(`Resposta correta: ${resp.toUpperCase()}`)
                setColorx7("red")
            }
            if(i === 7) {
                setResultadoResp8(`Resposta Errada!`)
                setRetornoResp8(`Resposta correta: ${resp.toUpperCase()}`)
                setColorx8("red")
            }
            if(i === 8) {
                setResultadoResp9(`Resposta Errada!`)
                setRetornoResp9(`Resposta correta: ${resp.toUpperCase()}`)
                setColorx9("red")
            }
            if(i === 9) {
                setResultadoResp10(`Resposta Errada!`)
                setRetornoResp10(`Resposta correta: ${resp.toUpperCase()}`)
                setColorx10("red")
            }
        }
    }
    const CondicaoResp = (i) => {
        if(i === 0) {
            return (
                <div>
                    <p style={{color: `${resultadoResp1 === "Resposta Correta!" ? color1 : colorx1}`, fontWeight: "bold"}}>{resultadoResp1}</p>
                    <p style={{fontWeight: "bold"}}>{retornoResp1}</p>
                </div>
            )
        }
        if(i === 1) {
            return (
                <div>
                    <p style={{color: `${resultadoResp2 === "Resposta Correta!" ? color2 : colorx2}`, fontWeight: "bold"}}>{resultadoResp2}</p>
                    <p style={{fontWeight: "bold"}}>{retornoResp2}</p>
                </div>
            )
        }
        if(i === 2) {
            return (
                <div>
                    <p style={{color: `${resultadoResp3 === "Resposta Correta!" ? color3 : colorx3}`, fontWeight: "bold"}}>{resultadoResp3}</p>
                    <p style={{fontWeight: "bold"}}>{retornoResp3}</p>
                </div>
            )
        }
        if(i === 3) {
            return (
                <div>
                    <p style={{color: `${resultadoResp4 === "Resposta Correta!" ? color4 : colorx4}`, fontWeight: "bold"}}>{resultadoResp4}</p>
                    <p style={{fontWeight: "bold"}}>{retornoResp4}</p>
                </div>
            )
        }
        if(i === 4) {
            return (
                <div>
                    <p style={{color: `${resultadoResp5 === "Resposta Correta!" ? color5 : colorx5}`, fontWeight: "bold"}}>{resultadoResp5}</p>
                    <p style={{fontWeight: "bold"}}>{retornoResp5}</p>
                </div>
            )
        }
        if(i === 5) {
            return (
                <div>
                    <p style={{color: `${resultadoResp6 === "Resposta Correta!" ? color6 : colorx6}`, fontWeight: "bold"}}>{resultadoResp6}</p>
                    <p style={{fontWeight: "bold"}}>{retornoResp6}</p>
                </div>
            )
        }
        if(i === 6) {
            return (
                <div>
                    <p style={{color: `${resultadoResp7 === "Resposta Correta!" ? color7 : colorx7}`, fontWeight: "bold"}}>{resultadoResp7}</p>
                    <p style={{fontWeight: "bold"}}>{retornoResp7}</p>
                </div>
            )
        }
        if(i === 7) {
            return (
                <div>
                    <p style={{color: `${resultadoResp8 === "Resposta Correta!" ? color8 : colorx8}`, fontWeight: "bold"}}>{resultadoResp8}</p>
                    <p style={{fontWeight: "bold"}}>{retornoResp8}</p>
                </div>
            )
        }
        if(i === 8) {
            return (
                <div>
                    <p style={{color: `${resultadoResp9 === "Resposta Correta!" ? color9 : colorx9}`, fontWeight: "bold"}}>{resultadoResp9}</p>
                    <p style={{fontWeight: "bold"}}>{retornoResp9}</p>
                </div>
            )
        }
        if(i === 9) {
            return (
                <div>
                    <p style={{color: `${resultadoResp10 === "Resposta Correta!" ? color10 : colorx10}`, fontWeight: "bold"}}>{resultadoResp10}</p>
                    <p style={{fontWeight: "bold"}}>{retornoResp10}</p>
                </div>
            )
        }
    }
    const CondicaoJust = (i) => {
        if(i === 0) {
            return ( 
                <Container style={{display: `${isVisibleJust}`}} className="containerJust"><p align="justify" className="textJust">{justi1}</p></Container>
            )
        }
        if(i === 1) {
            return (
                <div style={{display: `${isVisibleJust2}`}} className="containerJust"><p align="justify" className="textJust">{justi2}</p></div>
            )
        }
        if(i === 2) {
            return (
                <div style={{display: `${isVisibleJust3}`}}  className="containerJust"><p align="justify" className="textJust">{justi3}</p></div>
            )
        }
        if(i === 3) {
            return (
                <div style={{display: `${isVisibleJust4}`}}  className="containerJust"><p align="justify" className="textJust">{justi4}</p></div>
            )
        }
        if(i === 4) {
            return (
                <div style={{display: `${isVisibleJust5}`}} className="containerJust"><p align="justify" className="textJust">{justi5}</p></div>
            )
        }
        if(i === 5) {
            return (
                <div style={{display: `${isVisibleJust6}`}} className="containerJust"><p align="justify" className="textJust">{justi6}</p></div>
            )
        }
        if(i === 6) {
            return (
                <div style={{display: `${isVisibleJust7}`}} className="containerJust"><p align="justify" className="textJust">{justi7}</p></div>
            )
        }
        if(i === 7) {
            return (
                <div style={{display: `${isVisibleJust8}`}} className="containerJust"><p align="justify" className="textJust">{justi8}</p></div>
            )
        }
        if(i === 8) {
            return (
                <div style={{display: `${isVisibleJust9}`}} className="containerJust"><p align="justify" className="textJust">{justi9}</p></div>
            )
        }
        if(i === 9) {
            return (
                <div style={{display: `${isVisibleJust10}`}} className="containerJust"><p align="justify" className="textJust">{justi10}</p></div>
            )
        }
        
    }

    return (
        <Container>
            <Row >
            {list.update()}
            </Row>
            <Container className="paginacao">
                <Row style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                <Button onClick={() => controls.previous()}  style={{backgroundColor: "transparent", border: "none", display: `${previousButton}`}}><img width="25" height="25" src="/previous.png" /></Button>
                <p className="paginaAtual">{page}</p>
                <Button onClick={() => controls.next()} style={{backgroundColor: "transparent", border: "none", display: `${nextButton}`}}> <img width="25" height="25" src="/next.png" /> </Button>
                </Row>
            </Container>
            <Container > <p className="totalPaginas">Total de paginas: {totalPage}</p></Container>
        </Container>
    )
}
