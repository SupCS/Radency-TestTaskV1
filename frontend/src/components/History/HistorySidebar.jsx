import React from "react";
import "./HistorySidebar.css";
import Button from "../common/Button/Button";
import deleteIcon from "../../assets/icons/deleteIcon.svg";

const HistorySidebar = ({ isOpen, onClose, logs, onClearHistory }) => {
    return (
        <aside className={`history-sidebar ${isOpen ? "open" : ""}`}>
            <div className="history-buttons-container">
                <Button onClick={onClose}>Close</Button>
                <Button onClick={onClearHistory} icon={deleteIcon}>
                    Clear
                </Button>
            </div>
            <ul>
                {logs &&
                    logs.map((log) => (
                        <li key={log.id}>
                            <p>{log.description}</p>
                            <small>
                                {new Date(log.timestamp).toLocaleString(
                                    "en-US",
                                    {
                                        month: "short",
                                        day: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        hour12: true,
                                    }
                                )}
                            </small>
                        </li>
                    ))}
            </ul>
        </aside>
    );
};

export default HistorySidebar;
