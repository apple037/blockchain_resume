# A BlockChain Resume Smart Contract
## Description
This is a smart contract that allows you to create a resume on the blockchain. It is deployed on the Goerli testnet. The framework used is Hardhat.
## Usage
### 1. Compile
``` npx hardhat compile ```
### 2. Test
``` npx hardhat test ```
### 3. Deploy
- No frontend property
``` npx hardhat run scripts/deploy.js --network  <NETWORK_CONFIG> ```
- With frontend property
``` npx hardhat run scripts/deploy_with_frontend.js --network  <NETWORK_CONFIG> ```
### 4. Verify
``` npx hardhat verify --network <NETWORK_CONFIG> <DEPLOYED_CONTRACT_ADDRESS> ```
### 5. Coverage
``` npx hardhat coverage ```
## Frontend
The frontend is built with React and TailwindCSS. It is still in development.
## WakaTime Metrics
<!--START_SECTION:waka-->

```txt
Java              9 hrs 15 mins   ███████████░░░░░░░░░░░░░░   43.98 %
JavaScript        6 hrs 18 mins   ███████▒░░░░░░░░░░░░░░░░░   29.95 %
Markdown          1 hr 14 mins    █▒░░░░░░░░░░░░░░░░░░░░░░░   05.90 %
Solidity          1 hr 12 mins    █▒░░░░░░░░░░░░░░░░░░░░░░░   05.74 %
YAML              51 mins         █░░░░░░░░░░░░░░░░░░░░░░░░   04.08 %
```

<!--END_SECTION:waka-->
