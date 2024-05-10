import { useState } from "react"
import PesquisaCategoria from './Componentes/TabelaCategoria'
import PesquisaModelo from './Componentes/TabelaModelo'
import PesquisaAtivo from './Componentes/TabelaAtivo'
import "./Tabelas.css"

export default function Tabela(){
    const [selecionado, setSelecionado] = useState('Nenhum')
    const selecionarComponente=(escolhido: string)=>{
        setSelecionado(escolhido)
    }
    return(
        <>
            <div className="tabcss">
                <div className="TopBar">
                    <button onClick={()=>selecionarComponente('categorias')}><b>Categorias</b></button>
                    <button onClick={()=>selecionarComponente('modelos')}><b>Modelos</b></button>
                    <button onClick={()=>selecionarComponente('ativos')}><b>Ativos</b></button>
                </div>
            
                {selecionado === 'categorias' && <PesquisaCategoria/>}
                {selecionado === 'modelos' && <PesquisaModelo/>}
                {selecionado === 'ativos' && <PesquisaAtivo/>}
            </div>
        </>
    )
}
