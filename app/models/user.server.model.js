/**
 * Created by RasmusChristiansen on 13/03/2017.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var exports = module.exports = {};

const userSchema = new Schema({
    users: String,
    messages: String,
    chatrooms: String,
    time: { type: Date, default: Date.now }
});

const chatRoomSchema = new Schema({
    chatroom: String,
});
exports.userSchema = mongoose.model('User',userSchema);
exports.chatRoomSchema = mongoose.model('Chatroom',chatRoomSchema);
