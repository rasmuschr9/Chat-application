/**
 * Created by RasmusChristiansen on 10/03/2017.
 */
module.exports = (function (app) {
    const index = require('../controllers/index.server.controller');
    const User = require('mongoose').model('User');
    const Chatroom = require('mongoose').model('Chatroom');
    var schema = require('../models/user.server.model');

    // Users Array
    var userNames = [];
    app.locals.userNames = userNames;

    app.get("/", function(req, res) {
        res.render("new-user",{
            title: 'EAAA Chat'
        });
    });
    app.get("/create-chatroom", function(req, res){
        res.render("create-chatroom");
    });

    // Henter beskeder i de tilhørende chatrooms
    app.get("/:chatrooms", function(req, res) {
        var chatroomName;
        schema.userSchema.find({chatrooms:req.params["chatrooms"]}, function (err, messages) {
            if (err) {
                console.log(err);
                res.send(err);
            }
            schema.chatRoomSchema.find({}, function (err, chatroomName) {
                console.log(messages);
                if (err) {
                    console.log(err);
                    res.send(err);
                }
                res.render("chatrooms", {
                    allMessages: messages,
                    allRooms: chatroomName,
                    activeRoom: req.params["chatrooms"]
                });
            });
        });
    });

    //Ny bruger - Session tjekker om brugernavnet, er i brug.
    app.post("/", function(req, res) {
        //Variabel til at tjekke om brugeren er lavet
        createUser = 0;
        if (!req.body.userName) {
            res.status(400).send("You must fill in a username");
            return;
        }
        else {
            for(i = 0; i < userNames.length; i++) {
                if (userNames[i]["userName"] == req.body.userName) {
                    createUser = 1;
                    break;
                }
            }
        }
        if (createUser == 0) {
            req.session.users = req.body.userName;
            userNames.push({userName: req.body.userName,});
            res.redirect("/chatrooms");
        }
        else {
            res.status(400).send("Name is already used");
            return;
        }
    });
    // Opret nyt Chatrum
    app.post("/create-chatroom", function(req, res) {
        if (!req.body.chatroom) {
            res.status(400).send("You must give your chatroom a name");
            return;
        }
        const NewChatRoom = new Chatroom({chatroom: req.body.chatroom});

        NewChatRoom.save((err) => {
            if (err) {
                return next(err);
            } else {
            }
        });
        res.redirect("/chatrooms");
    });
    // Ny besked - Gemmer i databasen og i det rigtige rum
    app.post("/:chatrooms", function(req, res) {
        if (!req.body.message) {
            res.status(400).send("You must enter a message");
            return;
        }
        const user = new User({users: req.session.users, messages: req.body.message, chatrooms: req.params["chatrooms"]});

        user.save((err) => {
            if (err) {
                return next(err);
            } else {
            }
        });
        res.redirect(req.params["chatrooms"]);
    });
});