const path = require("path");
const utils = require('../utils/utils.js');


async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const resume = await ethers.deployContract("Resume");

  console.log("Resume address:", await resume.getAddress());
  // Get the deployed network name
  const network = await ethers.provider.getNetwork();
  console.log("Network name:", network.name);

  // We also save the contract's artifacts and address in the resources directory
  utils.saveDeploymentFiles(resume, network.name, deployer.address);
  // Clone deploment files to frontend
  utils.cloneToFrontend(network.name);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });