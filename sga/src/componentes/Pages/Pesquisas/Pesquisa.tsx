import { useState } from "react"
import "./Pesquisar.css"
import PesquisarCategoria from "./Componentes/PesquisaCategoria"
import PesquisarModelo from "./Componentes/PesquisaModelo"

export default function Pesquisa(){
    const [selecionado, setSelecionado] = useState('Nenhum')
    const selecionarComponente=(escolhido: string)=>{
        setSelecionado(escolhido)
    }
    return(
        <>
            <div className="pesqcss">
            <div className="TopBar">
                <button onClick={()=>selecionarComponente('categoria')}><b>Pesquisar Categoria</b></button>
                <button onClick={()=>selecionarComponente('modelo')}><b>Pesquisar Modelo</b></button>
            </div>
            <div>
                {selecionado === 'categoria' && <PesquisarCategoria/>}
                {selecionado === 'modelo' && <PesquisarModelo/>}
            </div>
            </div>
        </>
    )
}