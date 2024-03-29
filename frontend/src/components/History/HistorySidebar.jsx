import React, { useState, useEffect } from "react";
import "./HistorySidebar.css";
import Button from "../common/Button/Button";
import deleteIcon from "../../assets/icons/deleteIcon.svg";

const HistorySidebar = ({ isOpen, onClose }) => {
    const [historyLogs, setHistoryLogs] = useState([]);

    useEffect(() => {
        if (isOpen) {
            fetch("http://localhost:3001/activity-logs")
                .then((response) => response.json())
                .then((data) => setHistoryLogs(data.reverse()))
                .catch((error) =>
                    console.log("Error loading history logs:", error)
                );
        }
    }, [isOpen]);

    const clearHistory = () => {
        fetch("http://localhost:3001/activity-logs", { method: "DELETE" })
            .then((response) => {
                if (response.ok) {
                    setHistoryLogs([]);
                    console.log("History cleared successfully");
                }
            })
            .catch((error) => console.error("Failed to clear history:", error));
    };

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (isOpen && !event.target.closest(".history-sidebar")) {
                onClose();
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [isOpen, onClose]);

    return (
        <aside className={`history-sidebar ${isOpen ? "open" : ""}`}>
            <div className="history-buttons-container">
                <Button onClick={onClose}>Close</Button>
                <Button onClick={clearHistory} icon={deleteIcon}>
                    Clear
                </Button>
            </div>
            <ul>
                {historyLogs.map((log) => (
                    <li key={log.id}>
                        <p>{log.description}</p>
                        <small>
                            {new Date(log.timestamp).toLocaleString("en-US", {
                                month: "short",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: true,
                            })}
                        </small>
                    </li>
                ))}
            </ul>
        </aside>
    );
};

export default HistorySidebar;
