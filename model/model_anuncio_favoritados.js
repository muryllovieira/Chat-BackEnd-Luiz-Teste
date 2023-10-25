/**************************************************************************************
*  Objetivo: Responsável por gerenciar funções dos anuncios favoritados do usuário
*  Autor: Luiz Gustavo e Felipe Graciano
*  Data: 25/09/2023
*  Versão: 1.0
**************************************************************************************/

//Import da biblioteca do prisma client
var { PrismaClient } = require('@prisma/client')

//Instancia da Classe PrismaClient 
var prisma = new PrismaClient()

const mdlSelectAnunciosFavoritosDoUsuario = async (idUsuario) => {

    let sql = `select 
    tbl_anuncio.id as id_anuncio, tbl_anuncio.nome as nome_livro, 
    tbl_anuncio.ano_lancamento,
    date_format(tbl_anuncio.data_criacao, '%d-%m-%Y %H:%i') as data_criacao,
    tbl_anuncio.status_anuncio, tbl_anuncio.edicao, tbl_anuncio.preco,
    tbl_anuncio.descricao, tbl_anuncio.numero_paginas, tbl_anuncio.id_usuario as anunciante,
    tbl_endereco.estado, tbl_endereco.cidade, tbl_endereco.bairro,
    tbl_anuncio.id_estado_livro,
    tbl_estado_livro.estado as estado_livro,
    tbl_anuncio.id_idioma, tbl_idioma.nome as nome_idioma,
    tbl_anuncio.id_editora, tbl_editora.nome as nome_editora
    from tbl_usuario
			inner join tbl_usuario_anuncio_favoritados
				on tbl_usuario_anuncio_favoritados.id_usuario = tbl_usuario.id
	    	inner join tbl_anuncio
            on tbl_usuario_anuncio_favoritados.id_anuncio = tbl_anuncio.id
	    inner join tbl_endereco
    		on tbl_endereco.id = tbl_usuario.id_endereco
	    inner join tbl_estado_livro
		    on tbl_estado_livro.id = tbl_anuncio.id_estado_livro
	    inner join tbl_idioma
    		on tbl_anuncio.id_idioma = tbl_idioma.id
	    inner join tbl_editora
		    on tbl_editora.id = tbl_anuncio.id_editora
            where tbl_usuario_anuncio_favoritados.id_usuario = ${idUsuario}`


    let rsAnunciosFavoritos = await prisma.$queryRawUnsafe(sql)

    return rsAnunciosFavoritos
}

const mdlInsertAnuncioParaFavoritos = async (dadosBody) =>{

    let sql = `insert into tbl_usuario_anuncio_favoritados(
        id_usuario,
        id_anuncio
    ) values (
        ${dadosBody.id_usuario},
        ${dadosBody.id_anuncio}
    )
    `

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if(resultStatus){
        return true
    }else{
        return false
    }

}

const mdlDeleteAnuncioDosFavoritos = async (id_usuario, id_anuncio) =>{
    let sql = `delete from tbl_usuario_anuncio_favoritados where tbl_usuario_anuncio_favoritados.id_usuario = ${id_usuario} and tbl_usuario_anuncio_favoritados.id_anuncio = ${id_anuncio}`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if(resultStatus){
        return true
    }else{
        return false
    }
}

const mdlCheckarSeOAnuncioEstaFavoritado = async(id_usuario, id_anuncio) =>{
    let sql = `select COUNT(id_anuncio) as resultado FROM tbl_usuario_anuncio_favoritados WHERE id_usuario = ${id_usuario} and id_anuncio = ${id_anuncio}`

    let resultStatus = await prisma.$queryRawUnsafe(sql)
    
    return resultStatus
}

module.exports = {
    mdlSelectAnunciosFavoritosDoUsuario,
    mdlInsertAnuncioParaFavoritos,
    mdlDeleteAnuncioDosFavoritos,
    mdlCheckarSeOAnuncioEstaFavoritado
}