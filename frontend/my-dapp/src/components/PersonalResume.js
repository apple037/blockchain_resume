import React from "react";

export function PersonalResume({ personalResume }) {
    return (
        <div>
            <h4>Your Resume</h4>
            <p>Your resume here.</p>
            {/**Print resume from state */}
            <p>Name: {personalResume.name}</p>
            <p>Email: {personalResume.email}</p>
            <p>Github: {personalResume.github}</p>
            <p>About: {personalResume.about}</p>
            {/**Print array property state */}
            <p>Skills: {personalResume.skills}</p>
            <p>Education: {personalResume.education}</p>
            <p>Experience: {personalResume.experience}</p>
            <p>Projects: {personalResume.projects}</p>
        </div>
    );
}