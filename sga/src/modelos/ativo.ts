export default class Ativo{
    public id!: number
    public nome: string
    public rua: string
    public bairro: string
    public complemento: string
    public numero: number | string
    public cep: string
    constructor(nome: string, rua: string, bairro: string, complemento: string, numero: string, cep: string){
        this.nome = nome
        this.rua = rua
        this.bairro = bairro
        this.complemento = complemento
        this.numero = numero
        this.cep = cep
    }
}