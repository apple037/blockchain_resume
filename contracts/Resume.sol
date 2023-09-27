// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/access/Ownable.sol";

contract Resume is Ownable {
    struct UserResume {
        string name;
        string email;
        string github;
        string about;
        string[] skills;
        string[] experiences;
        string[] education;
        string[] projects;
    }

    event UpdateResume(address user, string columnName, string value);
    event UpdateResumeArray(address user, string columnName, string[] value);
    event CreateResume(address user, string name);
    event DeleteResume(address user);

    constructor() {}

    mapping(address => UserResume) private userResumes;
    mapping(address => bool) private isCreated;

    /** Public Set Functions */
    function addResume(
        string memory name,
        string memory email,
        string memory github,
        string memory about,
        string[] memory skills,
        string[] memory experiences,
        string[] memory education,
        string[] memory projects
    ) public {
        // Check mapping not exist
        require(isCreated[msg.sender] == false, "Resume: Resume already exist");
        // Add resume
        userResumes[msg.sender] = UserResume(
            name,
            email,
            github,
            about,
            skills,
            experiences,
            education,
            projects
        );
        // Set mapping to true
        isCreated[msg.sender] = true;
        // Emit event
        emit CreateResume(msg.sender, name);
    }

    function updateName(string memory name) public {
        // Check mapping exist
        require(isCreated[msg.sender] == true, "Resume: Resume not exist");
        // Update name
        userResumes[msg.sender].name = name;
        // Emit event
        emit UpdateResume(msg.sender, "name", name);
    }

    function updateEmail(string memory email) public {
        // Check mapping exist
        require(isCreated[msg.sender] == true, "Resume: Resume not exist");
        // Update email
        userResumes[msg.sender].email = email;
        // Emit event
        emit UpdateResume(msg.sender, "email", email);
    }

    function updateGithub(string memory github) public {
        // Check mapping exist
        require(isCreated[msg.sender] == true, "Resume: Resume not exist");
        // Update github
        userResumes[msg.sender].github = github;
        // Emit event
        emit UpdateResume(msg.sender, "github", github);
    }

    function updateAbout(string memory about) public {
        // Check mapping exist
        require(isCreated[msg.sender] == true, "Resume: Resume not exist");
        // Update about
        userResumes[msg.sender].about = about;
        // Emit event
        emit UpdateResume(msg.sender, "about", about);
    }

    function updateSkills(string[] memory skills) public {
        // Check mapping exist
        require(isCreated[msg.sender] == true, "Resume: Resume not exist");
        // Update skills
        userResumes[msg.sender].skills = skills;
        // Emit event
        emit UpdateResumeArray(msg.sender, "skills", skills);
    }

    function updateExperiences(string[] memory experiences) public {
        // Check mapping exist
        require(isCreated[msg.sender] == true, "Resume: Resume not exist");
        // Update experiences
        userResumes[msg.sender].experiences = experiences;
        // Emit event
        emit UpdateResumeArray(msg.sender, "experiences", experiences);
    }

    function updateEducation(string[] memory education) public {
        // Check mapping exist
        require(isCreated[msg.sender] == true, "Resume: Resume not exist");
        // Update education
        userResumes[msg.sender].education = education;
        // Emit event
        emit UpdateResumeArray(msg.sender, "education", education);
    }

    function updateProjects(string[] memory projects) public {
        // Check mapping exist
        require(isCreated[msg.sender] == true, "Resume: Resume not exist");
        // Update projects
        userResumes[msg.sender].projects = projects;
        // Emit event
        emit UpdateResumeArray(msg.sender, "projects", projects);
    }

    // 刪除履歷
    function deleteResume() public {
        // Check mapping exist
        require(isCreated[msg.sender] == true, "Resume: Resume not exist");
        // Delete resume
        delete userResumes[msg.sender];
        // Set mapping to false
        isCreated[msg.sender] = false;
        // Emit event
        emit DeleteResume(msg.sender);
    }

    /** Public Get Functions */
    function getUserResume() public view returns (UserResume memory) {
        require(isCreated[msg.sender] == true, "Resume: Resume not exist");
        return userResumes[msg.sender];
    }

    function getSkills() public view returns (string[] memory) {
        require(isCreated[msg.sender] == true, "Resume: Resume not exist");
        return userResumes[msg.sender].skills;
    }

    function getExperiences() public view returns (string[] memory) {
        require(isCreated[msg.sender] == true, "Resume: Resume not exist");
        return userResumes[msg.sender].experiences;
    }

    function getEducation() public view returns (string[] memory) {
        require(isCreated[msg.sender] == true, "Resume: Resume not exist");
        return userResumes[msg.sender].education;
    }

    function getProjects() public view returns (string[] memory) {
        require(isCreated[msg.sender] == true, "Resume: Resume not exist");
        return userResumes[msg.sender].projects;
    }

    /** Only Owner Function */

    // 刪除履歷 by owner
    function deleteResumeByOwner(address user) public onlyOwner {
        // Check mapping exist
        require(isCreated[user] == true, "Resume: Resume not exist");
        // Delete resume
        delete userResumes[user];
        // Set mapping to false
        isCreated[user] = false;
        // Emit event
        emit DeleteResume(msg.sender);
    }

    function getUserResumeByOwner(
        address user
    ) public view onlyOwner returns (UserResume memory) {
        return userResumes[user];
    }

    function getIsCreatedByOwner(
        address user
    ) public view onlyOwner returns (bool) {
        return isCreated[user];
    }
}
