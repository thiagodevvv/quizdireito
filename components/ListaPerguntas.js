import {Container, Row,  Button} from 'react-bootstrap'
import { useState, useEffect } from 'react'

export default function ListaPerguntas ({zerarLista,perguntas}) {
    const [perPage, setPerpage] = useState(10)
    const [page, setPage] = useState(1)
    const totalResults = perguntas.length
    const totalPage = Math.ceil(totalResults / perPage)
    const [previousButton, setPreviousButton] = useState("none")
    const [nextButton, setNextButton] = useState("flex")
    const [resposta, setResposta] = useState("")
    const [resposta2, setResposta2] = useState("")
    const [resposta3, setResposta3] = useState("")
    const [resposta4, setResposta4] = useState("")
    const [resposta5, setResposta5] = useState("")
    const [resposta6, setResposta6] = useState("")
    const [resposta7, setResposta7] = useState("")
    const [resposta8, setResposta8] = useState("")
    const [resposta9, setResposta9] = useState("")
    const [resposta10, setResposta10] = useState("")
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

    //A
    const [colorSelected, setColorSelected] = useState("")
    const [colorSelected2, setColorSelected2] = useState("")
    const [colorSelected3, setColorSelected3] = useState("")
    const [colorSelected4, setColorSelected4] = useState("")
    const [colorSelected5, setColorSelected5] = useState("")
    const [colorSelected6, setColorSelected6] = useState("")
    const [colorSelected7, setColorSelected7] = useState("")
    const [colorSelected8, setColorSelected8] = useState("")
    const [colorSelected9, setColorSelected9] = useState("")
    const [colorSelected10, setColorSelected10] = useState("")
    //B
    const [colorSelectedB, setColorSelectedB] = useState("")
    const [colorSelectedB2, setColorSelectedB2] = useState("")
    const [colorSelectedB3, setColorSelectedB3] = useState("")
    const [colorSelectedB4, setColorSelectedB4] = useState("")
    const [colorSelectedB5, setColorSelectedB5] = useState("")
    const [colorSelectedB6, setColorSelectedB6] = useState("")
    const [colorSelectedB7, setColorSelectedB7] = useState("")
    const [colorSelectedB8, setColorSelectedB8] = useState("")
    const [colorSelectedB9, setColorSelectedB9] = useState("")
    const [colorSelectedB10, setColorSelectedB10] = useState("")
    //C
    const [colorSelectedC, setColorSelectedC] = useState("")
    const [colorSelectedC2, setColorSelectedC2] = useState("")
    const [colorSelectedC3, setColorSelectedC3] = useState("")
    const [colorSelectedC4, setColorSelectedC4] = useState("")
    const [colorSelectedC5, setColorSelectedC5] = useState("")
    const [colorSelectedC6, setColorSelectedC6] = useState("")
    const [colorSelectedC7, setColorSelectedC7] = useState("")
    const [colorSelectedC8, setColorSelectedC8] = useState("")
    const [colorSelectedC9, setColorSelectedC9] = useState("")
    const [colorSelectedC10, setColorSelectedC10] = useState("")
    //D
    const [colorSelectedD, setColorSelectedD] = useState("")
    const [colorSelectedD2, setColorSelectedD2] = useState("")
    const [colorSelectedD3, setColorSelectedD3] = useState("")
    const [colorSelectedD4, setColorSelectedD4] = useState("")
    const [colorSelectedD5, setColorSelectedD5] = useState("")
    const [colorSelectedD6, setColorSelectedD6] = useState("")
    const [colorSelectedD7, setColorSelectedD7] = useState("")
    const [colorSelectedD8, setColorSelectedD8] = useState("")
    const [colorSelectedD9, setColorSelectedD9] = useState("")
    const [colorSelectedD10, setColorSelectedD10] = useState("")
    ///E
    const [colorSelectedE, setColorSelectedE] = useState("")
    const [colorSelectedE2, setColorSelectedE2] = useState("")
    const [colorSelectedE3, setColorSelectedE3] = useState("")
    const [colorSelectedE4, setColorSelectedE4] = useState("")
    const [colorSelectedE5, setColorSelectedE5] = useState("")
    const [colorSelectedE6, setColorSelectedE6] = useState("")
    const [colorSelectedE7, setColorSelectedE7] = useState("")
    const [colorSelectedE8, setColorSelectedE8] = useState("")
    const [colorSelectedE9, setColorSelectedE9] = useState("")
    const [colorSelectedE10, setColorSelectedE10] = useState("")

    //CERTO
    const [colorCerto, setColorCerto] = useState("")
    const [colorCerto2, setColorCerto2] = useState("")
    const [colorCerto3, setColorCerto3] = useState("")
    const [colorCerto4, setColorCerto4] = useState("")
    const [colorCerto5, setColorCerto5] = useState("")
    const [colorCerto6, setColorCerto6] = useState("")
    const [colorCerto7, setColorCerto7] = useState("")
    const [colorCerto8, setColorCerto8] = useState("")
    const [colorCerto9, setColorCerto9] = useState("")
    const [colorCerto10, setColorCerto10] = useState("")
    //ERRADO
    const [colorErrado, setColorErrado] = useState("")
    const [colorErrado2, setColorErrado2] = useState("")
    const [colorErrado3, setColorErrado3] = useState("")
    const [colorErrado4, setColorErrado4] = useState("")
    const [colorErrado5, setColorErrado5] = useState("")
    const [colorErrado6, setColorErrado6] = useState("")
    const [colorErrado7, setColorErrado7] = useState("")
    const [colorErrado8, setColorErrado8] = useState("")
    const [colorErrado9, setColorErrado9] = useState("")
    const [colorErrado10, setColorErrado10] = useState("")


    const colorAlters = (i,assertiva) => {
        
        if(i === 0) {
            if(assertiva === 'a') {return colorSelected}
            if(assertiva === 'b') {return colorSelectedB}
            if(assertiva === 'c') {return colorSelectedC}
            if(assertiva === 'd') {return colorSelectedD}
            if(assertiva === 'e') {return colorSelectedE}
        }
        if(i === 1) {
            if(assertiva === 'a') {return colorSelected2}
            if(assertiva === 'b') {return colorSelectedB2}
            if(assertiva === 'c') {return colorSelectedC2}
            if(assertiva === 'd') {return colorSelectedD2}
            if(assertiva === 'e') {return colorSelectedE2}
        }
        if(i === 2) {
            if(assertiva === 'a') {return colorSelected3}
            if(assertiva === 'b') {return colorSelectedB3}
            if(assertiva === 'c') {return colorSelectedC3}
            if(assertiva === 'd') {return colorSelectedD3}
            if(assertiva === 'e') {return colorSelectedE3}
        }
        ///
        if(i === 3) {
            if(assertiva === 'a') {return colorSelected4}
            if(assertiva === 'b') {return colorSelectedB4}
            if(assertiva === 'c') {return colorSelectedC4}
            if(assertiva === 'd') {return colorSelectedD4}
            if(assertiva === 'e') {return colorSelectedE4}
        }
        if(i === 4) {
            if(assertiva === 'a') {return colorSelected5}
            if(assertiva === 'b') {return colorSelectedB5}
            if(assertiva === 'c') {return colorSelectedC5}
            if(assertiva === 'd') {return colorSelectedD5}
            if(assertiva === 'e') {return colorSelectedE5}
        }
        //
        if(i === 5) {
            if(assertiva === 'a') {return colorSelected6}
            if(assertiva === 'b') {return colorSelectedB6}
            if(assertiva === 'c') {return colorSelectedC6}
            if(assertiva === 'd') {return colorSelectedD6}
            if(assertiva === 'e') {return colorSelectedE6}
        }
        if(i === 6) {
            if(assertiva === 'a') {return colorSelected7}
            if(assertiva === 'b') {return colorSelectedB7}
            if(assertiva === 'c') {return colorSelectedC7}
            if(assertiva === 'd') {return colorSelectedD7}
            if(assertiva === 'e') {return colorSelectedE7}
        }
        //
        if(i === 7) {
            if(assertiva === 'a') {return colorSelected8}
            if(assertiva === 'b') {return colorSelectedB8}
            if(assertiva === 'c') {return colorSelectedC8}
            if(assertiva === 'd') {return colorSelectedD8}
            if(assertiva === 'e') {return colorSelectedE8}
        }
        if(i === 8) {
            if(assertiva === 'a') {return colorSelected9}
            if(assertiva === 'b') {return colorSelectedB9}
            if(assertiva === 'c') {return colorSelectedC9}
            if(assertiva === 'd') {return colorSelectedD9}
            if(assertiva === 'e') {return colorSelectedE9}
        }
        if(i === 9) {
            if(assertiva === 'a') {return colorSelected10}
            if(assertiva === 'b') {return colorSelectedB10}
            if(assertiva === 'c') {return colorSelectedC10}
            if(assertiva === 'd') {return colorSelectedD10}
            if(assertiva === 'e') {return colorSelectedE10}
        }        
    }
    const colorCEME = (i, assertiva) => {
        if(i === 0) {
            if(assertiva === 'certo') {return colorCerto }
            if(assertiva === 'errado') {return colorErrado }
        }
        if(i === 1) {
            if(assertiva === 'certo') {return colorCerto2 }
            if(assertiva === 'errado') {return colorErrado2 }
        }
        if(i === 2) {
            if(assertiva === 'certo') {return colorCerto3 }
            if(assertiva === 'errado') {return colorErrado3 }
        }
        if(i === 3) {
            if(assertiva === 'certo') {return colorCerto4 }
            if(assertiva === 'errado') {return colorErrado4}
        }
        if(i === 4) {
            if(assertiva === 'certo') {return colorCerto5 }
            if(assertiva === 'errado') {return colorErrado5 }
        }
        if(i === 5) {
            if(assertiva === 'certo') {return colorCerto6 }
            if(assertiva === 'errado') {return colorErrado6 }
        }
        if(i === 6) {
            if(assertiva === 'certo') {return colorCerto7 }
            if(assertiva === 'errado') {return colorErrado7 }
        }
        if(i === 7) {
            if(assertiva === 'certo') {return colorCerto8 }
            if(assertiva === 'errado') {return colorErrado8 }
        }
        if(i === 8) {
            if(assertiva === 'certo') {return colorCerto9 }
            if(assertiva === 'errado') {return colorErrado9 }
        }
        if(i === 9) {
            if(assertiva === 'certo') {return colorCerto10 }
            if(assertiva === 'errado') {return colorErrado10 }
        }
    }

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

    const zerarSelecionados = () => {
        setColorSelected("")
        setColorSelected2("")
        setColorSelected3("")
        setColorSelected4("")
        setColorSelected5("")
        setColorSelected6("")
        setColorSelected7("")
        setColorSelected8("")
        setColorSelected9("")
        setColorSelected10("")
        //B
        setColorSelectedB("")
        setColorSelectedB2("")
        setColorSelectedB3("")
        setColorSelectedB4("")
        setColorSelectedB5("")
        setColorSelectedB6("")
        setColorSelectedB7("")
        setColorSelectedB8("")
        setColorSelectedB9("")
        setColorSelectedB10("")
        //C
        setColorSelectedC("")
        setColorSelectedC2("")
        setColorSelectedC3("")
        setColorSelectedC4("")
        setColorSelectedC5("")
        setColorSelectedC6("")
        setColorSelectedC7("")
        setColorSelectedC8("")
        setColorSelectedC9("")
        setColorSelectedC10("")
        //D
        setColorSelectedD("")
        setColorSelectedD2("")
        setColorSelectedD3("")
        setColorSelectedD4("")
        setColorSelectedD5("")
        setColorSelectedD6("")
        setColorSelectedD7("")
        setColorSelectedD8("")
        setColorSelectedD9("")
        setColorSelectedD10("")
        ///E
        setColorSelectedE("")
        setColorSelectedE2("")
        setColorSelectedE3("")
        setColorSelectedE4("")
        setColorSelectedE5("")
        setColorSelectedE6("")
        setColorSelectedE7("")
        setColorSelectedE8("")
        setColorSelectedE9("")
        setColorSelectedE10("")

        //CERTO
        setColorCerto("")
        setColorCerto2("")
        setColorCerto3("")
        setColorCerto4("")
        setColorCerto5("")
        setColorCerto6("")
        setColorCerto7("")
        setColorCerto8("")
        setColorCerto9("")
        setColorCerto10("")
        //ERRADO
        setColorErrado("")
        setColorErrado2("")
        setColorErrado3("")
        setColorErrado4("")
        setColorErrado5("")
        setColorErrado6("")
        setColorErrado7("")
        setColorErrado8("")
        setColorErrado9("")
        setColorErrado10("")
        ///TEXTOS
        setRetornoResp1("")
        setRetornoResp2("")
        setRetornoResp3("")
        setRetornoResp4("")
        setRetornoResp5("")
        setRetornoResp6("")
        setRetornoResp7("")
        setRetornoResp8("")
        setRetornoResp9("")
        setRetornoResp10("")

        setIsVisibleJust("none")
        setIsVisibleJust2("none")
        setIsVisibleJust3("none")
        setIsVisibleJust4("none")
        setIsVisibleJust5("none")
        setIsVisibleJust6("none")
        setIsVisibleJust7("none")
        setIsVisibleJust8("none")
        setIsVisibleJust9("none")
        setIsVisibleJust10("none")

        setResultadoResp1("")
        setResultadoResp2("")
        setResultadoResp3("")
        setResultadoResp4("")
        setResultadoResp5("")
        setResultadoResp6("")
        setResultadoResp7("")
        setResultadoResp8("")
        setResultadoResp9("")
        setResultadoResp10("")
        setJusti1("")
        setJusti2("")
        setJusti3("")
        setJusti4("")
        setJusti5("")
        setJusti6("")
        setJusti7("")
        setJusti8("")
        setJusti9("")
        setJusti10("")
        setColor1("")
        setColor2("")
        setColor3("")
        setColor4("")
        setColor5("")
        setColor6("")
        setColorx7("")
        setColor8("")
        setColor9("")
        setColor10("")
        setColorx1("")
        setColorx2("")
        setColorx3("")
        setColorx4("")
        setColorx5("")
        setColorx6("")
        setColorx7("")
        setColorx8("")
        setColorx9("")
        setColorx10("")
        setColorBtnJust("white")
        setColorBtnJust2("white")
        setColorBtnJust3("white")
        setColorBtnJust4("white")
        setColorBtnJust5("white")
        setColorBtnJust6("white")
        setColorBtnJust7("white")
        setColorBtnJust8("white")
        setColorBtnJust9("white")
        setColorBtnJust10("white")
    }
    
    useEffect(() => {
        if(zerarLista) {
            setPage(1)
        }
    },[zerarLista])
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
    
    const handleResp = (respUser,i) => {
        if(i === 0) {setResposta(respUser)}
        if(i === 1) {setResposta2(respUser)}
        if(i === 2) {setResposta3(respUser)}
        if(i === 3) {setResposta4(respUser)}
        if(i === 4) {setResposta5(respUser)}
        if(i === 5) {setResposta6(respUser)}
        if(i === 6) {setResposta7(respUser)}
        if(i === 7) {setResposta8(respUser)}
        if(i === 8) {setResposta9(respUser)}
        if(i === 9) {setResposta10(respUser)}
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
                <Container style={{margin: 0, padding: 0}} >
                    {PaginatedItems.map((item, i) => {
                        
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
                                    <div><button style={{backgroundColor: colorAlters(i, "a")}} className="ContainerAlternativa" 
                                         onClick={() => {
                                            if(i === 0) {
                                                setColorSelected("#DF9D9C") 
                                                setColorSelectedB("")
                                                setColorSelectedC("")
                                                setColorSelectedD("")
                                                setColorSelectedE("") 
                                            }
                                            if(i === 1) {
                                                setColorSelected2("#DF9D9C")
                                                setColorSelectedB2("")
                                                setColorSelectedC2("")
                                                setColorSelectedD2("")
                                                setColorSelectedE2("") 
                                            }
                                            if(i === 2) {
                                                setColorSelected3("#DF9D9C")
                                                setColorSelectedB3("")
                                                setColorSelectedC3("")
                                                setColorSelectedD3("")
                                                setColorSelectedE3("")  
                                            }
                                            if(i === 3) {
                                                setColorSelected4("#DF9D9C")
                                                setColorSelectedB4("")
                                                setColorSelectedC4("")
                                                setColorSelectedD4("")
                                                setColorSelectedE4("")  
                                            }
                                            if(i === 4) {
                                                setColorSelected5("#DF9D9C")
                                                setColorSelectedB5("")
                                                setColorSelectedC5("")
                                                setColorSelectedD5("")
                                                setColorSelectedE5("")  
                                            }
                                            if(i === 5) {
                                                setColorSelected6("#DF9D9C")
                                                setColorSelectedB6("")
                                                setColorSelectedC6("")
                                                setColorSelectedD6("")
                                                setColorSelectedE6("")  
                                            }
                                            if(i === 6) {
                                                setColorSelected7("#DF9D9C")
                                                setColorSelectedB7("")
                                                setColorSelectedC7("")
                                                setColorSelectedD7("")
                                                setColorSelectedE7("")  
                                            }
                                            if(i === 7) {
                                                setColorSelected8("#DF9D9C")
                                                setColorSelectedB8("")
                                                setColorSelectedC8("")
                                                setColorSelectedD8("")
                                                setColorSelectedE8("") 
                                             }
                                            if(i === 8) {
                                                setColorSelected9("#DF9D9C")
                                                setColorSelectedB9("")
                                                setColorSelectedC9("")
                                                setColorSelectedD9("")
                                                setColorSelectedE9("")  
                                            }
                                            if(i === 9) {
                                                setColorSelected10("#DF9D9C")
                                                setColorSelectedB10("")
                                                setColorSelectedC10("")
                                                setColorSelectedD10("")
                                                setColorSelectedE10("") 
                                            }
                                            handleResp("a", i)
                                            }}> <p style={{fontFamily: 'Segoe', textAlign: "center", margin:0}}>A</p>
                                        </button></div>
                                        <p align="justify" onClick={() => {
                                            handleResp("a",i)
                                            if(i === 0) {
                                                setColorSelected("#DF9D9C") 
                                                setColorSelectedB("")
                                                setColorSelectedC("")
                                                setColorSelectedD("")
                                                setColorSelectedE("") 
                                            }
                                            if(i === 1) {
                                                setColorSelected2("#DF9D9C")
                                                setColorSelectedB2("")
                                                setColorSelectedC2("")
                                                setColorSelectedD2("")
                                                setColorSelectedE2("") 
                                            }
                                            if(i === 2) {
                                                setColorSelected3("#DF9D9C")
                                                setColorSelectedB3("")
                                                setColorSelectedC3("")
                                                setColorSelectedD3("")
                                                setColorSelectedE3("")  
                                            }
                                            if(i === 3) {
                                                setColorSelected4("#DF9D9C")
                                                setColorSelectedB4("")
                                                setColorSelectedC4("")
                                                setColorSelectedD4("")
                                                setColorSelectedE4("")  
                                            }
                                            if(i === 4) {
                                                setColorSelected5("#DF9D9C")
                                                setColorSelectedB5("")
                                                setColorSelectedC5("")
                                                setColorSelectedD5("")
                                                setColorSelectedE5("")  
                                            }
                                            if(i === 5) {
                                                setColorSelected6("#DF9D9C")
                                                setColorSelectedB6("")
                                                setColorSelectedC6("")
                                                setColorSelectedD6("")
                                                setColorSelectedE6("")  
                                            }
                                            if(i === 6) {
                                                setColorSelected7("#DF9D9C")
                                                setColorSelectedB7("")
                                                setColorSelectedC7("")
                                                setColorSelectedD7("")
                                                setColorSelectedE7("")  
                                            }
                                            if(i === 7) {
                                                setColorSelected8("#DF9D9C")
                                                setColorSelectedB8("")
                                                setColorSelectedC8("")
                                                setColorSelectedD8("")
                                                setColorSelectedE8("") 
                                             }
                                            if(i === 8) {
                                                setColorSelected9("#DF9D9C")
                                                setColorSelectedB9("")
                                                setColorSelectedC9("")
                                                setColorSelectedD9("")
                                                setColorSelectedE9("")  
                                            }
                                            if(i === 9) {
                                                setColorSelected10("#DF9D9C")
                                                setColorSelectedB10("")
                                                setColorSelectedC10("")
                                                setColorSelectedD10("")
                                                setColorSelectedE10("") 
                                            }
                                        }} className="alternativa">{item.a}</p></Container>
                                )
                            }else {
                                return (
                                    <Container style={{display: "flex", flexDirection: "column", marginLeft: -15,}}>
                                        <Container style={{display: "flex", flexDirection: "row"}}>   
                                            <button style={{backgroundColor: colorCEME(i, 'certo')}} onClick={() => {
                                                if(i === 0) {
                                                    setColorCerto("#DF9D9C")
                                                    setColorErrado("")
                                                }
                                                if(i === 1) {
                                                    setColorCerto2("#DF9D9C")
                                                    setColorErrado2("")
                                                }
                                                if(i === 2) {
                                                    setColorCerto3("#DF9D9C")
                                                    setColorErrado3("")
                                                }
                                                if(i === 3) {
                                                    setColorCerto4("#DF9D9C")
                                                    setColorErrado4("")
                                                }
                                                if(i === 4) {
                                                    setColorCerto5("#DF9D9C")
                                                    setColorErrado5("")
                                                }
                                                if(i === 5) {
                                                    setColorCerto6("#DF9D9C")
                                                    setColorErrado6("")
                                                }
                                                if(i === 6) {
                                                    setColorCerto7("#DF9D9C")
                                                    setColorErrado7("")
                                                }
                                                if(i === 7) {
                                                    setColorCerto8("#DF9D9C")
                                                    setColorErrado8("")
                                                }
                                                if(i === 8) {
                                                    setColorCerto9("#DF9D9C")
                                                    setColorErrado9("")
                                                }
                                                if(i === 9) {
                                                    setColorCerto10("#DF9D9C")
                                                    setColorErrado10("")
                                                }
                                                handleResp('certo',i)
                                            }} className="ContainerAlternativa"></button> 
                                            <p onClick={() => {
                                                if(i === 0) {
                                                    setColorCerto("#DF9D9C")
                                                    setColorErrado("")
                                                }
                                                if(i === 1) {
                                                    setColorCerto2("#DF9D9C")
                                                    setColorErrado2("")
                                                }
                                                if(i === 2) {
                                                    setColorCerto3("#DF9D9C")
                                                    setColorErrado3("")
                                                }
                                                if(i === 3) {
                                                    setColorCerto4("#DF9D9C")
                                                    setColorErrado4("")
                                                }
                                                if(i === 4) {
                                                    setColorCerto5("#DF9D9C")
                                                    setColorErrado5("")
                                                }
                                                if(i === 5) {
                                                    setColorCerto6("#DF9D9C")
                                                    setColorErrado6("")
                                                }
                                                if(i === 6) {
                                                    setColorCerto7("#DF9D9C")
                                                    setColorErrado7("")
                                                }
                                                if(i === 7) {
                                                    setColorCerto8("#DF9D9C")
                                                    setColorErrado8("")
                                                }
                                                if(i === 8) {
                                                    setColorCerto9("#DF9D9C")
                                                    setColorErrado9("")
                                                }
                                                if(i === 9) {
                                                    setColorCerto10("#DF9D9C")
                                                    setColorErrado10("")
                                                }
                                                handleResp('certo',i)
                                            }}
                                            className="certo-errado" style={{marginTop: 15, marginLeft: 0, fontFamily: 'Segoe', fontSize: 15}}>Certo</p>
                                        </Container>
                                        <Container style={{display: "flex", flexDirection: "row"}}>
                                            <button style={{backgroundColor: colorCEME(i, 'errado')}}onClick={() => {
                                                if(i === 0) {
                                                    setColorErrado("#DF9D9C")
                                                    setColorCerto("")
                                                }
                                                if(i === 1) {
                                                    setColorErrado2("#DF9D9C")
                                                    setColorCerto2("")
                                                }
                                                if(i === 2) {
                                                    setColorErrado3("#DF9D9C")
                                                    setColorCerto3("")
                                                }
                                                if(i === 3) {
                                                    setColorErrado4("#DF9D9C")
                                                    setColorCerto4("")
                                                }
                                                if(i === 4) {
                                                    setColorErrado5("#DF9D9C")
                                                    setColorCerto5("")
                                                }
                                                if(i === 5) {
                                                    setColorErrado6("#DF9D9C")
                                                    setColorCerto6("")
                                                }
                                                if(i === 6) {
                                                    setColorErrado7("#DF9D9C")
                                                    setColorCerto7("")
                                                }
                                                if(i === 7) {
                                                    setColorErrado8("#DF9D9C")
                                                    setColorCerto8("")
                                                }
                                                if(i === 8) {
                                                    setColorErrado9("#DF9D9C")
                                                    setColorCerto9("")
                                                }
                                                if(i === 9) {
                                                    setColorErrado10("#DF9D9C")
                                                    setColorCerto10("")
                                                }
                                                handleResp('errado',i)
                                            }} className="ContainerAlternativa"></button>
                                            <p onClick={() => {
                                                if(i === 0) {
                                                    setColorErrado("#DF9D9C")
                                                    setColorCerto("")
                                                }
                                                if(i === 1) {
                                                    setColorErrado2("#DF9D9C")
                                                    setColorCerto2("")
                                                }
                                                if(i === 2) {
                                                    setColorErrado3("#DF9D9C")
                                                    setColorCerto3("")
                                                }
                                                if(i === 3) {
                                                    setColorErrado4("#DF9D9C")
                                                    setColorCerto4("")
                                                }
                                                if(i === 4) {
                                                    setColorErrado5("#DF9D9C")
                                                    setColorCerto5("")
                                                }
                                                if(i === 5) {
                                                    setColorErrado6("#DF9D9C")
                                                    setColorCerto6("")
                                                }
                                                if(i === 6) {
                                                    setColorErrado7("#DF9D9C")
                                                    setColorCerto7("")
                                                }
                                                if(i === 7) {
                                                    setColorErrado8("#DF9D9C")
                                                    setColorCerto8("")
                                                }
                                                if(i === 8) {
                                                    setColorErrado9("#DF9D9C")
                                                    setColorCerto9("")
                                                }
                                                if(i === 9) {
                                                    setColorErrado10("#DF9D9C")
                                                    setColorCerto10("")
                                                }
                                                handleResp('errado',i)
                                            }} className="certo-errado" style={{marginTop: 15, marginLeft: 0, fontFamily: 'Segoe', fontSize: 15}}>Errado</p>
                                        </Container>
                                    </Container>
                                )
                            }
                        }
                        function letraB () {
                            if(item.b) {
                                return (
                                    <Container style={{display: "flex", flexDirection: "row"}} >
                                    <div><button style={{backgroundColor: colorAlters(i, "b")}} className="ContainerAlternativa" 
                                    onClick={() => {
                                        if(i === 0) { 
                                            setColorSelectedB("#DF9D9C")
                                            setColorSelected("")
                                            setColorSelectedC("")
                                            setColorSelectedD("")
                                            setColorSelectedE("")
                                         }
                                        if(i === 1) {
                                            setColorSelectedB2("#DF9D9C")
                                            setColorSelected2("")
                                            setColorSelectedC2("")
                                            setColorSelectedD2("")
                                            setColorSelectedE2("")
                                        }
                                        if(i === 2) {
                                            setColorSelectedB3("#DF9D9C")
                                            setColorSelected3("")
                                            setColorSelectedC3("")
                                            setColorSelectedD3("")
                                            setColorSelectedE3("")
                                        }
                                        if(i === 3) {
                                            setColorSelectedB4("#DF9D9C")
                                            setColorSelected4("")
                                            setColorSelectedC4("")
                                            setColorSelectedD4("")
                                            setColorSelectedE4("")
                                        }
                                        if(i === 4) {
                                            setColorSelectedB5("#DF9D9C")
                                            setColorSelected5("")
                                            setColorSelectedC5("")
                                            setColorSelectedD5("")
                                            setColorSelectedE5("")
                                        }
                                        if(i === 5) {
                                            setColorSelectedB6("#DF9D9C")
                                            setColorSelected6("")
                                            setColorSelectedC6("")
                                            setColorSelectedD6("")
                                            setColorSelectedE6("")

                                        }
                                        if(i === 6) {
                                            setColorSelectedB7("#DF9D9C")
                                            setColorSelected7("")
                                            setColorSelectedC7("")
                                            setColorSelectedD7("")
                                            setColorSelectedE7("")
                                        }
                                        if(i === 7) {
                                            setColorSelectedB8("#DF9D9C")
                                            setColorSelected8("")
                                            setColorSelectedC8("")
                                            setColorSelectedD8("")
                                            setColorSelectedE8("")
                                        }
                                        if(i === 8) {
                                            setColorSelectedB9("#DF9D9C")
                                            setColorSelected9("")
                                            setColorSelectedC9("")
                                            setColorSelectedD9("")
                                            setColorSelectedE9("")
                                        }
                                        if(i === 9) {
                                            setColorSelectedB10("#DF9D9C")
                                            setColorSelected10("")
                                            setColorSelectedC10("")
                                            setColorSelectedD10("")
                                            setColorSelectedE10("")
                                        }
                                        handleResp("b",i)
                                    }}><p style={{fontFamily: 'Segoe', textAlign: "center", margin:0}}>B</p></button></div>
                                <p onClick={() => {
                                    handleResp("b",i)
                                    if(i === 0) { 
                                        setColorSelectedB("#DF9D9C")
                                        setColorSelected("")
                                        setColorSelectedC("")
                                        setColorSelectedD("")
                                        setColorSelectedE("")
                                     }
                                    if(i === 1) {
                                        setColorSelectedB2("#DF9D9C")
                                        setColorSelected2("")
                                        setColorSelectedC2("")
                                        setColorSelectedD2("")
                                        setColorSelectedE2("")
                                    }
                                    if(i === 2) {
                                        setColorSelectedB3("#DF9D9C")
                                        setColorSelected3("")
                                        setColorSelectedC3("")
                                        setColorSelectedD3("")
                                        setColorSelectedE3("")
                                    }
                                    if(i === 3) {
                                        setColorSelectedB4("#DF9D9C")
                                        setColorSelected4("")
                                        setColorSelectedC4("")
                                        setColorSelectedD4("")
                                        setColorSelectedE4("")
                                    }
                                    if(i === 4) {
                                        setColorSelectedB5("#DF9D9C")
                                        setColorSelected5("")
                                        setColorSelectedC5("")
                                        setColorSelectedD5("")
                                        setColorSelectedE5("")
                                    }
                                    if(i === 5) {
                                        setColorSelectedB6("#DF9D9C")
                                        setColorSelected6("")
                                        setColorSelectedC6("")
                                        setColorSelectedD6("")
                                        setColorSelectedE6("")

                                    }
                                    if(i === 6) {
                                        setColorSelectedB7("#DF9D9C")
                                        setColorSelected7("")
                                        setColorSelectedC7("")
                                        setColorSelectedD7("")
                                        setColorSelectedE7("")
                                    }
                                    if(i === 7) {
                                        setColorSelectedB8("#DF9D9C")
                                        setColorSelected8("")
                                        setColorSelectedC8("")
                                        setColorSelectedD8("")
                                        setColorSelectedE8("")
                                    }
                                    if(i === 8) {
                                        setColorSelectedB9("#DF9D9C")
                                        setColorSelected9("")
                                        setColorSelectedC9("")
                                        setColorSelectedD9("")
                                        setColorSelectedE9("")
                                    }
                                    if(i === 9) {
                                        setColorSelectedB10("#DF9D9C")
                                        setColorSelected10("")
                                        setColorSelectedC10("")
                                        setColorSelectedD10("")
                                        setColorSelectedE10("")
                                    }
                                }} align="justify" className="alternativa">{item.b}</p></Container>
                                )
                            }
                            else {
                                return ""
                            }
                        }
                        function letraD () {
                            if(item.d) {
                                return (
                                    <Container style={{display: "flex", flexDirection: "row"}} >
                                        <div><button style={{backgroundColor: colorAlters(i, "d")}} className="ContainerAlternativa" onClick={() => {
                                    if(i === 0) {
                                        setColorSelectedD("#DF9D9C") 
                                        setColorSelectedB("")
                                        setColorSelectedC("")
                                        setColorSelected("")
                                        setColorSelectedE("") 
                                    }
                                    if(i === 1) {
                                        setColorSelectedD2("#DF9D9C")
                                        setColorSelectedB2("")
                                        setColorSelectedC2("")
                                        setColorSelected2("")
                                        setColorSelectedE2("") 
                                    }
                                    if(i === 2) {
                                        setColorSelectedD3("#DF9D9C")
                                        setColorSelectedB3("")
                                        setColorSelectedC3("")
                                        setColorSelected3("")
                                        setColorSelectedE3("")  
                                    }
                                    if(i === 3) {
                                        setColorSelectedD4("#DF9D9C")
                                        setColorSelectedB4("")
                                        setColorSelectedC4("")
                                        setColorSelected4("")
                                        setColorSelectedE4("")  
                                    }
                                    if(i === 4) {
                                        setColorSelectedD5("#DF9D9C")
                                        setColorSelectedB5("")
                                        setColorSelectedC5("")
                                        setColorSelected5("")
                                        setColorSelectedE5("")  
                                    }
                                    if(i === 5) {
                                        setColorSelectedD6("#DF9D9C")
                                        setColorSelectedB6("")
                                        setColorSelectedC6("")
                                        setColorSelected6("")
                                        setColorSelectedE6("")  
                                    }
                                    if(i === 6) {
                                        setColorSelectedD7("#DF9D9C")
                                        setColorSelectedB7("")
                                        setColorSelectedC7("")
                                        setColorSelected7("")
                                        setColorSelectedE7("")  
                                    }
                                    if(i === 7) {
                                        setColorSelectedD8("#DF9D9C")
                                        setColorSelectedB8("")
                                        setColorSelectedC8("")
                                        setColorSelected8("")
                                        setColorSelectedE8("") 
                                     }
                                    if(i === 8) {
                                        setColorSelectedD9("#DF9D9C")
                                        setColorSelectedB9("")
                                        setColorSelectedC9("")
                                        setColorSelected9("")
                                        setColorSelectedE9("")  
                                    }
                                    if(i === 9) {
                                        setColorSelectedD10("#DF9D9C")
                                        setColorSelectedB10("")
                                        setColorSelectedC10("")
                                        setColorSelected10("")
                                        setColorSelectedE10("") 
                                    }
                                    handleResp("d",i)
                                }}><p style={{fontFamily: 'Segoe', textAlign: "center",margin:0}}>D</p></button></div>
                            <p onClick={() => {
                                handleResp("d",i)
                                if(i === 0) {
                                    setColorSelectedD("#DF9D9C") 
                                    setColorSelectedB("")
                                    setColorSelectedC("")
                                    setColorSelected("")
                                    setColorSelectedE("") 
                                }
                                if(i === 1) {
                                    setColorSelectedD2("#DF9D9C")
                                    setColorSelectedB2("")
                                    setColorSelectedC2("")
                                    setColorSelected2("")
                                    setColorSelectedE2("") 
                                }
                                if(i === 2) {
                                    setColorSelectedD3("#DF9D9C")
                                    setColorSelectedB3("")
                                    setColorSelectedC3("")
                                    setColorSelected3("")
                                    setColorSelectedE3("")  
                                }
                                if(i === 3) {
                                    setColorSelectedD4("#DF9D9C")
                                    setColorSelectedB4("")
                                    setColorSelectedC4("")
                                    setColorSelected4("")
                                    setColorSelectedE4("")  
                                }
                                if(i === 4) {
                                    setColorSelectedD5("#DF9D9C")
                                    setColorSelectedB5("")
                                    setColorSelectedC5("")
                                    setColorSelected5("")
                                    setColorSelectedE5("")  
                                }
                                if(i === 5) {
                                    setColorSelectedD6("#DF9D9C")
                                    setColorSelectedB6("")
                                    setColorSelectedC6("")
                                    setColorSelected6("")
                                    setColorSelectedE6("")  
                                }
                                if(i === 6) {
                                    setColorSelectedD7("#DF9D9C")
                                    setColorSelectedB7("")
                                    setColorSelectedC7("")
                                    setColorSelected7("")
                                    setColorSelectedE7("")  
                                }
                                if(i === 7) {
                                    setColorSelectedD8("#DF9D9C")
                                    setColorSelectedB8("")
                                    setColorSelectedC8("")
                                    setColorSelected8("")
                                    setColorSelectedE8("") 
                                 }
                                if(i === 8) {
                                    setColorSelectedD9("#DF9D9C")
                                    setColorSelectedB9("")
                                    setColorSelectedC9("")
                                    setColorSelected9("")
                                    setColorSelectedE9("")  
                                }
                                if(i === 9) {
                                    setColorSelectedD10("#DF9D9C")
                                    setColorSelectedB10("")
                                    setColorSelectedC10("")
                                    setColorSelected10("")
                                    setColorSelectedE10("") 
                                }
                            }} align="justify" className="alternativa">{item.d}</p> </Container>
                                )
                            }else {
                                return ""
                            }
                        }
                        function letraC () {
                            if(item.c) {
                                return (
                                    <Container style={{display: "flex", flexDirection: "row"}} >
                                        <div><button style={{backgroundColor: colorAlters(i,"c")}} className="ContainerAlternativa" onClick={() => {
                                    if(i === 0) {
                                        setColorSelectedC("#DF9D9C") 
                                        setColorSelectedB("")
                                        setColorSelected("")
                                        setColorSelectedD("")
                                        setColorSelectedE("") 
                                    }
                                    if(i === 1) {
                                        setColorSelectedC2("#DF9D9C")
                                        setColorSelectedB2("")
                                        setColorSelected2("")
                                        setColorSelectedD2("")
                                        setColorSelectedE2("") 
                                    }
                                    if(i === 2) {
                                        setColorSelectedC3("#DF9D9C")
                                        setColorSelectedB3("")
                                        setColorSelected3("")
                                        setColorSelectedD3("")
                                        setColorSelectedE3("")  
                                    }
                                    if(i === 3) {
                                        setColorSelectedC4("#DF9D9C")
                                        setColorSelectedB4("")
                                        setColorSelected4("")
                                        setColorSelectedD4("")
                                        setColorSelectedE4("")  
                                    }
                                    if(i === 4) {
                                        setColorSelectedC5("#DF9D9C")
                                        setColorSelectedB5("")
                                        setColorSelected5("")
                                        setColorSelectedD5("")
                                        setColorSelectedE5("")  
                                    }
                                    if(i === 5) {
                                        setColorSelectedC6("#DF9D9C")
                                        setColorSelectedB6("")
                                        setColorSelected6("")
                                        setColorSelectedD6("")
                                        setColorSelectedE6("")  
                                    }
                                    if(i === 6) {
                                        setColorSelectedC7("#DF9D9C")
                                        setColorSelectedB7("")
                                        setColorSelected7("")
                                        setColorSelectedD7("")
                                        setColorSelectedE7("")  
                                    }
                                    if(i === 7) {
                                        setColorSelectedC8("#DF9D9C")
                                        setColorSelectedB8("")
                                        setColorSelected8("")
                                        setColorSelectedD8("")
                                        setColorSelectedE8("") 
                                     }
                                    if(i === 8) {
                                        setColorSelectedC9("#DF9D9C")
                                        setColorSelectedB9("")
                                        setColorSelected9("")
                                        setColorSelectedD9("")
                                        setColorSelectedE9("")  
                                    }
                                    if(i === 9) {
                                        setColorSelectedC10("#DF9D9C")
                                        setColorSelectedB10("")
                                        setColorSelected10("")
                                        setColorSelectedD10("")
                                        setColorSelectedE10("") 
                                    }        
                                    handleResp("c",i)
                                }}><p style={{fontFamily: 'Segoe', textAlign: "center",margin:0}}>C</p></button></div>
                            <p onClick={() => {
                                handleResp("c",i)
                                if(i === 0) {
                                    setColorSelectedC("#DF9D9C") 
                                    setColorSelectedB("")
                                    setColorSelected("")
                                    setColorSelectedD("")
                                    setColorSelectedE("") 
                                }
                                if(i === 1) {
                                    setColorSelectedC2("#DF9D9C")
                                    setColorSelectedB2("")
                                    setColorSelected2("")
                                    setColorSelectedD2("")
                                    setColorSelectedE2("") 
                                }
                                if(i === 2) {
                                    setColorSelectedC3("#DF9D9C")
                                    setColorSelectedB3("")
                                    setColorSelected3("")
                                    setColorSelectedD3("")
                                    setColorSelectedE3("")  
                                }
                                if(i === 3) {
                                    setColorSelectedC4("#DF9D9C")
                                    setColorSelectedB4("")
                                    setColorSelected4("")
                                    setColorSelectedD4("")
                                    setColorSelectedE4("")  
                                }
                                if(i === 4) {
                                    setColorSelectedC5("#DF9D9C")
                                    setColorSelectedB5("")
                                    setColorSelected5("")
                                    setColorSelectedD5("")
                                    setColorSelectedE5("")  
                                }
                                if(i === 5) {
                                    setColorSelectedC6("#DF9D9C")
                                    setColorSelectedB6("")
                                    setColorSelected6("")
                                    setColorSelectedD6("")
                                    setColorSelectedE6("")  
                                }
                                if(i === 6) {
                                    setColorSelectedC7("#DF9D9C")
                                    setColorSelectedB7("")
                                    setColorSelected7("")
                                    setColorSelectedD7("")
                                    setColorSelectedE7("")  
                                }
                                if(i === 7) {
                                    setColorSelectedC8("#DF9D9C")
                                    setColorSelectedB8("")
                                    setColorSelected8("")
                                    setColorSelectedD8("")
                                    setColorSelectedE8("") 
                                 }
                                if(i === 8) {
                                    setColorSelectedC9("#DF9D9C")
                                    setColorSelectedB9("")
                                    setColorSelected9("")
                                    setColorSelectedD9("")
                                    setColorSelectedE9("")  
                                }
                                if(i === 9) {
                                    setColorSelectedC10("#DF9D9C")
                                    setColorSelectedB10("")
                                    setColorSelected10("")
                                    setColorSelectedD10("")
                                    setColorSelectedE10("") 
                                }        
                            }} align="justify" className="alternativa">{item.c}</p> </Container>
                                )
                            }else {
                                return ""
                            }
                        }
                        function letraE () {
                            if(item.e) {
                                return (
                                    <Container style={{display: "flex", flexDirection: "row"}} >
                                        <div><button style={{backgroundColor: colorAlters(i, "e")}} className="ContainerAlternativa" onClick={() => {
                                    if(i === 0) {
                                        setColorSelectedE("#DF9D9C") 
                                        setColorSelectedB("")
                                        setColorSelectedC("")
                                        setColorSelectedD("")
                                        setColorSelected("") 
                                    }
                                    if(i === 1) {
                                        setColorSelectedE2("#DF9D9C")
                                        setColorSelectedB2("")
                                        setColorSelectedC2("")
                                        setColorSelectedD2("")
                                        setColorSelected2("") 
                                    }
                                    if(i === 2) {
                                        setColorSelectedE3("#DF9D9C")
                                        setColorSelectedB3("")
                                        setColorSelectedC3("")
                                        setColorSelectedD3("")
                                        setColorSelected3("")  
                                    }
                                    if(i === 3) {
                                        setColorSelectedE4("#DF9D9C")
                                        setColorSelectedB4("")
                                        setColorSelectedC4("")
                                        setColorSelectedD4("")
                                        setColorSelected4("")  
                                    }
                                    if(i === 4) {
                                        setColorSelectedE5("#DF9D9C")
                                        setColorSelectedB5("")
                                        setColorSelectedC5("")
                                        setColorSelectedD5("")
                                        setColorSelected5("")  
                                    }
                                    if(i === 5) {
                                        setColorSelectedE6("#DF9D9C")
                                        setColorSelectedB6("")
                                        setColorSelectedC6("")
                                        setColorSelectedD6("")
                                        setColorSelected6("")  
                                    }
                                    if(i === 6) {
                                        setColorSelectedE7("#DF9D9C")
                                        setColorSelectedB7("")
                                        setColorSelectedC7("")
                                        setColorSelectedD7("")
                                        setColorSelected7("")  
                                    }
                                    if(i === 7) {
                                        setColorSelectedE8("#DF9D9C")
                                        setColorSelectedB8("")
                                        setColorSelectedC8("")
                                        setColorSelectedD8("")
                                        setColorSelected8("") 
                                     }
                                    if(i === 8) {
                                        setColorSelectedE9("#DF9D9C")
                                        setColorSelectedB9("")
                                        setColorSelectedC9("")
                                        setColorSelectedD9("")
                                        setColorSelected9("")  
                                    }
                                    if(i === 9) {
                                        setColorSelectedE10("#DF9D9C")
                                        setColorSelectedB10("")
                                        setColorSelectedC10("")
                                        setColorSelectedD10("")
                                        setColorSelected10("") 
                                    }
                                    handleResp("e",i)
                                }}><p style={{fontFamily: 'Segoe', textAlign: "center",margin:0}}>E</p></button></div>
                           <p onClick={() => {
                                handleResp("e",i)
                                if(i === 0) {
                                    setColorSelectedE("#DF9D9C") 
                                    setColorSelectedB("")
                                    setColorSelectedC("")
                                    setColorSelectedD("")
                                    setColorSelected("") 
                                }
                                if(i === 1) {
                                    setColorSelectedE2("#DF9D9C")
                                    setColorSelectedB2("")
                                    setColorSelectedC2("")
                                    setColorSelectedD2("")
                                    setColorSelected2("") 
                                }
                                if(i === 2) {
                                    setColorSelectedE3("#DF9D9C")
                                    setColorSelectedB3("")
                                    setColorSelectedC3("")
                                    setColorSelectedD3("")
                                    setColorSelected3("")  
                                }
                                if(i === 3) {
                                    setColorSelectedE4("#DF9D9C")
                                    setColorSelectedB4("")
                                    setColorSelectedC4("")
                                    setColorSelectedD4("")
                                    setColorSelected4("")  
                                }
                                if(i === 4) {
                                    setColorSelectedE5("#DF9D9C")
                                    setColorSelectedB5("")
                                    setColorSelectedC5("")
                                    setColorSelectedD5("")
                                    setColorSelected5("")  
                                }
                                if(i === 5) {
                                    setColorSelectedE6("#DF9D9C")
                                    setColorSelectedB6("")
                                    setColorSelectedC6("")
                                    setColorSelectedD6("")
                                    setColorSelected6("")  
                                }
                                if(i === 6) {
                                    setColorSelectedE7("#DF9D9C")
                                    setColorSelectedB7("")
                                    setColorSelectedC7("")
                                    setColorSelectedD7("")
                                    setColorSelected7("")  
                                }
                                if(i === 7) {
                                    setColorSelectedE8("#DF9D9C")
                                    setColorSelectedB8("")
                                    setColorSelectedC8("")
                                    setColorSelectedD8("")
                                    setColorSelected8("") 
                                 }
                                if(i === 8) {
                                    setColorSelectedE9("#DF9D9C")
                                    setColorSelectedB9("")
                                    setColorSelectedC9("")
                                    setColorSelectedD9("")
                                    setColorSelected9("")  
                                }
                                if(i === 9) {
                                    setColorSelectedE10("#DF9D9C")
                                    setColorSelectedB10("")
                                    setColorSelectedC10("")
                                    setColorSelectedD10("")
                                    setColorSelected10("") 
                                }
                            }} align="justify" className="alternativa">{item.e}</p> </Container>
                            )
                            }else {
                                return ""
                            }
                        }
                    return (
                    <Container style={{marginTop: 0}} key={i}>
                        <Container className="questao"> <p className="questaoTitle">Questão {zero()}</p></Container>
                            <Row className="ContainerDescPergunta">
                                <p align="justify" style={{fontFamily: 'Segoe', fontSize: 15, color: "#808080", marginLeft: 1}}>
                                    <b>Id:</b> {item.idQuestion}&nbsp; <b> Instituição:</b> {item.instituição}&nbsp;&nbsp; <b> Informativo:</b> {item.informativo} 
                                    &nbsp;&nbsp;<b> Matéria:</b> {item.materia.map((element,i) => {
                                        if(i === 0) {
                                            if(item.materia.length === 1) {
                                                return `${element}`
                                            }
                                         return `${element},`
                                        }else {
                                            if(item.materia.length - 1 === i) {
                                                return ` ${element}`  
                                            }
                                            return ` ${element},`
                                        }
                                        
                                    })}
                                    &nbsp;&nbsp;<b> Tema: </b> {item.tema.map((element,i) => {
                                        if(i === 0) {
                                            if(item.tema.length === 1) {
                                                return `${element}`
                                            }
                                         return `${element},`
                                        }else {
                                            if(item.tema.length - 1 === i) {
                                                return ` ${element}`  
                                            }
                                            return ` ${element},`
                                        }
                                        
                                    })}
                                </p>
                            </Row>
                            <p align="justify" className="TitlePergunta">{item.pergunta}</p>
                        <Container className="content-alternativas" >
                            <Container style={{display: "flex", flexDirection: "column", padding: 0, margin: 0}}>
                            {letraA()}
                            {letraB()}
                            {letraC()}
                            {letraD()}
                            {letraE()}
                            </Container>
                        </Container>
                        <Container style={{marginLeft: -26, marginBottom: 5}}>
                        {CondicaoResp(i)}
                        </Container>
                        <Container style={{display: "flex", flexDirection: "column", marginLeft: 0, marginTop: -20}} >
                            <Button className="btnResponder"  
                            onClick={() => {
                                if(i === 0) {verificarQuestao(item.resp, resposta, i)}
                                if(i === 1) {verificarQuestao(item.resp, resposta2, i)}
                                if(i === 2) {verificarQuestao(item.resp, resposta3, i)}
                                if(i === 3) {verificarQuestao(item.resp, resposta4, i)}
                                if(i === 4) {verificarQuestao(item.resp, resposta5, i)}
                                if(i === 5) {verificarQuestao(item.resp, resposta6, i)}
                                if(i === 6) {verificarQuestao(item.resp, resposta7, i)}
                                if(i === 7) {verificarQuestao(item.resp, resposta8, i)}
                                if(i === 8) {verificarQuestao(item.resp, resposta9, i)}
                                if(i === 9) {verificarQuestao(item.resp, resposta10, i)}
                            }} type="submit">
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
                                        setColorBtnJust6("white")
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
                            <p style={{color: "#bd3330", fontFamily: "Segoe", fontWeight: "bold", marginTop:0, fontSize: 14}}>VISUALIZAR JUSTIFICATIVA</p>
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
            zerarSelecionados()
            setPage((prevState) => prevState + 1)
            window.scrollTo(0,0)
        },
        previous () {
            zerarSelecionados()
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
                setResultadoResp1("Parabéns! Você acertou.")
                setRetornoResp1("")
                setColor1("green")
            }
            if(i === 1) {
                setResultadoResp2("Parabéns! Você acertou.")
                setRetornoResp2("")
                setColor2("green")
            }
            if(i === 2) {
                setResultadoResp3("Parabéns! Você acertou.")
                setRetornoResp3("")
                setColor3("green")
            }
            if(i === 3) {
                setResultadoResp4("Parabéns! Você acertou.")
                setRetornoResp4("")
                setColor4("green")
            }
            if(i === 4) {
                setResultadoResp5("Parabéns! Você acertou.")
                setRetornoResp5("")
                setColor5("green")
            }
            if(i === 5) {
                setResultadoResp6("Parabéns! Você acertou.")
                setRetornoResp6("")
                setColor6("green")
            }
            if(i === 6) {
                setResultadoResp7("Parabéns! Você acertou.")
                setRetornoResp7("")
                setColor7("green")
            }
            if(i === 7) {
                setResultadoResp8("Parabéns! Você acertou.")
                setRetornoResp8("")
                setColor8("green") 
            }
            if(i === 8) {
                setResultadoResp9("Parabéns! Você acertou.")
                setRetornoResp9("")
                setColor9("green")
            }
            if(i === 9) {
                setResultadoResp10("Parabéns! Você acertou.")
                setRetornoResp10("")
                setColor10("green")
            }

            
        }else {
            
            if(i === 0) {
                setResultadoResp1(`Você errou!`)
                setRetornoResp1(` ${resp.toUpperCase()}`)
                setColorx1("red")
            }
            if(i === 1) {
                setResultadoResp2(`Você errou!`)
                setRetornoResp2(` ${resp.toUpperCase()}`)
                setColorx2("red")
            }
            if(i === 2) {
                setResultadoResp3(`Você errou!`)
                setRetornoResp3(`${resp.toUpperCase()}`)
                setColorx3("red")
            }
            if(i === 3) {
                setResultadoResp4(`Você errou!`)
                setRetornoResp4(`${resp.toUpperCase()}`)
                setColorx4("red")
            }
            if(i === 4) {
                setResultadoResp5(`Você errou!`)
                setRetornoResp5(` ${resp.toUpperCase()}`)
                setColorx5("red")
            }
            if(i === 5) {
                setResultadoResp6(`Você errou!`)
                setRetornoResp6(`${resp.toUpperCase()}`)
                setColorx6("red")
            }
            if(i === 6) {
                setResultadoResp7(`Você errou!`)
                setRetornoResp7(` ${resp.toUpperCase()}`)
                setColorx7("red")
            }
            if(i === 7) {
                setResultadoResp8(`Você errou!`)
                setRetornoResp8(`${resp.toUpperCase()}`)
                setColorx8("red")
            }
            if(i === 8) {
                setResultadoResp9(`Você errou!`)
                setRetornoResp9(`${resp.toUpperCase()}`)
                setColorx9("red")
            }
            if(i === 9) {
                setResultadoResp10(`Você errou!`)
                setRetornoResp10(`${resp.toUpperCase()}`)
                setColorx10("red")
            }
        }
    }
    const CondicaoResp = (i) => {
        if(i === 0) {
            return (
                <Container style={{display: "flex", flexDirection: "row"}}>
                    <p style={{color: `${resultadoResp1 === "Parabéns! Você acertou." ? color1 : colorx1}`, fontWeight: "bold", fontFamily: 'Segoe', fontSize: 15}}>{resultadoResp1}</p>
                    {retornoResp1 ? <p style={{color: "#707070", fontFamily: 'Segoe', fontSize: 15,marginLeft: 5}}>Resposta: </p> : ""}
                    <p style={{fontWeight: "bold",color: "#707070", fontFamily: 'Segoe', fontSize: 15,marginLeft: 5}}>{retornoResp1}</p>
                </Container>
            )
        }
        if(i === 1) {
            return (
                <Container style={{display: "flex", flexDirection: "row"}}>
                    <p style={{color: `${resultadoResp2 === "Parabéns! Você acertou." ? color2 : colorx2}`, fontWeight: "bold", fontFamily: 'Segoe', fontSize: 15}}>{resultadoResp2}</p>
                    {retornoResp2 ? <p style={{color: "#707070", fontFamily: 'Segoe', fontSize: 15,marginLeft: 5}}>Resposta: </p> : ""}
                    <p style={{fontWeight: "bold",color: "#707070", fontFamily: 'Segoe', fontSize: 15,marginLeft: 5}}>{retornoResp2}</p>
                </Container>
            )
        }
        if(i === 2) {
            return (
                <Container style={{display: "flex", flexDirection: "row"}}>
                    <p style={{color: `${resultadoResp3 === "Parabéns! Você acertou." ? color3 : colorx3}`, fontWeight: "bold",fontFamily: 'Segoe', fontSize: 15}}>{resultadoResp3}</p>
                    {retornoResp3 ? <p style={{color: "#707070", fontFamily: 'Segoe', fontSize: 15,marginLeft: 5}}>Resposta: </p> : ""}
                    <p style={{fontWeight: "bold",color: "#707070", fontFamily: 'Segoe', fontSize: 15,marginLeft: 5}}>{retornoResp3}</p>
                </Container>
            )
        }
        if(i === 3) {
            return (
                <Container style={{display: "flex", flexDirection: "row"}}>
                    <p style={{color: `${resultadoResp4 === "Parabéns! Você acertou." ? color4 : colorx4}`, fontWeight: "bold", fontFamily: 'Segoe', fontSize: 15}}>{resultadoResp4}</p>
                    {retornoResp4 ? <p style={{color: "#707070", fontFamily: 'Segoe', fontSize: 15,marginLeft: 5}}>Resposta: </p> : ""}
                    <p style={{fontWeight: "bold",color: "#707070", fontFamily: 'Segoe', fontSize: 15,marginLeft: 5}}>{retornoResp4}</p>
                </Container>
            )
        }
        if(i === 4) {
            return (
                <Container style={{display: "flex", flexDirection: "row"}}>
                    <p style={{color: `${resultadoResp5 === "Parabéns! Você acertou." ? color5 : colorx5}`, fontWeight: "bold",fontFamily: 'Segoe', fontSize: 15}}>{resultadoResp5}</p>
                    {retornoResp5 ? <p style={{color: "#707070", fontFamily: 'Segoe', fontSize: 15,marginLeft: 5}}>Resposta: </p> : ""}
                    <p style={{fontWeight: "bold",color: "#707070", fontFamily: 'Segoe', fontSize: 15,marginLeft: 5}}>{retornoResp5}</p>
                </Container >
            )
        }
        if(i === 5) {
            return (
                <Container style={{display: "flex", flexDirection: "row"}}>
                    <p style={{color: `${resultadoResp6 === "Parabéns! Você acertou." ? color6 : colorx6}`, fontWeight: "bold", fontFamily: 'Segoe', fontSize: 15}}>{resultadoResp6}</p>
                    {retornoResp6 ? <p style={{color: "#707070", fontFamily: 'Segoe', fontSize: 15,marginLeft: 5}}>Resposta: </p> : ""}
                    <p style={{fontWeight: "bold",color: "#707070", fontFamily: 'Segoe', fontSize: 15,marginLeft: 5}}>{retornoResp6}</p>
                </Container>
            )
        }
        if(i === 6) {
            return (
                <Container style={{display: "flex", flexDirection: "row"}}>
                    <p style={{color: `${resultadoResp7 === "Parabéns! Você acertou." ? color7 : colorx7}`, fontWeight: "bold", fontFamily: 'Segoe', fontSize: 15}}>{resultadoResp7}</p>
                    {retornoResp7 ? <p style={{color: "#707070", fontFamily: 'Segoe', fontSize: 15,marginLeft: 5}}>Resposta: </p> : ""}
                    <p style={{fontWeight: "bold",color: "#707070", fontFamily: 'Segoe', fontSize: 15,marginLeft: 5}}>{retornoResp7}</p>
                </Container>
            )
        }
        if(i === 7) {
            return (
                <Container style={{display: "flex", flexDirection: "row"}}>
                    <p style={{color: `${resultadoResp8 === "Parabéns! Você acertou." ? color8 : colorx8}`, fontWeight: "bold", fontFamily: 'Segoe', fontSize: 15}}>{resultadoResp8}</p>
                    {retornoResp8 ? <p style={{color: "#707070", fontFamily: 'Segoe', fontSize: 15,marginLeft: 5}}>Resposta: </p> : ""}
                    <p style={{fontWeight: "bold",color: "#707070", fontFamily: 'Segoe', fontSize: 15,marginLeft: 5}}>{retornoResp8}</p>
                </Container>
            )
        }
        if(i === 8) {
            return (
                <Container style={{display: "flex", flexDirection: "row"}}>
                    <p style={{color: `${resultadoResp9 === "Parabéns! Você acertou." ? color9 : colorx9}`, fontWeight: "bold", fontFamily: 'Segoe', fontSize: 15}}>{resultadoResp9}</p>
                    {retornoResp9 ? <p style={{color: "#707070", fontFamily: 'Segoe', fontSize: 15,marginLeft: 5}}>Resposta: </p> : ""}
                    <p style={{fontWeight: "bold",color: "#707070", fontFamily: 'Segoe', fontSize: 15,marginLeft: 5}}>{retornoResp9}</p>
                </Container>
            )
        }
        if(i === 9) {
            return (
                <Container style={{display: "flex", flexDirection: "row"}}>
                    <p style={{color: `${resultadoResp10 === "Parabéns! Você acertou." ? color10 : colorx10}`, fontWeight: "bold",fontFamily: 'Segoe', fontSize: 15}}>{resultadoResp10}</p>
                    {retornoResp10 ? <p style={{color: "#707070", fontFamily: 'Segoe', fontSize: 15,marginLeft: 5}}>Resposta: </p> : ""}
                    <p style={{fontWeight: "bold",color: "#707070", fontFamily: 'Segoe', fontSize: 15,marginLeft: 5}}>{retornoResp10}</p>
                </Container>
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
        <Container style={{marginTop: 10}}>
            {list.update()}
            <Container className="paginacao">
                <Row >
                <div style={{width: 50, height: 50}}>
                    <Button onClick={() => controls.previous()}  style={{backgroundColor: "transparent", border: "none", display: `${previousButton}`}}><img width="25" height="25" src="/previous.png" /></Button>
                </div>
                <div >
                    <p className="paginaAtual">{page}</p>
                </div>
                <div style={{ width: 50, height: 50}}>
                    <Button onClick={() => controls.next()} style={{backgroundColor: "transparent", border: "none", display: `${ totalPage > 1 ? nextButton : "none" }`}}> <img width="25" height="25" src="/next.png" /> </Button>
                </div       >
                </Row>
            </Container>
            <Container style={{marginLeft: 0}}> <p className="totalPaginas">Total de paginas: {totalPage}</p></Container>
        </Container>
    )
}
