/**************************************************************************************
 *  Objetivo: CRIAÇÃO DA ENTIDADE DE BANCO - CHAT
 *  Autor: Luiz Gustavo
 *  Data: 24/10/2023
 *  Versão: 1.0
 **************************************************************************************/

const mongoose = require('mongoose')

const Chat = mongoose.model('Chat', {
    users: Array,
    isGroup: {
        type: Boolean,
        default: false
    },
    data_criacao: Date,
    hora_criacao: String
})


module.exports = Chat