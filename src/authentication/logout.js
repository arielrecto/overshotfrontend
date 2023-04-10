import axios from "axios" 
import router from '../Routes.js' 

 async function logout() {

    try {

        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }
        const response = await axios.post('/logout', {},config)

        if(response.status === 200) {

            localStorage.clear()

        }

        if(!localStorage.getItem(['token'])) {

            router.push({name : 'admin'});

        }

        console.log(response.data)
    } catch (error) {
        console.log(error.response.data.message)
    }


}

export default logout