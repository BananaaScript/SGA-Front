import { useState } from "react"

export default function Tabela03(){
    const [selecionado, setSelecionado] = useState('Nenhum')
    const selecionarComponente=(escolhido: string) => {
        setSelecionado(escolhido)
    }

    return(
        <>
            <div>
                <h2>Tabela 03</h2>
            </div>
        </>
    )
}