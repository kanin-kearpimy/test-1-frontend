import { Todo } from "../component/custom/Content";
import axios from "axios"

const SERVER_URL = "http://127.0.0.1:8000"

export type createTodoDTO = {
    title: string
}

export type updateTodoDTO = {
    title?: string, isComplete?: boolean
}

export const getTodo = async (): Promise<Todo[]> => {
    const { data } = await axios.get(`${SERVER_URL}/`)

    return data
}

export const createTodo = async (data: createTodoDTO): Promise<void> => {
    await axios.post(`${SERVER_URL}/`, data)
}

export const deleteTodo = async (id: number): Promise<void> => {
    await axios.delete(`${SERVER_URL}/${id}`)
}

export const updateTodo = async (id: number, data: updateTodoDTO) => {
    await axios.put(`${SERVER_URL}/${id}`, data)
}