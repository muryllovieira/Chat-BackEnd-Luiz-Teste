/**************************************************************************************
 *  Objetivo: ROTAS DA ENTIDADE CHAT
 *  Autor: Luiz Gustavo
 *  Data: 24/10/2023
 *  Versão: 1.0
 **************************************************************************************/

const Chat = require('../models_mongoDB/chat.js')
const router = require('express').Router()
const message = require('../controller/modulo/config.js')
const cors = require('cors');
const bodyParser = require('body-parser');
const moment = require('moment')
const bodyParserJSON = bodyParser.json();

//Import da biblioteca do prisma client
var { PrismaClient } = require('@prisma/client')

//Instancia da Classe PrismaClient 
var prisma = new PrismaClient()

router.post('/', bodyParserJSON, cors(), async (request, response) => {

    const { users } = request.body

    if (
        !users || users.length == 0 || users == undefined
    ) {
        response.status(404).json(`Morreu, users: ${users}, data: ${data_criacao}`)
    } else {
        const data_criacao = moment().format("YYYY-MM-DD")
        const hora_criacao = moment().format("HH:mm:ss")

        const chat = {
            users,
            data_criacao,
            hora_criacao
        }

        try {
            await Chat.create(chat)

            const lastChat = await Chat.find({}).sort({ _id: -1 }).limit(1)

            const lastId = lastChat[0]._id

            console.log(lastId.toString());

            const insertSQL = await mdlInsertChat(users, lastId)

            console.log(insertSQL);

            if (insertSQL) {
                console.log(moment().format("HH:mm:ss") + 'hora');
                console.log(moment().format("YYYY-MM-DD") + 'data');

                response.status(message.SUCCESS_CREATED_ITEM.status).json(message.SUCCESS_CREATED_ITEM)
            } else {
                response.status(400).json({message: "Morreu"})
            }
        } catch (error) {
            response.status(500).json(error)
        }
    }
})

const mdlInsertChat = async (users, chatId) => {
    const sqlInsertChat = `insert into tbl_chat(id_mongo) values ("${chatId}")`

    console.log("Passou 1");

    const rsInsertChat = await prisma.$executeRawUnsafe(sqlInsertChat)

    console.log("Passou 2");

    const sqlSelectChat = `select * from tbl_chat order by id desc limit 1;`

    console.log("Passou 3");

    const rsSelectChat = await prisma.$queryRawUnsafe(sqlSelectChat)

    console.log("Passou 4");

    const idChat = rsSelectChat[0].id_mongo

    console.log("Passou 5");

    for (let index = 0; index < users.length; index++) {
        const idUsuario = users[index];

        const insertIntermediaria = await `insert into tbl_chat_usuario(id_usuario, id_mongo) values (${idUsuario} ,"${idChat}")`

        const rsInsertIntermediaria = await prisma.$executeRawUnsafe(insertIntermediaria)

        if(rsInsertIntermediaria){
            console.log(`Foi` + rsInsertIntermediaria);
        }else{
            console.log(`Morreu` + rsInsertIntermediaria);
        }

        console.log("Passou" + index);
    }

    return true
}

module.exports = router