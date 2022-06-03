import './App.css';
import Form from './components/Form';
import ToDoList  from './components/ToDoList';
import {useState, useEffect} from "react";

function App() {
  
  //State Stuff
  const [inputText, setInputText] = useState('');
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);
//Run once
  useEffect(() => {
    getLocalTodos();
  }, []);
  //USE EFFECT
  useEffect(() => {
    filterHandler();
    saveLocalTodos();
  }, [todos, status]);

  //Functions
    const filterHandler = () => {
      switch(status) {
        case 'completed': 
          setFilteredTodos(todos.filter(todo => todo.completed === true));
          break;
         case 'uncompleted': setFilteredTodos(todos.filter(todo => todo.completed === false));
          break;
         default:
            setFilteredTodos(todos);
            break;            
      }
    };

   //Save to Local
   const saveLocalTodos = () => {
        localStorage.setItem('todos', JSON.stringify(todos));
      }   
   const getLocalTodos = () => {
    if(localStorage.getItem('todos') === null){
      localStorage.setItem('todos', JSON.stringify([]));
    } else{
      let todoLocal = JSON.parse(localStorage.getItem('todos'));
      setTodos(todoLocal);
    }
   }  
  return (
    <div className="App">
      <header>
        <h1>Subb's To Do List</h1>
      </header>
      <Form 
       setStatus={setStatus}
        inputText= {inputText}
         todos={todos}
          setTodos={setTodos}
           setInputText={setInputText}
            />
      <ToDoList filteredTodos= {filteredTodos} setTodos={setTodos} todos={todos}  />
    </div>
  );
}

export default App;
