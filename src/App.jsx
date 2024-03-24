import "./App.css";
import Button from "./components/common/button/Button";
import plusIconLight from "./assets/icons/plusIconLight.svg";
import historyIcon from "./assets/icons/historyIcon.svg";

function App() {
    return (
        <div className="App">
            <div className="container">
                <h1>App</h1>
                <Button icon={historyIcon}>Кнопка</Button>
                <Button icon={plusIconLight} dark>
                    Темна кнопка
                </Button>
            </div>
        </div>
    );
}

export default App;
