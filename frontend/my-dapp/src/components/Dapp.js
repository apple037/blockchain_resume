import React from "react";
import { ethers } from "ethers";
import ResumeArtifact from "../contracts/Resume.json";
import contractAddress from "../contracts/contract-address.json";
import { WaitingForTransactionMessage } from "./WaitingForTransactionMessage";
import { TransactionErrorMessage } from "./TransactionErrorMessage";
import { ConnectWallet } from "./ConnectWallet";
import { Loading } from "./Loading";
import { NoWalletDetected } from "./NoWalletDetected";
import { PersonalResume } from "./PersonalResume";
import { UpdateResume } from "./UpdateResume";
import { CreateResume } from "./CreateResume";

// This is the default id used by the Hardhat Network
const HARDHAT_NETWORK_ID = '31337';

// This is an error code that indicates that the user canceled a transaction
const ERROR_CODE_TX_REJECTED_BY_USER = 4001;

export class Dapp extends React.Component {
    constructor(props) {
        super(props);
        this.initialState = {
            personalResume: undefined,
            networkData: undefined, // 網路資訊
            selectedAddress: undefined,
            balance: undefined,
            txBeingSent: undefined,
            txReceipt: undefined,
            networkError: undefined,
            isCreated: undefined,
            isUpdate: false,
            isInitialized: false,
        };
        this.state = this.initialState;
    }
    // Dapp渲染
    render() {
        // 如果瀏覽器沒有安裝錢包，則顯示錢包未安裝component
        if (window.ethereum === undefined) {
            return <NoWalletDetected />;
        }
        // 如果selectedAddress為undefined，則顯示連接錢包component
        if (this.state.selectedAddress === undefined) {
            return (
                <ConnectWallet connectWallet={() => this._connectWallet()}
                    networkError={this.state.networkError}
                    dismiss={() => this._dismissNetworkError()}
                />
            );
        }
        // 如果 NetworkData 為 undefined，則顯示 Loading component
        if (this.state.isInitialized === false || !this.state.networkData) {
            return <Loading />;
        }

        // 如果所有條件都符合，則顯示PersonalResume component
        return (
            <div className="container p-4">
                <div className="row">
                    <div className="col-12">
                        <h1>
                            {this.state.networkData.name} ({this.state.networkData.chainId})
                        </h1>
                        <p>
                            Welcome <b>{this.state.selectedAddress}</b>, you have {" "}
                            <b>
                                {this.state.balance.toString()} Ether
                            </b>
                            .
                        </p>
                        <p>
                            The contract address is {" "} <b>{contractAddress.Resume} </b>
                            created by <b>{contractAddress.Owner}</b>
                            .
                        </p>
                    </div>
                </div>
                <hr />
                {/* 
                    Transaction sending and error messages are displayed here.
                */}
                <div className="row">
                    <div className="col-12">
                        {/* 
                            Sending a transaction isn't an immediate action. You have to wait
                            for it to be mined.
                            If we are waiting for one, we show a message here.
                        */}
                        {this.state.txBeingSent && (
                            <WaitingForTransactionMessage txHash={this.state.txBeingSent} />
                        )}

                        {/* 
                            Sending a transaction can fail in multiple ways. 
                            If that happened, we show a message here.
                        */}
                        {this.state.transactionError && (
                            <TransactionErrorMessage
                                message={this._getRpcErrorMessage(this.state.transactionError)}
                                dismiss={() => this._dismissTransactionError()}
                            />
                        )}
                    </div>
                </div>
                {/* Owner function here*/}
                {/* {this.state.selectedAddress == contractAddress.Owner && (
                    <OwnerFunctionBlock />
                )} */}
                {/* Resume function here*/}
                {this.state.isCreated && !this.state.isUpdate && (
                    <PersonalResume
                        personalResume={this.state.personalResume}
                    />
                )}
                {/* Create function here*/}
                {!this.state.isCreated && (
                    <CreateResume
                        createResume={(name, email, github, about, skills, experiences, education, projects) => this._addResume(name, email, github, about, skills, experiences, education, projects)}
                    />
                )}
                {/* Update function here*/}
                {this.state.isCreated && this.state.isUpdate && (
                    <UpdateResume
                        updateResume={(name, email, github, about, skills, experiences, education, projects) => this._updatePersonalResume(name, email, github, about, skills, experiences, education, projects)}
                        personalResume={this.state.personalResume}
                    />
                )}
                {/* Update button here*/}
                {this.state.isCreated && !this.state.isUpdate && (
                    <div className="row">
                        <div className="col-12">
                            <button
                                className="btn btn-primary"
                                type="button"
                                onClick={() => this._updateButton()}
                            >
                                Update Resume
                            </button>
                        </div>
                    </div>
                )}
                {/* Delete button here*/}
                {this.state.isCreated && !this.state.isUpdate && (
                    <div className="row">
                        <div className="col-12">
                            <button
                                className="btn btn-danger"
                                type="button"
                                onClick={() => this._deleteButton()}
                            >
                                Delete Resume
                            </button>
                        </div>
                    </div>
                )}

            </div>
        )
    }

    componentWillUnmount() {
        // We poll the user's balance, so we have to stop doing that when Dapp
        // gets unmounted
        this._stopPollingData();
    }

    async _connectWallet() {
        // This method is run when the user clicks the Connect. It connects the
        // dapp to the user's wallet, and initializes it.

        // To connect to the user's wallet, we have to run this method.
        // It returns a promise that will resolve to the user's address.
        const [selectedAddress] = await window.ethereum.request({ method: 'eth_requestAccounts' });

        // Once we have the address, we can initialize the application.

        // First we check the network
        this._checkNetwork();

        this._initialize(selectedAddress);
        // We reinitialize it whenever the user changes their account.
        window.ethereum.on("accountsChanged", ([newAddress]) => {
            this._stopPollingData();
            // `accountsChanged` event can be triggered with an undefined newAddress.
            // This happens when the user removes the Dapp from the "Connected
            // list of sites allowed access to your addresses" (Metamask > Settings > Connections)
            // To avoid errors, we reset the dapp state 
            if (newAddress === undefined) {
                return this._resetState();
            }
            this._initialize(newAddress);
        });
    }

    _initialize(userAddress) {
        // This method initializes the dapp
        console.log("User address: " + userAddress)
        // We first store the user's address in the component's state
        this.setState({
            selectedAddress: userAddress,
        }, () => {
            // 在setState的回調函數中執行後續操作
            console.log("Address in state: " + this.state.selectedAddress);
            // 繼續其他初始化操作
            this._initializeState();
            this._checkResumeExist();
        });
        this.setState({ isInitialized: true });
    }

    async _initializeState() {
        console.log("=====Initialize resume=====");
        // We first initialize ethers by creating a provider using window.ethereum
        this._provider = new ethers.providers.Web3Provider(window.ethereum);
        // Then, we initialize the contract using that provider and the token's
        // artifact. You can do this same thing with your contracts.
        this._resume = new ethers.Contract(
            contractAddress.Resume,
            ResumeArtifact.abi,
            this._provider.getSigner(0)
        );
        console.log("=====Initialize resume done=====")
        // We first initialize ethers by creating a provider using window.ethereum
        console.log("=====Initialize ethers=====");
        this._provider = new ethers.providers.Web3Provider(window.ethereum);
        console.log("Provider: " + this._provider);
        console.log("Address: " + this.state.selectedAddress);
        const balance = await this._provider.getBalance(this.state.selectedAddress);
        console.log("Balance: " + balance);
        this.setState({ balance });
        console.log("=====Initialize ethers done=====");
        console.log("=====Initialize network data=====");
        const network = await this._provider.getNetwork();
        const chainId = network.chainId;
        let name = network.name;
        if (name === "unknown") {
            name = "Hardhat Network";
        }
        this.setState({ networkData: { name, chainId } });
        console.log("=====Initialize network data done=====");
    }

    // The next two methods are needed to start and stop polling data. While
    // the data being polled here is specific to this example, you can use this
    // pattern to read any data from your contracts.
    //
    // Note that if you don't need it to update in near real time, you probably
    // don't need to poll it. If that's the case, you can just fetch it when you
    // initialize the app, as we do with the token data.
    _startPollingData() {
        this._pollDataInterval = setInterval(() => this._updateBalance(), 1000);

        // Polling network data
        this._pollNetworkDataInterval = setInterval(() => this._updateNetworkData(), 5000);

        // We run it once immediately so we don't have to wait for it
        this._updateBalance();
        this._updateNetworkData();
    }

    _stopPollingData() {
        clearInterval(this._pollDataInterval);
        clearInterval(this._pollNetworkDataInterval);
        this._pollDataInterval = undefined;
        this._pollNetworkDataInterval = undefined;
    }

    async _updateBalance() {
        // We first initialize ethers by creating a provider using window.ethereum
        this._provider = new ethers.providers.Web3Provider(window.ethereum);
        const balance = await this._provider.getBalance(this.state.selectedAddress);
        this.setState({ balance });
    }

    async _updateNetworkData() {
        console.log("=====Update network data=====");
        // We first initialize ethers by creating a provider using window.ethereum
        this._provider = new ethers.providers.Web3Provider(window.ethereum);
        const network = await this._provider.getNetwork();
        const chainId = network.chainId;
        let name = network.name;
        if (name === "unknown") {
            name = "Hardhat Network";
        }
        this.setState({ networkData: { name, chainId } }, () => {
            console.log("Network data: " + this.state.networkData);
        });
    }

    // This method just clears part of the state.
    _dismissTransactionError() {
        this.setState({ transactionError: undefined });
    }

    // This method just clears part of the state.
    _dismissNetworkError() {
        this.setState({ networkError: undefined });
    }

    // This is an utility method that turns an RPC error into a human readable
    // message.
    _getRpcErrorMessage(error) {
        if (error.data) {
            return error.data.message;
        }

        return error.message;
    }

    // This method resets the state
    _resetState() {
        this.setState(this.initialState);
    }
    // Send transaction to add personal resume
    async _addResume(name, email, github, about, skills, experiences, education, projects) {
        let dataValid = this._checkData(name, email, github, about, skills, experiences, education, projects);
        if (!dataValid) {
            console.log("Data is not valid");
            return;
        }
        try {
            this._dismissTransactionError();
            const tx = await this._resume.addResume(name, email, github, about, skills, experiences, education, projects);
            this.setState({ txBeingSent: tx.hash });
            const receipt = await tx.wait();
            if (receipt.status === 0) {
                throw new Error("Transaction failed");
            }
            await this._updateResumeState();
        } catch (error) {
            if (error.code === ERROR_CODE_TX_REJECTED_BY_USER) {
                return;
            }
            console.error(error);
            this.setState({ transactionError: error });
        } finally {
            this.setState({ txBeingSent: undefined });
            await this._checkResumeExist();
        }
    }
    // This method updates the state of the application with the user's resume
    async _updateResumeState() {
        // Get resume on blockchain
        console.log("=====Update resume state=====");
        const resume = await this._resume.getUserResume();
        const skills = await this._resume.getSkills();
        const experiences = await this._resume.getExperiences();
        const education = await this._resume.getEducation();
        const projects = await this._resume.getProjects();
        let personalResume = {
            name: resume.name,
            email: resume.email,
            github: resume.github,
            about: resume.about,
            skills: skills,
            experiences: experiences,
            education: education,
            projects: projects
        };
        console.log("Personal resume: " + personalResume);
        this.setState({ personalResume });
    }
    // This method will send transaction to update personal resume
    async _updatePersonalResume(name, email, github, about, skills, experiences, education, projects) {
        this._checkData(name, email, github, about, skills, experiences, education, projects);
        try {
            this._dismissTransactionError();
            const tx = await this._resume.updateResume(name, email, github, about, skills, experiences, education, projects);
            this.setState({ txBeingSent: tx.hash });
            const receipt = await tx.wait();
            if (receipt.status === 0) {
                throw new Error("Transaction failed");
            }
            await this._updateResumeState();
        } catch (error) {
            if (error.code === ERROR_CODE_TX_REJECTED_BY_USER) {
                return;
            }
            console.error(error);
            this.setState({ transactionError: error });
        } finally {
            this.setState({ txBeingSent: undefined });
            this.setState({ isUpdate: false });
        }
    }

    _checkIsOwner() {
        return contractAddress.Owner === this.state.selectedAddress;
    }

    async _checkResumeExist() {
        try {
            const userAddress = this.state.selectedAddress;
            console.log("[Check resume exist][Address]: " + userAddress);

            // Check if the resume has checkIsCreated function
            const isCreated = await this._resume.checkIsCreated();
            // If the resume has checkIsCreated function, update the resume state
            console.log("[Check resume exist][Is created]: " + isCreated);
            if (isCreated) {
                await this._updateResumeState();
            }
            this.setState({ isCreated });
            return isCreated;
        } catch (error) {
            console.error("Error checking resume existence:", error);
            // Handle the error here, e.g., show an error message to the user
            // You can also set this.setState({ isCreated: false }) if needed
            return false;
        }
    }

    async _switchChain() {
        const chainIdHex = `0x${HARDHAT_NETWORK_ID.toString(16)}`
        await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: chainIdHex }],
        });
        this._initialize(this.state.selectedAddress);
    }

    async _updateButton() {
        this.setState({ isUpdate: true });
    }

    async _deleteButton() {
        // Here we pop up a confirmation dialog. If the user confirms, then we
        // proceed to delete the resume.
        if (!window.confirm("Are you sure you want to delete your resume?")) {
            return;
        }
        else {
            try {
                this._dismissTransactionError();
                const tx = await this._resume.deleteResume();
                this.setState({ txBeingSent: tx.hash });
                const receipt = await tx.wait();
                if (receipt.status === 0) {
                    throw new Error("Transaction failed");
                }
                this.setState({ personalResume: undefined });
                this.setState({ isCreated: false });
            } catch (error) {
                if (error.code === ERROR_CODE_TX_REJECTED_BY_USER) {
                    return;
                }
                console.error(error);
                this.setState({ transactionError: error });
            } finally {
                this.setState({ txBeingSent: undefined });
                await this._checkResumeExist();
            }
        }
    }

    // This method checks if the selected network is Localhost:8545
    _checkNetwork() {
        if (window.ethereum.networkVersion !== HARDHAT_NETWORK_ID) {
            this._switchChain();
        }
    }

    // This method checks if the data is valid
    _checkData(name, email, github, about, skills, experiences, education, projects) {
        if (name === undefined || name === "") {
            return false;
        }
        // if (email === undefined) {
        //     return false;
        // }
        // if (github === undefined) {
        //     return false;
        // }
        // if (about === undefined) {
        //     return false;
        // }
        // if (skills === undefined) {
        //     return false;
        // }
        // if (experiences === undefined) {
        //     return false;
        // }
        // if (education === undefined) {
        //     return false;
        // }
        // if (projects === undefined) {
        //     return false;
        // }
        return true;
    }
}