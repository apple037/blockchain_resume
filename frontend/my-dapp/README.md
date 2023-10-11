## Demo Dapp
### Prerequisites
1. This dapp is demo on localhost only, so you need to run a local blockchain with Hardhat. Also, a smart contract is deployed on the local blockchain.
- ```npx hardhat node```
2. Your Metamask wallet is connected to the local blockchain. And you have some ETH in your wallet. Run the faucet script to get some ETH.
- ```npx hardhat run scripts/faucet.js --network localhost```
3. Deploy the smart contract with frontend property. This will generate a frontend folder in the root directory and copy the contract artifacts to the frontend folder.
- ```npx hardhat run scripts/deploy_with_frontend.js --network localhost```
### Setup
```npm install```
### Run
```npm start```


### Functions
- [x] Connect wallet
- [x] Call contract function
- [x] Listen to contract event
- [x] Send contract transaction