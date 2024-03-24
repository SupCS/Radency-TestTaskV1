import React from "react";
import "./List.css"; // Убедитесь, что создали и подключили CSS файл для стилизации
import Task from "../Task/Task";
import Button from "../common/button/Button";
import plusIconLight from "../../assets/icons/plusIconLight.svg";
import kebabIcon from "../../assets/icons/kebabIcon.svg";

const List = ({ title, tasks }) => {
    return (
        <div className="column">
            <div className="column-header-container">
                <h2 className="column-title">{title}</h2>
                <button className="kebab-menu-button">
                    <img className="kebab-icon" src={kebabIcon}></img>
                </button>
            </div>
            <Button icon={plusIconLight} dark>
                Add new task
            </Button>
            <div className="tasks-list">
                {tasks.map((task, index) => (
                    <Task
                        key={index}
                        taskName={task.taskName}
                        taskDescription={task.taskDescription}
                        dueDate={task.dueDate}
                        priority={task.priority}
                    />
                ))}
            </div>
        </div>
    );
};

export default List;
