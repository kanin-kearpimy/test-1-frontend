import { Dispatch, SetStateAction } from 'react'
import DeleteIcon from '../../assets/delete-icon.png'

type HeaderProps = {
    toggleDelete: Dispatch<SetStateAction<boolean>>
    isDelete: boolean
    taskLength: number
}

const Header = ({ toggleDelete, isDelete, taskLength }: HeaderProps) => {
    return (
        <div className="flex flex-col">
            <div className="flex flex-row justify-between items-center">
                <h2 className="font-bold text-green-500">TODAY</h2>
                {!isDelete ? <img onClick={() => toggleDelete(true)} className='cursor-pointer' src={DeleteIcon} alt="delete-icon" />
                : <button onClick={() => toggleDelete(false)} className='text-red-500'>Done</button>}
            </div>
            <h5 className="italic">{ taskLength } Tasks</h5>
        </div>
    )
}

export default Header