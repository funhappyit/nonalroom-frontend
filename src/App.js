import "./App.css";
import Header from "./component/Header";
import TodoEditor from "./component/TodoEditor";
import TodoList from "./component/TodoList";
import TestComp from "./component/TestComp";
import { TodoProvider } from "./context/TodoContext";

function App() {
    return (
        <TodoProvider>
            <div className="App">
                <TestComp />
                <Header />
                <TodoEditor />
                <TodoList />
            </div>
        </TodoProvider>
    );
}

export default App;
