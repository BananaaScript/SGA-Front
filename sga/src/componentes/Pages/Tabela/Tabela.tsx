import { useState } from "react"
import Tabela01 from './Componentes/Tabela01'
import Tabela02 from './Componentes/Tabela02'
import Tabela03 from './Componentes/Tabela03'
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
                    <button onClick={()=>selecionarComponente('T1')}><b>Tabela 01</b></button>
                    <button onClick={()=>selecionarComponente('T2')}><b>Tabela 02</b></button>
                    <button onClick={()=>selecionarComponente('T3')}><b>Tabela 03</b></button>
                </div>
            
                {selecionado === 'T1' && <Tabela01/>}
                {selecionado === 'T2' && <Tabela02/>}
                {selecionado === 'T3' && <Tabela03/>}
            </div>
        </>
    )
}
