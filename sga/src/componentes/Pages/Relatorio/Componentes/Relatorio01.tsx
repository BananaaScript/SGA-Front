import { useState } from "react"

export default function Relatorio01(){
    const [selecionado, setSelecionado] = useState('Nenhum')
    const selecionarComponente=(escolhido: string) => {
        setSelecionado(escolhido)
    }

    return(
        <>
            <div>
            <div className='UserData'>

<h2>Estamos Trabalhando Nisso</h2>
<h4>Veja quando ficará pronto <a href="https://github.com/BananaaScript/SGA" target="_blank">AQUI</a></h4>

</div>
            </div>
        </>
    )
}