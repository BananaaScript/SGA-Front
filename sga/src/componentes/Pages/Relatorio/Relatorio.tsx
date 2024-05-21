import { useState } from "react"
import Relatorio01 from './Componentes/Relatorio01'
import Relatorio02 from './Componentes/Relatorio02'
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
                    <button onClick={()=>selecionarComponente('R1')}><b>Relatorio das Categorias</b></button>
                    <button onClick={()=>selecionarComponente('R2')}><b>Relatorio dos Modelos</b></button>

                </div>
            
                {selecionado === 'R1' && <Relatorio01/>}
                {selecionado === 'R2' && <Relatorio02/>}
            </div>
        </>
    )
}
