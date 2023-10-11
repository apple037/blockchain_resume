import React from "react";

export function CreateResume({ createResume }) {
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
                    const skills = formData.get("skills").split(',').map(skill => skill.trim()); // 將輸入拆分成技能陣列
                    const education = formData.get("education").split(',').map(edu => edu.trim());
                    const experience = formData.get("experience").split(',').map(exp => exp.trim());
                    const projects = formData.get("projects").split(',').map(pro => pro.trim());
                    // Name is required
                    if (!name) {
                        return;
                    }
                    else {
                        console.log("Name: " + name);
                        console.log("Email: " + email);
                        console.log("Github: " + github);
                        console.log("About: " + about);
                        console.log("Skills: " + skills);
                        console.log("Education: " + education);
                        console.log("Experience: " + experience);
                        console.log("Projects: " + projects);
                        createResume(name, email, github, about, skills, education, experience, projects);
                    }
                }}
            >
                <div className="form-group">
                    <label>Name</label>
                    <input className="form-control" type="text" name="name" placeholder="" required />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input className="form-control" type="text" name="email" />
                </div>
                <div className="form-group">
                    <label>Github</label>
                    <input className="form-control" type="text" name="github" />
                </div>
                <div className="form-group">
                    <label>About</label>
                    <input className="form-control" type="text" name="about" />
                </div>
                {/**Add array property */}
                <div className="form-group">
                    <label>Skills</label>
                    <input className="form-control" type="text" name="skills" />
                </div>
                <div className="form-group">
                    <label>Education</label>
                    <input className="form-control" type="text" name="education" />
                </div>
                <div className="form-group">
                    <label>Experience</label>
                    <input className="form-control" type="text" name="experience" />
                </div>
                <div className="form-group">
                    <label>Projects</label>
                    <input className="form-control" type="text" name="projects" />
                </div>
                <div className="form-group">
                    <input className="btn btn-primary" type="submit" value="Create" />
                </div>
            </form>
        </div>
    );
}