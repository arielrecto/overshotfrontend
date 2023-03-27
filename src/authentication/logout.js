import axios from "axios" 
import router from '../Routes.js' 

 async function logout() {

    try {

        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }
        const user = {
            email : localStorage.getItem('user')
        }

        console.log(config)
        const response = await axios.post('/logout', user, config)

        if(response.status === 200) {

            localStorage.clear()

        }

        if(!localStorage.getItem(['token', 'user'])) {

            router.push({name : 'admin'});

        }

        console.log(response.data)
    } catch (error) {
        console.log(errer.response.data.message)
    }


}

export default logout