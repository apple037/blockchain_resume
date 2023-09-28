const path = require("path");

function saveDeploymentFiles(resume, networkName, deployerAddress) {
    const fs = require("fs");
    const contractsDir = path.join(__dirname, "..", "resource", networkName);

    if (!fs.existsSync(contractsDir)) {
        fs.mkdirSync(contractsDir);
    }

    fs.writeFileSync(
        path.join(contractsDir, "contract-address.json"),

        JSON.stringify({ Resume: resume.target, Owner: deployerAddress }, undefined, 2)
    );

    const ResumeArtifact = artifacts.readArtifactSync("Resume");

    fs.writeFileSync(
        path.join(contractsDir, "Resume.json"),
        JSON.stringify(ResumeArtifact, null, 2)
    );
}

function cloneToFrontend(networkName) {
    // Copy contract's artifacts and JSON files to frontend
    const contractsDir = path.join(__dirname, "..", "resource", networkName);
    const frontendDir = path.join(__dirname, "..", "frontend", "my-dapp", "src", "contracts");
    const fs = require("fs");
    const files = fs.readdirSync(contractsDir);
    // if directory not exist, create it
    if (!fs.existsSync(frontendDir)) {
        fs.mkdirSync(frontendDir);
    }
    // copy files to frontend
    files.forEach(file => {
        fs.copyFileSync(path.join(contractsDir, file), path.join(frontendDir, file));
    });
}

module.exports = { saveDeploymentFiles, cloneToFrontend };