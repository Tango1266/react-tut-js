import React, {useState, useEffect} from 'react';
import './App.css';
// Components
import Form from "./components/Form";
import TodoList from "./components/TodoList";

function App() {
    //States
    const [inputText, setInputText] = useState("");
    const [todos, setTodos] = useState([]);
    const [status, setStatus] = useState("all");
    const [filteredTodos, setFilteredTodos] = useState([]);
    useEffect(() => {
        getLocalTodos();
    }, [])
    //UseEffect
    useEffect(() => {
        filterHandler();
        saveLocalTodos();
    }, [todos, status])
    //Functions
    const filterHandler = () => {
        switch (status){
            case 'completed':
                setFilteredTodos(todos.filter(todo => todo.completed));
                break;
            case 'uncompleted':
                setFilteredTodos(todos.filter(todo => !todo.completed));
                break;
            default:
                setFilteredTodos(todos);
                break;
        }
    }
    // Save to local
    const saveLocalTodos = () => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    const getLocalTodos = () => {
        if (localStorage.getItem('todos') == null)
            localStorage.setItem('todos', JSON.stringify([]))

        const todosFromLocal = JSON.parse(localStorage.getItem('todos'));
        setTodos(todosFromLocal);
    }

    return (
        <div className="App">
            <header>
                <h1>Todo List</h1>
            </header>
            <Form
                todos={todos}
                inputText={inputText}
                setTodos={setTodos}
                setInputText={setInputText}
                setStatus={setStatus}
            />
            <TodoList filteredTodos={filteredTodos} setTodos={setTodos}/>
        </div>
    );
}

export default App;
