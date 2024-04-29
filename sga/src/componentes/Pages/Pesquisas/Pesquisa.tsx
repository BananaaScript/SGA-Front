import { useState } from "react"
import "./Pesquisar.css"
import PesquisarCategoria from "./Componentes/PesquisaCategoria"
import PesquisarModelo from "./Componentes/PesquisaModelo"
import PesquisaAtivo from "./Componentes/PesquisaAtivo"

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
                <button onClick={()=>selecionarComponente('ativo')}><b>Pesquisar Ativo</b></button>
            </div>
            <div>
                {selecionado === 'categoria' && <PesquisarCategoria/>}
                {selecionado === 'modelo' && <PesquisarModelo/>}
                {selecionado === 'ativo' && <PesquisaAtivo/>}
            </div>
            </div>
        </>
    )
}