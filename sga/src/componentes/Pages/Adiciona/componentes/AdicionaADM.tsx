import { useState } from "react"
export default function AdicionaADM(){
    const [selecionado, setSelecionado] = useState('Nenhum')
    const selecionarComponente=(escolhido: string)=>{
        setSelecionado(escolhido)
    }
    return(
        <>
            <h1>WIP</h1>
        </>
    )
}