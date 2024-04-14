export default class Modelo{
    public id!: number
    public nome: string
    public descricao: string
    public modelo: string
    constructor(nome: string, descricao: string, modelo: string){
        this.nome = nome
        this.descricao = descricao
        this.modelo = modelo
    }
}