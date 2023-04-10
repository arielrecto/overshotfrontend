import axios from "axios"

export const api = () => {
    if(!localStorage.getItem('token')) {
        return baseURL
    }
}