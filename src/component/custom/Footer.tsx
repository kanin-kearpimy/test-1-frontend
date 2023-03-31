import { Dispatch, SetStateAction } from "react"

type FooterProps = {
    addHandler: Dispatch<SetStateAction<boolean>>
    isAddTodo: boolean
    save: Function
}

const Footer = ({ addHandler, isAddTodo, save }: FooterProps) => {
    return (
        <div className="bg-slate-200 rounded-b-xl p-4 flex flex-row justify-between">
            <p className="text-slate-500">What we have to do?</p>
            {!isAddTodo ? 
            <button onClick={() => addHandler(true)} className="text-green-500">Add</button>
            : <button onClick={() => { save(); addHandler(false) }} className="text-green-500">Confirm</button>
        }
            
        </div>
    )
}

export default Footer