import Axios from "axios";


Axios.defaults.headers.post['Content-Type'] = 'application/json'
const server = Axios.defaults.baseURL = 'http://127.0.0.1:8000/api/'


export default server;