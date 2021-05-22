import './App.css';
import TodoList from './Components/TodoList';
import {useState,useRef,useEffect} from 'react';

function App() {

  const LOCAL_STORAGE_KEY = "todoApp.todos"

  const [todos, settodos] = useState(() => {
    return (
    [{
      id:1,
      todoname: 'todo1',
      complete: false
    },
    {
      id:2,
      todoname: 'todo2',
      complete: true
    }] )
  })

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) settodos(storedTodos)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY,JSON.stringify(todos)) 
  }, [todos])

  const addTodoRef = useRef();

  function addTodoHandler(e){
    const nameTodo = addTodoRef.current.value;
    if (nameTodo === '') return
    settodos(prevList => {
      console.log(prevList[prevList.length -1].id)
      return [...prevList,{id:prevList[prevList.length - 1].id + 1, todoname: nameTodo, complete: false}]
    })
    addTodoRef.current.value = null;
  }

  function todoChangeHandler(id){
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete;
    settodos(newTodos)
  }

  function clearCompleteHandler(){
    const newTodos  = todos.filter(todo => !todo.complete)
    settodos(newTodos)
  }

  return (
    <div className="App">
      <h1>TODO'S</h1>
      <TodoList todos={todos} todoChangeHandler={todoChangeHandler}/>
      <input type="text" ref={addTodoRef} htmlFor="addtodo"/>
      <button onClick={addTodoHandler} htmlFor="addtodo">Add Todo</button>
      <button onClick={clearCompleteHandler}>Clear completed todos</button>
      <div>{todos.filter(todo=>!todo.complete).length} : incomplete task</div>
    </div>
  );
}

export default App;