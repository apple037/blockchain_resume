import React from "react";

export function PersonalResume({ personalResume }) {
    return (
        <div>
            <h4>Your Resume</h4>
            {/**Print resume from state */}
            <p>Name: {personalResume.name}</p>
            <p>Email: {personalResume.email}</p>
            <p>Github: {personalResume.github}</p>
            <p>About: {personalResume.about}</p>
            {/**Print array property state */}
            {personalResume.skills && <p>Skills: {personalResume.skills.join(', ')}</p>}
            {personalResume.education && <p>Education: {personalResume.education.join(', ')}</p>}
            {personalResume.experience && <p>Experience: {personalResume.experience.join(', ')}</p>}
            {personalResume.projects && <p>Projects: {personalResume.projects.join(', ')}</p>}
        </div>
    );
}