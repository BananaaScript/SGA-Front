export default function AdicionaCategoria(){
    return(
        <>
        <div>
                <div>
                    <input type="text" /* value={nome} onChange={(dado)=>setNome(dado.target.value)} */ placeholder="Nome"/>
                </div>
                <div>
                    <input type="text" /* value={rua} onChange={(dado)=>setRua(dado.target.value)} */ placeholder="Descrição" />
                </div>
                <div className="input-group mb-3">
                    <button /* onClick={registrar} */>Registrar</button>
                </div>
        </div>
        </>
    )
}