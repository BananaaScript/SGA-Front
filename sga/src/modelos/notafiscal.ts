export type Notafiscal = {
    id: number
    id_Ativo: number
    empresa: string
    razao_social: string
    cnpj: string
    descricao: string
    nota_fiscal: File| null
}