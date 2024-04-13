import { useState } from "react"

export default function Relatorio01(){
    const [selecionado, setSelecionado] = useState('Nenhum')
    const selecionarComponente=(escolhido: string) => {
        setSelecionado(escolhido)
    }

    return(
        <>
            <div>
                <h2>Relatorio 01</h2>
            </div>
        </>
    )
}