import { useState } from "react"

export default function Tabela02(){
    const [selecionado, setSelecionado] = useState('Nenhum')
    const selecionarComponente=(escolhido: string) => {
        setSelecionado(escolhido)
    }

    return(
        <>
            <div>
                <h2>Tabela 02</h2>
            </div>
        </>
    )
}