import { useState } from "react"

export default function Tabela01(){
    const [selecionado, setSelecionado] = useState('Nenhum')
    const selecionarComponente=(escolhido: string) => {
        setSelecionado(escolhido)
    }

    return(
        <>
            <div>
                <h2>Tabela 01</h2>
            </div>
        </>
    )
}