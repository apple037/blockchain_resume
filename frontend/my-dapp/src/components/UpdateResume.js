import React from "react";

export function UpdateResume({ updateResume, personalResume }) {
    return (
        <div>
            <h4>Update Resume</h4>
            <p>Update your resume here.</p>
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
                    // array property set default value
                    if (!skills) {
                        skills = [];
                    }
                    if (!education) {
                        education = [];
                    }
                    if (!experience) {
                        experience = [];
                    }
                    if (!projects) {
                        projects = [];
                    }

                    updateResume(name, email, github, about, skills, education, experience, projects);
                }}
            >
                {/**Add default value */}
                <div className="form-group">
                    <label>Name</label>
                    <input className="form-control" type="text" name="name" placeholder="" defaultValue={personalResume.name} required />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input className="form-control" type="text" name="email" defaultValue={personalResume.email} />
                </div>
                <div className="form-group">
                    <label>Github</label>
                    <input className="form-control" type="text" name="github" defaultValue={personalResume.github} />
                </div>
                <div className="form-group">
                    <label>About</label>
                    <input className="form-control" type="text" name="about" defaultValue={personalResume.about} />
                </div>
                {/**Add array property */}
                <div className="form-group">
                    <label>Skills</label>
                    <input className="form-control" type="text" name="skills" defaultValue={personalResume.skills} />
                </div>
                <div className="form-group">
                    <label>Education</label>
                    <input className="form-control" type="text" name="education" defaultValue={personalResume.education} />
                </div>
                <div className="form-group">
                    <label>Experience</label>
                    <input className="form-control" type="text" name="experience" defaultValue={personalResume.experience} />
                </div>
                <div className="form-group">
                    <label>Projects</label>
                    <input className="form-control" type="text" name="projects" defaultValue={personalResume.projects} />
                </div>
                <div className="form-group">
                    <input className="btn btn-primary" type="submit" value="Update" />
                </div>
            </form>

        </div >
    );
}