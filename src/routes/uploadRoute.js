const ipfsAPI = require('ipfs-api');
const fs = require('fs');
const ipfs = ipfsAPI('localhost', '5001');
var date = new Date();
var express = require('express');
var mongodb = require('mongodb').MongoClient;

var Web3 = require('web3');
var Contract = require('truffle-contract');
var path = require('path');

var provider = new Web3.providers.HttpProvider("http://localhost:8545");

// SAT Contract
var SATContractJSON = require(path.join(__dirname, '../../build/contracts/SARAToken.json'));
var SATContract = Contract(SATContractJSON);
SATContract.setProvider(provider);

// Main Contract
var MainContractJSON = require(path.join(__dirname, '../../build/contracts/MainContract.json'));
var MainContract = Contract(MainContractJSON);
MainContract.setProvider(provider);
var uploadRouter = express.Router();

function WriteToFile(passForm) {
	   set fso = CreateObject("Scripting.FileSystemObject");  
	   set s = fso.CreateTextFile("test"+uid+".txt", True);
	   s.writeline(uid);
	   s.writeline(register_data.birthday);
	   s.Close();
}

	        let sampleFile = req.files.file;

            var fname = req.files.file.name;
            var pathname = 'public/static/' + fname;
            // Use the mv() method to place the file somewhere on your server
            sampleFile.mv(pathname, function(err) {
                if (err)
                    return res.status(500).send(err);

                let testFile = fs.readFileSync(pathname);
                let testBuffer = new Buffer.from(testFile);

                ipfs.files.add(testBuffer, function(err, file) {
                    if (err) {
                        console.log("IPFS error ", err);
                    } else {
                        const url = 'mongodb://localhost:27017';
                        mongodb.connect(url, { useNewUrlParser: true }, function(err, client) {
                            console.log("Successfully connected to database.");

                            const db = client.db('NodeDemoWebApp');
                            const Submissions = db.collection('Submissions');

                            Submissions.insertOne({ owner: req.user._id, hash: file[0].hash, timestamp: new Date(Date.now()).toISOString(), status: 'Pending', domain: req.body.domain }, function(err, result) {
                                if (err == undefined) {
                                    console.log("Successfully uploaded File");

                                    SATContract.deployed().then(function(instance) {
                                        web3.personal.unlockAccount(req.user.address, req.user.pwd);
                                        return instance.transfer(web3.eth.accounts[0], 50, { from: req.user.address, gas: 100000 });

                                    }).then(function(result) {
                                        console.log("Successfully deducted submission cost");

                                    }).catch(function(err) {
                                        console.log("Error in cost deduction for submission", err);
                                    });

                                    MainContract.deployed().then(function(instance) {
                                        web3.personal.unlockAccount(web3.eth.accounts[0], "123456");
                                        return instance.newSubmission(req.user.address, file[0].hash, { from: web3.eth.accounts[0] });

                                    }).then(function(result) {
                                        console.log("Successful new submission")

                                    }).catch(function(err) {
                                        console.log("Submission Error", err);
                                    });

                                } else console.log(err);
                            });
                                    
                        });
                    }
                    res.redirect("/p");
                });

            });

var u_router = function(web3) {
    uploadRouter.route("/")
        .post(function(req, res) {

        });
    return uploadRouter;
}