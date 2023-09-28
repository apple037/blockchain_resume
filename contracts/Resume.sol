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

    event UpdateResume(address user);
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

    function updateResume(
        string memory name,
        string memory email,
        string memory github,
        string memory about,
        string[] memory skills,
        string[] memory experiences,
        string[] memory education,
        string[] memory projects
    ) public {
        // Check mapping exist
        require(isCreated[msg.sender] == true, "Resume: Resume not exist");
        // Update resume
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
        // Emit event
        emit UpdateResume(msg.sender);
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
    function checkIsCreated() public view returns (bool) {
        return isCreated[msg.sender];
    }

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

    // 檢查 list 是否都有建立履歷
    function checkListCreated(
        address[] memory list
    ) public view onlyOwner returns (bool) {
        require(list.length > 0, "Resume: list is empty");
        bool result = true;
        for (uint256 i = 0; i < list.length; i++) {
            result = result && isCreated[list[i]];
        }
        return result;
    }
}
