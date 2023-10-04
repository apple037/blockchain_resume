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


                    updateResume(newResume);
                }}
            >
                //
                <div className="form-group">
                    <label>Name</label>
                    <input className="form-control" type="text" name="name" placeholder="" required />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input className="form-control" type="text" name="email" required />
                </div>
                <div className="form-group">
                    <label>Github</label>
                    <input className="form-control" type="text" name="github" required />
                </div>
                <div className="form-group">
                    <label>About</label>
                    <input className="form-control" type="text" name="about" required />
                </div>
                {/**Add array property */}
                <div className="form-group">
                    <label>Skills</label>
                    <input className="form-control" type="text" name="skills" required />
                </div>
                <div className="form-group">
                    <input className="btn btn-primary" type="submit" value="Update" />
                </div>
            </form>

        </div>
    );
}