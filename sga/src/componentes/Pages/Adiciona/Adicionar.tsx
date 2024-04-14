import { useState } from "react"
import AdicionaADM from "./componentes/AdicionaADM"
import { AdicionaAtivo } from "./componentes/AdicionaAtivo"
import AdicionaCategoria from "./componentes/AdicionaCategoria"
import AdicionaDestinatario from "./componentes/AdicionaDestinatario"
import AdicionaModelo from "./componentes/AdicionaModelo"
import "./Adicionar.css"

export default function Adicionar(){
    const [selecionado, setSelecionado] = useState('Nenhum')
    const selecionarComponente=(escolhido: string)=>{
        setSelecionado(escolhido)
    }
    return(
        <>
            <div className="addcss">
                <head>
                    <link rel="stylesheet" href="./Adicionar.css" />
                </head>
                
                <div className="TopBar">
                    <button onClick={()=>selecionarComponente('categoria')}><b>Adicionar Categoria </b></button>
                    <button onClick={()=>selecionarComponente('modelo')}><b>Adicionar Modelo </b></button>
                    <button onClick={()=>selecionarComponente('ativo')}> <b>Adicionar Ativo </b></button>
                    <button onClick={()=>selecionarComponente('destinatario')}><b>Adicionar Destinatario </b></button>
                    <button onClick={()=>selecionarComponente('adm')}><b>Adicionar Administrador </b></button>
                </div>
                <div className="telinha">
                {selecionado === 'adm' && <AdicionaADM/>}
                {selecionado === 'ativo' && <AdicionaAtivo/>}
                {selecionado === 'categoria' && <AdicionaCategoria/>}
                {selecionado === 'destinatario' && <AdicionaDestinatario/>}
                {selecionado === 'modelo' && <AdicionaModelo/>}
                </div>
            </div>


        </>
    )
}