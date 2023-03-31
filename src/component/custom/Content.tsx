import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { updateTodoDTO } from "../../api/todo"
import { OrderType } from "../../App"

export type Todo = {
    id: number
    title: string
    isComplete: boolean
}

type ContentProps = {
    todos: Todo[]
    isAddTodo: boolean
    newTodoHandler: Dispatch<SetStateAction<string>>
    newTodo: string
    isDelete: boolean
    deleteHandler: (id: number) => void
    changeHandler: (id: number, data: updateTodoDTO) => void
}

const Content = ({ todos, isAddTodo, newTodoHandler, newTodo, isDelete, deleteHandler, changeHandler }: ContentProps) => {    
    return (
        <div className="flex flex-col mt-8">
            <ul className="w-full">
                {isAddTodo && (<li className="border border-black mb-4">
                    <input type="text" placeholder="type here..." className="w-full" value={newTodo} onChange={(e) => newTodoHandler(e.target.value)} />
                </li>)}
                {todos.map((todo) => {
                    return (
                        <li className="flex flex-row my-3" key={todo.id}>
                            <input onClick={() => changeHandler(todo.id, {isComplete: !todo.isComplete})} className="w-fit scale-[200%] ml-4 cursor-pointer" type="checkbox" checked={todo.isComplete} />
                            <TodoTitleElement {...todo} changeHandler={changeHandler} />
                            {isDelete && <button onClick={() => deleteHandler(todo.id)} className="text-red-500">X</button>}
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

const TodoTitleElement = (
    { title, id, changeHandler }: 
    { 
        title:string, 
        id:number, 
        changeHandler: (id: number, data: updateTodoDTO) => void 
    }
    ) => {
    const [_title, changeTitle] = useState<string>(title)
    const [isChangeTitle, toggleChangeTitle] = useState<boolean>(false)

    if(isChangeTitle) {
        return (
            <div className="w-3/4 ml-8 break-words flex flex-col">
                <input type="text" className="border border-slate-300 pl-1 rounded-md" value={_title} onChange={(event) => changeTitle(event.target.value)} />
                <div className="w-full mt-1">
                    <button onClick={() => { changeHandler(id, { title: _title }); toggleChangeTitle(false) }} className="mr-2 bg-green-300 rounded-lg px-2">Change</button>
                    <button onClick={() => { changeTitle(title); toggleChangeTitle(false) }} className="bg-slate-300 rounded-lg px-2">Cancel</button>
                </div>
            </div>
        )
    }

    return (
        <h4 onClick={() => toggleChangeTitle(true)} className="w-3/4 ml-8 break-words hover:cursor-pointer hover:text-red-400 transition-all">{_title}</h4>
    )
}

export default Content