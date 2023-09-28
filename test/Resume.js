const {
    time,
    loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Resume", function () {
    let resume;
    // Test the Resume contract
    // 0. Deploy the contract
    async function deployResumeFixture() {
        [signer, user1] = await ethers.getSigners();
        const Resume = await ethers.getContractFactory("Resume");
        const resume = await Resume.deploy();
        //console.log(resume.target);
        return { resume, signer, user1 };
    }

    describe("Deployment", function () {
        it("Should set the right owner", async function () {
            const { resume, signer } = await loadFixture(deployResumeFixture);
            expect(await resume.owner()).to.equal(signer.address);
        });
    });
    describe("Resume methods", function () {
        beforeEach(async function () {
            // read the resume from fixture
            ({ resume, signer, user1 } = await loadFixture(deployResumeFixture));
        });
        describe("Test before add a resume", function () {
            it("Should fail if the user not yet add but try to get the resume", async function () {
                await expect(resume.connect(user1).getUserResume()).to.be.revertedWith("Resume: Resume not exist");
            });
            it("Should fail if the user not yet add but try to get the resume property", async function () {
                await expect(resume.connect(user1).getEducation()).to.revertedWith("Resume: Resume not exist");
                await expect(resume.connect(user1).getExperiences()).to.revertedWith("Resume: Resume not exist");
                await expect(resume.connect(user1).getProjects()).to.revertedWith("Resume: Resume not exist");
                await expect(resume.connect(user1).getSkills()).to.revertedWith("Resume: Resume not exist");
            });
            it("Should fail if the user not yet add but try to update the resume", async function () {
                await expect(resume.connect(user1).updateName("Jasper")).to.be.revertedWith("Resume: Resume not exist");
                await expect(resume.connect(user1).updateEmail("123")).to.be.revertedWith("Resume: Resume not exist");
                await expect(resume.connect(user1).updateGithub("123")).to.be.revertedWith("Resume: Resume not exist");
                await expect(resume.connect(user1).updateAbout("123")).to.be.revertedWith("Resume: Resume not exist");
                await expect(resume.connect(user1).updateSkills(["123"])).to.be.revertedWith("Resume: Resume not exist");
                await expect(resume.connect(user1).updateExperiences(["123"])).to.be.revertedWith("Resume: Resume not exist");
                await expect(resume.connect(user1).updateEducation(["123"])).to.be.revertedWith("Resume: Resume not exist");
                await expect(resume.connect(user1).updateProjects(["123"])).to.be.revertedWith("Resume: Resume not exist");
            });
            it("Should fail if the user not yet add but try to delete the resume", async function () {
                await expect(resume.connect(user1).deleteResume()).to.be.revertedWith("Resume: Resume not exist");
            });
            it("Should fail if the user try to call the owner function but not the owner", async function () {
                await expect(resume.connect(user1).getUserResumeByOwner(user1.address)).to.be.revertedWith("Ownable: caller is not the owner");
                await expect(resume.connect(user1).getIsCreatedByOwner(user1.address)).to.be.revertedWith("Ownable: caller is not the owner");
            });
            it("Should get the create event after add a resume", async function () {
                expect(await resume.connect(user1).addResume("Jasper",
                    "apple037037@gmail.com",
                    "https://github.com/apple037",
                    "I am a developer",
                    ["Solidity", "JavaScript", "Java", "Python"],
                    ["Developer", "2021-2021", "I am a developer"],
                    ["National Chung Hsing University 2014-2021"],
                    ["Rusted Stanley"])).to.emit(resume, "CreateResume").withArgs(user1.address, "Jasper");
            });
        });
        describe("Test after add a resume", function () {
            // beforeEach add a resume
            beforeEach(async function () {
                // Add a new resume first
                await resume.connect(user1).addResume("Jasper",
                    "apple037037@gmail.com",
                    "https://github.com/apple037",
                    "I am a developer",
                    ["Solidity", "JavaScript", "Java", "Python"],
                    ["Developer", "2021-2021", "I am a developer"],
                    ["National Chung Hsing University 2014-2021"],
                    ["Rusted Stanley"]);
            });
            describe("User function", function () {
                it("Should fail if the user has already created a resume", async function () {
                    // Add a new resume again
                    await expect(resume.connect(user1).addResume("Jasper", "apple037037@gmail.com",
                        "https://github.com/apple037",
                        "I am a developer",
                        ["Solidity", "JavaScript", "Java", "Python"],
                        ["Developer", "2021-2021", "I am a developer"],
                        ["National Chung Hsing University 2014-2021"],
                        ["Rusted Stanley"])).to.be.revertedWith("Resume: Resume already exist");
                });
                it("Should get the resume after add a resume", async function () {
                    let userResume = await resume.connect(user1).getUserResume();
                    const actualName = userResume.name;
                    const expectedName = "Jasper";
                    expect(actualName, "Name comparison").to.equal(expectedName);
                    const actualEmail = userResume.email;
                    const expectedEmail = "apple037037@gmail.com";
                    expect(actualEmail, "Email comparison").to.equal(expectedEmail);
                    const actualGithub = userResume.github;
                    const expectedGithub = "https://github.com/apple037"
                    expect(actualGithub, "Github comparison").to.equal(expectedGithub);
                    const actualAbout = userResume.about;
                    const expectedAbout = "I am a developer";
                    expect(actualAbout, "About comparison").to.equal(expectedAbout);
                    const actualSkills = await resume.connect(user1).getSkills();
                    const expectedSkills = ["Solidity", "JavaScript", "Java", "Python"];
                    expect(actualSkills, "Skills comparison").to.deep.equal(expectedSkills);
                    const actualExperiences = await resume.connect(user1).getExperiences();
                    const expectedExperiences = ["Developer", "2021-2021", "I am a developer"];
                    expect(actualExperiences, "Experiences comparison").to.deep.equal(expectedExperiences);
                    const actualEducation = await resume.connect(user1).getEducation();
                    const expectedEducation = ["National Chung Hsing University 2014-2021"];
                    expect(actualEducation, "Education comparison").to.deep.equal(expectedEducation);
                    const actualProjects = await resume.connect(user1).getProjects();
                    const expectedProjects = ["Rusted Stanley"];
                    expect(actualProjects, "Projects comparison").to.deep.equal(expectedProjects);
                });
                it("Should get the updated resume after update a resume", async function () {
                    // Update the resume
                    await resume.connect(user1).updateName("Jasper2");
                    await resume.connect(user1).updateEmail("ouo");
                    await resume.connect(user1).updateGithub("ououo");
                    await resume.connect(user1).updateAbout("ouououo");
                    await resume.connect(user1).updateSkills(["ouo"]);
                    await resume.connect(user1).updateExperiences(["ouo/"]);
                    await resume.connect(user1).updateEducation(["ouo//"]);
                    await resume.connect(user1).updateProjects(["ouo///"]);
                    let userResume = await resume.connect(user1).getUserResume();
                    const actualName = userResume.name;
                    const expectedName = "Jasper2";
                    expect(actualName, "Name comparison").to.equal(expectedName);
                    const actualEmail = userResume.email;
                    const expectedEmail = "ouo";
                    expect(actualEmail, "Email comparison").to.equal(expectedEmail);
                    const actualGithub = userResume.github;
                    const expectedGithub = "ououo"
                    expect(actualGithub, "Github comparison").to.equal(expectedGithub);
                    const actualAbout = userResume.about;
                    const expectedAbout = "ouououo";
                    expect(actualAbout, "About comparison").to.equal(expectedAbout);
                    const actualSkills = await resume.connect(user1).getSkills();
                    const expectedSkills = ["ouo"];
                    expect(actualSkills, "Skills comparison").to.deep.equal(expectedSkills);
                    const actualExperiences = await resume.connect(user1).getExperiences();
                    const expectedExperiences = ["ouo/"];
                    expect(actualExperiences, "Experiences comparison").to.deep.equal(expectedExperiences);
                    const actualEducation = await resume.connect(user1).getEducation();
                    const expectedEducation = ["ouo//"];
                    expect(actualEducation, "Education comparison").to.deep.equal(expectedEducation);
                    const actualProjects = await resume.connect(user1).getProjects();
                    const expectedProjects = ["ouo///"];
                    expect(actualProjects, "Projects comparison").to.deep.equal(expectedProjects);
                });
                it("Should get the UpdateResume or UpdateResumeArray event after update a resume", async function () {
                    expect(await resume.connect(user1).updateName("Jasper2")).to.emit(resume, "UpdateResume").withArgs(user1.address, "name", "Jasper2");
                    expect(await resume.connect(user1).updateEmail("ouo")).to.emit(resume, "UpdateResume").withArgs(user1.address, "email", "ouo");
                    expect(await resume.connect(user1).updateGithub("ououo")).to.emit(resume, "UpdateResume").withArgs(user1.address, "github", "ououo");
                    expect(await resume.connect(user1).updateAbout("ouououo")).to.emit(resume, "UpdateResume").withArgs(user1.address, "about", "ouououo");
                    expect(await resume.connect(user1).updateSkills(["ouo"])).to.emit(resume, "UpdateResumeArray").withArgs(user1.address, "skills", ["ouo"]);
                    expect(await resume.connect(user1).updateExperiences(["ouo/"])).to.emit(resume, "UpdateResumeArray").withArgs(user1.address, "experiences", ["ouo/"]);
                    expect(await resume.connect(user1).updateEducation(["ouo//"])).to.emit(resume, "UpdateResumeArray").withArgs(user1.address, "education", ["ouo//"]);
                    expect(await resume.connect(user1).updateProjects(["ouo///"])).to.emit(resume, "UpdateResumeArray").withArgs(user1.address, "projects", ["ouo///"]);
                });
                it("Should fail if the user try to get the resume after delete the resume", async function () {
                    // Delete the resume
                    await resume.connect(user1).deleteResume();
                    await expect(resume.connect(user1).getUserResume()).to.be.revertedWith("Resume: Resume not exist");
                });
            });
            describe("Owner function", function () {
                it("Should fail if the user try to delete the resume but not the owner", async function () {
                    await expect(resume.connect(user1).deleteResumeByOwner(user1.address)).to.be.revertedWith("Ownable: caller is not the owner");
                });
                it("Should revert when the resume is not exist", async function () {
                    await expect(resume.connect(signer).deleteResumeByOwner(signer.address)).to.be.revertedWith("Resume: Resume not exist");
                });
                it("Should get the emtpy resume using owner function after delete the resume by owner", async function () {
                    // Delete the resume
                    await resume.connect(signer).deleteResumeByOwner(user1.address);
                    let userResume = await resume.connect(signer).getUserResumeByOwner(user1.address);
                    const actualName = userResume.name;
                    const expectedName = "";
                    expect(actualName, "Name comparison").to.equal(expectedName);
                    let isCreated = await resume.connect(signer).getIsCreatedByOwner(user1.address);
                    expect(isCreated, "isCreated comparison").to.equal(false);
                });
                it("Should get the DeleteResume event after delete the resume", async function () {
                    expect(await resume.connect(user1).deleteResume()).to.emit(resume, "DeleteResume").withArgs(user1.address);
                });
                it("Should get the DeleteResumeByOwner event after delete the resume by owner", async function () {
                    expect(await resume.connect(signer).deleteResumeByOwner(user1.address)).to.emit(resume, "DeleteResume").withArgs(user1.address);
                });
                it("Should revert if the user try to call checkListCreated the resume but not the owner", async function () {
                    await expect(resume.connect(user1).checkListCreated([user1.address])).to.be.revertedWith("Ownable: caller is not the owner");
                });
                it("Should revert by list not empty if the user try to call checkListCreated the resume but input nothing", async function () {
                    await expect(resume.connect(signer).checkListCreated([])).to.be.revertedWith("Resume: list is empty");
                });
                it("checkListCreated should return true after add a resume", async function () {
                    let adr_list = [user1.address];
                    let isCreated = await resume.connect(signer).checkListCreated(adr_list);
                    expect(isCreated, "isCreated comparison").to.equal(true);
                });
                it("checkListCreated should return false when an address doesn't create a resume yet", async function () {
                    let adr_list = [user1.address, signer.address];
                    let isCreated = await resume.connect(signer).checkListCreated(adr_list);
                    expect(isCreated, "isCreated comparison").to.equal(false);
                });
            });
        });
    });
});