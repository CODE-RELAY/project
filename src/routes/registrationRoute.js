var express = require('express');
var mongodb = require('mongodb').MongoClient;
var usersRouter = express.Router();

var u_router = function(web3) {
    usersRouter.route("/")
        .post(function(req, res) {
            const url = 'mongodb://localhost:27017';
            mongodb.connect(url, { useNewUrlParser: true }, function(err, client) {
                console.log("Successfully connected to database.");
                const db = client.db('NodeDemoWebApp');
                const Users = db.collection('Users');

                //================================================================

                        web3.personal.newAccount(req.body.pwd, function(err, addr) {
                            if (err == undefined) {
                                req.body.address = addr;
                                Users.insertOne(req.body, function(err, result) {

                                    if (err == undefined) {
                                        res.send({
                                            msg: "Thank you for signing up. You can now login using your username and password",
                                            code: "success"
                                        });
                                    } else {
                                        console.log(err);
                                        res.send({
                                            msg: err,
                                            code: "error"
                                        });
                                    }
                                });
                            } else {
                                console.log(err);
                                res.send({
                                    msg: err,
                                    code: "error"
                                });
                            }
                        });

            //================================================================            

            });
        });
    return usersRouter;
}