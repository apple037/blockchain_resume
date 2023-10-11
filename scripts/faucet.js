const { ethers, network } = require("hardhat");
const { Web3 } = require("web3");

async function main() {
    // If you want to test a contract locally used your own address
    // You will need to have a local node running first
    // And then transfer some ether to your address
    console.log("network.name: ", network.name);
    if (network.name === "localhost") {

        const [faucet] = await ethers.getSigners();
        console.log("Faucet address:", faucet.address);
        const yourAddress = "0x0FBaE21F11F10DEeb26071CE31D64f705Ec57e3c";
        const value = Web3.utils.toWei("10", "ether");
        const tx = await faucet.sendTransaction({
            to: yourAddress,
            value: value,
        });
        await tx.wait();
        console.log("10 ether sent to", yourAddress);
    }
    else {
        console.log("Please switch to localhost network");
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
