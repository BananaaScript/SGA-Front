import { useState } from "react"
import Relatorio01 from './Componentes/Relatorio01'
import Relatorio02 from './Componentes/Relatorio02'
import Relatorio03 from './Componentes/Relatorio03'
import "./Relatorios.css"

export default function Relatorio(){
    const [selecionado, setSelecionado] = useState('Nenhum')
    const selecionarComponente=(escolhido: string)=>{
        setSelecionado(escolhido)
    }
    return(
        <>
            <div className="relcss">
                <div className="TopBar">
                    <button onClick={()=>selecionarComponente('R3')}><b>Total de ativos</b></button>
                    <button onClick={()=>selecionarComponente('R1')}><b>Relatorio das Categorias</b></button>
                    <button onClick={()=>selecionarComponente('R2')}><b>Relatorio dos Modelos</b></button>

                </div>
            
                {selecionado === 'R1' && <Relatorio01/>}
                {selecionado === 'R2' && <Relatorio02/>}
                {selecionado === 'R3' && <Relatorio03/>}
            </div>
        </>
    )
}
