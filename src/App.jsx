import "./App.css";
import plusIconLight from "./assets/icons/plusIconLight.svg";
import historyIcon from "./assets/icons/historyIcon.svg";
import Button from "./components/common/button/Button";
import List from "./components/List/List";

const todoTasks = [
    {
        taskName: "Початок проекту",
        taskDescription:
            "Створити UI, набір зручних для використання компонентів, щоб потім було легше розробляти",
        dueDate: "2024-03-26",
        priority: "high",
    },
    {
        taskName: "Розробка проекту",
        taskDescription:
            "Створити UI, набір зручних для використання компонентів, щоб потім було легше розробляти",
        dueDate: "2024-03-26",
        priority: "low",
    },
    {
        taskName: "Представлення проекту",
        taskDescription:
            "Створити UI, набір зручних для використання компонентів, щоб потім було легше розробляти",
        dueDate: "2024-03-26",
        priority: "medium",
    },
];

function App() {
    return (
        <div className="App">
            <div className="container">
                {/* <Button icon={historyIcon}>Кнопка</Button>
                <Button icon={plusIconLight} dark>
                    Темна кнопка
                </Button> */}
                <div className="columns-wrapper">
                    <List title="To Do" tasks={todoTasks} />
                    <List title="In Progress" tasks={todoTasks} />
                    <List title="Complete" tasks={[]} />
                    <List title="To Do" tasks={todoTasks} />
                    <List title="In Progress" tasks={todoTasks} />
                    <List title="To Do" tasks={todoTasks} />
                    <List title="In Progress" tasks={todoTasks} />
                </div>
            </div>
        </div>
    );
}

export default App;
