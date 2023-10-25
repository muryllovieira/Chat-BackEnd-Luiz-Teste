/**************************************************************************************
 *  Objetivo: CRIAÇÃO DA ENTIDADE DE BANCO - MESSAGE
 *  Autor: Luiz Gustavo
 *  Data: 24/10/2023
 *  Versão: 1.0
 **************************************************************************************/

const mongoose = require('mongoose')

const Message = mongoose.model('Message', {
    messageBy: {
        type: Number
    },
    messageTo: {
        type: Number
    },
    message: {
        type: String,
    },
    image: {
        type: String,
    },
    date: {
        type: Date,
        required: true,
    },
    hour: {
        type: String,
        required: true
    },
    chatId: {
        type: mongoose.Types.ObjectId,
        ref: "Chat",
    }
})

module.exports = Message