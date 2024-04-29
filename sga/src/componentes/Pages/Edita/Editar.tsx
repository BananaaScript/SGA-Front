import { useCallback, useState } from "react"
import EditaADM from "./componentes/EditaADM"
import EditaCategoria from "./componentes/EditaCategoria"
import EditaAtivo from "./componentes/EditaAtivo"
import EditaDestinatario from "./componentes/EditaDestinatario"
import EditaModelo from "./componentes/EditaModelo"
import "./Editar.css"

export default function Editar(){
    
    const [selecionado, setSelecionado] = useState('Nenhum')
    const selecionarComponente=(escolhido: string)=>{
        setSelecionado(escolhido)
    }
    return(
        <>
            <div className="editcss">
                <div className="TopBar">
                    <button onClick={()=>selecionarComponente('categoria')}><b>Editar Categoria</b></button>
                    <button onClick={()=>selecionarComponente('modelo')}><b>Editar Modelo</b></button>
                    <button onClick={()=>selecionarComponente('ativo')}><b>Editar Ativo</b></button>
                    <button onClick={()=>selecionarComponente('destinatario')}><b>Editar Destinatario</b></button>
                    <button onClick={()=>selecionarComponente('adm')}><b>Editar Administrador</b></button>
                </div>
                <div>
                    {selecionado === 'adm' && <EditaADM/>}
                    {selecionado === 'ativo' && <EditaAtivo/>}
                    {selecionado === 'categoria' && <EditaCategoria/>}
                    {selecionado === 'destinatario' && <EditaDestinatario/>}
                    {selecionado === 'modelo' && <EditaModelo/>}
                </div>
            </div>
        </>
    )
}
