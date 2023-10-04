import React from "react";

export function UpdateResume({ createResume }) {
    // Here we will add a form to add the resume
    return (
        <div>
            <h4>Create Resume</h4>
            <p>Create your resume here.</p>
            <form
                onSubmit={(event) => {
                    event.preventDefault();

                    const formData = new FormData(event.target);
                    const name = formData.get("name");
                    const email = formData.get("email");
                    const github = formData.get("github");
                    const about = formData.get("about");
                    const skills = formData.get("skills");
                    const education = formData.get("education");
                    const experience = formData.get("experience");
                    const projects = formData.get("projects");
                    // Name is required
                    if (!name) {
                        return;
                    }
                    const newResume = {
                        name,
                        email,
                        github,
                        about,
                        skills,
                        education,
                        experience,
                        projects,
                    };
                }}
            >
            </form>
        </div>
    );
}