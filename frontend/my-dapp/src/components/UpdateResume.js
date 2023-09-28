import React from "react";

export function UpdateResume({ updateResume }) {
    return (
        <div>
            <h4>Update Resume</h4>
            <p>Update your resume here.</p>
            <form
                onSubmit={(event) => {
                    event.preventDefault();

                    const formData = new FormData(event.target),
                    const name = formData.get("name"),
                    const email = formData.get("email"),
                    const phone = formData.get(""),

                    this.props.updateResume(newResume);
                }}
            >
                <div className="form-group">
                    <label>Amount of {tokenSymbol}</label>
                    <input
                        className="form-control"
                        type="number"
                        step="1"
                        name="amount"
                        placeholder="1"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Recipient address</label>
                    <input className="form-control" type="text" name="to" required />
                </div>
                <div className="form-group">
                    <input className="btn btn-primary" type="submit" value="Transfer" />
                </div>
            </form>

        </div>
    );
}