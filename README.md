# ReviewMe
Blockchain based peer review system for conference papers

Please find the attached YouTube link for video of implementation:
https://youtu.be/h8rzNEDi5HY

Please find the attached drive link for whitepaper:
https://drive.google.com/open?id=1-LnCRTdZU4SVKqHxqUnLBY4iudbLr5R2

Please find the attached drive link for video implementation:
https://drive.google.com/file/d/1sWrqPv3-q9Ej510LrAs3AkCGvJYDRvaV/view?usp=sharing

Before using the application you need to have certain tools and packages installed on your local machine.
1. Install go-ethereum on your machine or Geth. You can refer [this link](https://github.com/ethereum/go-ethereum/wiki/Building-Ethereum) for instructions.
2. Install NodeJS on your local machine. You can refer [this link](https://nodejs.org/en/) for further instructions.
3. Install IPFS on your local machine. You can refer [this link](https://docs.ipfs.io/guides/guides/install/) for futher instructions.
4. Install Truffle on your local machine by running ```npm install -g truffle```.
5. Install MongoDB server on your local machine. You can refer [this link](https://docs.mongodb.com/manual/installation/) for further instructions.

# Creating a Private Single Geth Node
1. Create folder for chain data:

   ```mkdir datadir```
2. Initialize Blockchain network and create genesis block:

   ```geth --datadir ./datadir init init.json```
3. Start blockchain network and expose useful RPC APIs:

   ```geth --datadir ./datadir --networkid 2019 --rpc --rpcport 8545 --rpcaddr 127.0.0.1 --rpccorsdomain "*" --rpcapi "eth,net,web3,personal,miner"```

# Attaching to Geth IPC
```geth attach ./datadir/geth.ipc```

# Creating Private Network Cluster using Geth (Optional)
Run the following commands on Geth console-

1. Get enode information of nodes by running following command:

   ```admin.nodeInfo.enode```

2. Add peer by running following command:

   ```admin.addPeer(<enode id of the current Node and IP of the Node to connect>)```

3. Check if peers are added by following command:

   ```admin.peers```

# Starting MongoDB server
You might use following commands to start MongoDB server on your local machine:

```sudo mongod``` or ```sudo systemctl start mongod```

# Starting IPFS Daemon server
Run following commands on your terminal:

1. Initialize IPFS on your machine
```ipfs init```

2. Configure IPFS to allow CORS
```ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin '[\"*\"]'```
```ipfs config --json API.HTTPHeaders.Access-Control-Allow-Methods '[\"PUT\", \"GET\", \"POST\"]'```

3. Start IPFS Daemon
```ipfs daemon```

# Deploy Smart Contracts on to Blockchain
Run the following commands on the terminal in project root directory:

1. Compile Smart Contracts
```truffle compile```

2. Migrate Smart Contracts to the Geth Node
```truffle migrate```

# Starting Node Application
Run ```npm start``` on your terminal. The application should start on port 3001. View the application in your favourite browser using url: http://localhost:3001.

# Tools Versions
1. Geth - 1.8.22-stable-7fa3509e
2. IPFS - version 0.4.19
3. MongoDB - version v2.6.10
4. NodeJS - v8.15.0
5. NPM - 6.4.1
6. Truffle - v5.0.3

# References
- [C# Corner](https://www.c-sharpcorner.com/article/building-web-application-using-node-js/)
- [Mongodb NPM](https://www.npmjs.com/package/mongodb)
- [Passport NPM](https://www.npmjs.com/package/passport)
- [Passport](http://www.passportjs.org/)
- [Web3js NPM](https://www.npmjs.com/package/web3)
- [Hackernoon](https://hackernoon.com/set-up-a-private-ethereum-blockchain-and-deploy-your-first-solidity-smart-contract-on-the-caa8334c343d)
- [Medium Private Network Cluster using Geth](https://medium.com/@yashwanthvenati/setup-private-ethereum-blockchain-network-with-multiple-nodes-in-5-mins-708ab89b1966)
- [Medium IPFS](https://medium.com/coinmonks/a-hands-on-introduction-to-ipfs-ee65b594937)
