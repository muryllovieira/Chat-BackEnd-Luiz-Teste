/**************************************************************************************
 *  Objetivo: ROTAS DA ENTIDADE MENSAGEM
 *  Autor: Luiz Gustavo
 *  Data: 24/10/2023
 *  Versão: 1.0
 **************************************************************************************/

const Message = require('../models_mongoDB/message.js')
const router = require('express').Router()
const config = require('../controller/modulo/config.js')
const cors = require('cors');
const bodyParser = require('body-parser');
const moment = require('moment')
const bodyParserJSON = bodyParser.json();

router.post('/', bodyParserJSON, cors(), async (request, response) => {

    console.log('entrou');

    const {messageBy, messageTo, message, image, chatId} = request.body

    if(
        !messageBy || messageBy == undefined || isNaN(messageBy) || 
        !messageTo || messageTo == undefined || isNaN(messageTo) || 
        !message || message == undefined ||
        !chatId || chatId == undefined
    ){
        response.status(404).json(`Morreu, mBy: ${messageBy}, mTo: ${messageTo}, m: ${message}, chat: ${chatId}`)
    }else if(!image || image == undefined){
        const date = moment().format("YYYY-MM-DD")
        const hour = moment().format("HH:mm:ss")

        const mensagem = {
            messageBy,
            messageTo,
            message,
            date,
            hour,
            chatId
        }

        try {
            await Message.create(mensagem)
            
            response.status(config.SUCCESS_CREATED_ITEM.status).json(config.SUCCESS_CREATED_ITEM)
        } catch (error) {
            response.status(500).json(error)
        }


    }else{
        const data_criacao = moment().format("YYYY-MM-DD")
        const hora_criacao = moment().format("HH:mm:ss")

        const mensagem = {
            messageBy,
            messageTo,
            message,
            data_criacao,
            hora_criacao,
            chatId
        }

        try {
            await Message.create(mensagem)
            
            response.status(config.SUCCESS_CREATED_ITEM.status).json(config.SUCCESS_CREATED_ITEM)
        } catch (error) {
            response.status(500).json(error)
        }

    }
})

module.exports = router