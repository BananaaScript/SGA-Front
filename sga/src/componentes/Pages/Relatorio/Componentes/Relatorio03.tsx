import { useState } from "react"

export default function Relatorio03(){
    const [selecionado, setSelecionado] = useState('Nenhum')
    const selecionarComponente=(escolhido: string) => {
        setSelecionado(escolhido)
    }

    return(
        <>
            <div>
                <h2>Relatorio 03</h2>
            </div>
        </>
    )
}