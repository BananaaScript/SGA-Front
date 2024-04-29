import {format} from 'date-fns'
export function formataData(data: string){
    const dataFormatada = format(new Date(data), 'dd/MM/yyyy')
    dataFormatada.toString()
    return dataFormatada
 }