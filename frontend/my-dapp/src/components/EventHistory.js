import React from "react";

export function EventHistory(props) {
    const { eventHistory } = props;

    if (!eventHistory || eventHistory.length === 0) {
        return <div>No events found.</div>;
    }

    const reversedEventHistory = eventHistory.slice().reverse();

    return (
        <div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Event Name</th>
                        <th scope="col">Event Arguments</th>
                        <th scope="col">Timestamp</th>
                    </tr>
                </thead>
                <tbody>
                    {reversedEventHistory.map((event, index) => (
                        <tr key={index}>
                            <td>{event.event}</td>
                            <td>{JSON.stringify(event.args)}</td>
                            <td>{event.timestamp}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
