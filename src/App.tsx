import { useEffect, useState } from "react"
import { createTodo, createTodoDTO, deleteTodo, getTodo, updateTodo, updateTodoDTO } from "./api/todo"
import Content, { Todo } from "./component/custom/Content"
import Footer from "./component/custom/Footer"
import Header from "./component/custom/Header"

export enum OrderType {
  ASC,
  DESC
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [isAddTodo, toggleAddTodo] = useState<boolean>(false)
  const [newTodo, setNewTodo] = useState<string>("")
  const [isDelete, toggleDelete] = useState<boolean>(false)
  const [order, setOrder] = useState<OrderType>(OrderType.ASC)

  const createTodoHandler = async () => {
    const todoDTO: createTodoDTO = {
      title: newTodo
    }
    try {
      await createTodo(todoDTO)
      const newLength = todos.length + 1
      let _todo: Todo = {
        id: newLength,
        title: newTodo,
        isComplete: false
      }
      setTodos([...todos, _todo])
      setNewTodo("")
    } catch (error: any) {
      alert(error.message)
    }
    
  }

  const deleteHandler = async (id: number) => {
    try {
      await deleteTodo(id)
      const _newTodos = todos.filter((item) => item.id !== id)
      setTodos([..._newTodos])
    } catch (error: any) {
      alert(error.message)
    }
  }

  const changeHandler = async (id: number, data: updateTodoDTO) => {
    try {
      await updateTodo(id, data)
      const _newTodos = todos.map((item) => {
        if(item.id === id){
          const _item = { ...item, ...data }
          return _item
        }
        return item
      })
      setTodos([..._newTodos])
    } catch (error: any) {
      alert(error.message)
    }
  }

  const fetchTodo = async () => {
    const data = await getTodo()
    setTodos(data)
  }

  useEffect(() => {
    fetchTodo()
  }, [])

  useEffect(() => {
    let _todos = []
    if(order === OrderType.ASC) _todos = todos.sort((a, b) => a.id - b.id)
    else _todos = todos.sort((a, b) => b.id - a.id)
    setTodos([..._todos])
  }, [order])

  return (
    <div className="container w-1/2 mx-auto mt-48 shadow-md bg-white rounded-xl">
      <div className="p-4">
        <Header isDelete={isDelete} toggleDelete={toggleDelete} taskLength={todos.length} />
        {order === OrderType.ASC ? <span className="hover:cursor-pointer" onClick={() => setOrder(OrderType.DESC)}>ASC order</span> : <span className="hover:cursor-pointer" onClick={() => setOrder(OrderType.ASC)}>DESC order</span>}
        <Content 
          todos={todos as Todo[]} 
          isAddTodo={isAddTodo} 
          newTodoHandler={setNewTodo}
          newTodo={newTodo}
          isDelete={isDelete}
          deleteHandler={deleteHandler}
          changeHandler={changeHandler}
          />
      </div>
      <Footer addHandler={toggleAddTodo} save={createTodoHandler} isAddTodo={isAddTodo} />
    </div>
  )
}

export default App
