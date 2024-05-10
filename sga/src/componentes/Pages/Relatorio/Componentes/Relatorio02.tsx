import { useState } from "react"

export default function Relatorio02(){
    const [selecionado, setSelecionado] = useState('Nenhum')
    const selecionarComponente=(escolhido: string) => {
        setSelecionado(escolhido)
    }

    return(
        <>
            <div>
            <div >

<h2>Estamos Trabalhando Nisso</h2>
<h4>Veja quando ficará pronto <a href="https://github.com/BananaaScript/SGA" target="_blank">AQUI</a></h4>

</div>
            </div>
        </>
    )
}