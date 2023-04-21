import Api from '../Server/index.js'
import router from '../Routes.js' 

 async function logout() {

    try {

        const response = await Api().post('/logout')

        if(response.status === 200) {

            localStorage.clear()

        }

        if(!localStorage.getItem(['token'])) {

            router.push({name : 'admin'});

        }
    } catch (error) {
        console.log(error.response.data.message)
    }


}

export default logout