/**************************************************************************************
*  Objetivo: Responsável por gerenciar funções de dados do anuncio
*  Autor: Luiz Gustavo 
*  Data: 15/09/2023
*  Versão: 1.0
**************************************************************************************/

//Import da biblioteca do prisma client
var { PrismaClient } = require('@prisma/client')

//Instancia da Classe PrismaClient 
var prisma = new PrismaClient()


const mdlSelectFotoByIdAnuncio = async (idAnuncio) => {
    let sql = `select foto.id, foto.foto from tbl_foto as foto where foto.id_anuncio = ${idAnuncio}`

    let rsFoto = await prisma.$queryRawUnsafe(sql)

    if(rsFoto.length > 0){
        return rsFoto
    }else{
        return false
    }
}

const mdlInsertFotoScale = async (id, arrayFotos) => {
    for (let i = 0; i < arrayFotos.length; i++) {
        const foto = arrayFotos[i];

        let sql = `insert into tbl_foto(
            id_anuncio, foto
            ) values (
                ${id}, 
                '${foto}'
            )`

        await prisma.$executeRawUnsafe(sql)
    }
}


module.exports = {
    mdlSelectFotoByIdAnuncio,
    mdlInsertFotoScale
}