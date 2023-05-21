<script setup>
import { storeToRefs } from 'pinia';
import { inject, onMounted, ref } from 'vue';
import AdminNavBar from '../../../../components/AdminNavBar.vue';
import adminStats from '../../../../components/adminStats.vue';
import { useUserStore } from '../../../../stores/useUserStore.js'
import Loading from '../../../../components/Loading.vue';

const userStore = useUserStore();
const { addEmployee, getAllEmployeeInServer } = userStore;
const swal = inject('$swal');
const { status, employees, isLoading , message} = storeToRefs(userStore);


const employeeData = ref({
    name: null,
    email: null,
    password: null,
    password_confirmation: null
});

console.log(employees.value)

const employeeForm = ref(null);

const modalForm = ref(false);


const openModalForm = () => {

    modalForm.value = !modalForm.value

    console.log(modalForm.value);

}


const addEmloyeeDataInServer = async () => {

    await addEmployee(employeeData.value);

    if (status.value === 200) {
        swal.fire({
            position: 'top-end',
            icon: 'success',
            title: message.value,
            showConfirmButton: false,
            timer: 1500
        })
        employeeForm.value.reset();
    }
}

onMounted(() => {
    getAllEmployeeInServer()
})
</script>
<template>
    <div class="p-4 sm:ml-64">
        <div class="w-full flex flex-col gap-y-5 relative">
            <AdminNavBar></AdminNavBar>
            <adminStats></adminStats>

            <div class="flex p-2 capitalize">
                <button @click="openModalForm"
                    class="px-4 py-2 bg-orange-300 hover:bg-orange-400 hover:text-white hover:font-semibold duration-700 rounded-lg">
                    Add employee
                </button>
            </div>

            <transition enter-from-class="opacity-0" leave-to-class="opacity-0" enter-active-class="transition duration-300"
                leave-active-class="transition duration-300">
                <div class="w-full z-10 absolute" v-show="modalForm">
                    <div class="relative">
                        <div class="w-full h-screen bg-black opacity-5">

                        </div>
                        <div class="absolute top-[12rem] left-[15rem]">
                            <div class="w-[50rem] bg-white drop-shadow-lg h-auto">
                                <div class="w-full p-2 flex flex-row-reverse">
                                    <button class="mr-2" @click="openModalForm"><i class="ri-close-line"></i></button>
                                </div>
                                <div class="p-6 space-y-6" v-show="modalForm">

                                    <form @submit.prevent="" ref="employeeForm">
                                        <div class="relative z-0 w-full mb-6 group">
                                            <input type="email" v-model="employeeData.email" id="floating_email" class="block py-2.5 px-0 w-full text-sm 
                            text-gray-900 bg-transparent border-0 border-b-2
                             border-gray-300 appearance-none 
                             focus:outline-none focus:ring-0 focus:border-orange-600 peer" placeholder=" " required />
                                            <label for="floating_email" class="peer-focus:font-medium absolute text-sm 
                            text-orange-500 duration-300 transform
                             -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0
                              peer-focus:text-orange-600 
                              peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                              peer-focus:scale-75 peer-focus:-translate-y-6">Email
                                                address</label>
                                        </div>
                                        <div class="relative z-0 w-full mb-6 group">
                                            <input type="password" v-model="employeeData.password" id="floating_password"
                                                class="block py-2.5 px-0 w-full text-sm text-gray-900 
                            bg-transparent border-0 border-b-2 border-gray-300 appearance-none
                             focus:outline-none focus:ring-0 focus:border-orange-600 peer" placeholder=" " required />
                                            <label for="floating_password"
                                                class="peer-focus:font-medium absolute text-sm text-orange-500 
                           duration-300 transform -translate-y-6 scale-75 
                            top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-600 
                             peer-placeholder-shown:scale-100 
                            peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                                        </div>
                                        <div class="relative z-0 w-full mb-6 group">
                                            <input type="password" v-model="employeeData.password_confirmation"
                                                id="floating_repeat_password" class="block py-2.5 px-0 w-full text-sm text-orange-900 
                            bg-transparent border-0 border-b-2 border-gray-300 appearance-none
                             focus:outline-none focus:ring-0 focus:border-orange-600 peer" placeholder=" " required />
                                            <label for="floating_repeat_password" class="peer-focus:font-medium absolute text-sm text-orange-500
                              duration-300 transform -translate-y-6 scale-75
                              top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-600 
                               peer-placeholder-shown:scale-100 
                              peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm
                                                password</label>
                                        </div>
                                        <div class="relative z-0 w-full mb-6 group">
                                            <input type="text" v-model="employeeData.name" class="block py-2.5 px-0 
                    w-full text-sm text-orange-900 
                            bg-transparent border-0 border-b-2 border-gray-300 appearance-none
                             focus:outline-none focus:ring-0 focus:border-orange-600 peer" placeholder=" " required />
                                            <label for="floating_repeat_password"
                                                class="peer-focus:font-medium absolute text-sm text-orange-500
                              duration-300 transform -translate-y-6 scale-75
                              top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-600 
                               peer-placeholder-shown:scale-100 
                              peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>
                                        </div>
                                    </form>

                                </div>
                                <div class="flex items-center p-6 space-x-2 border-t border-orange-200 rounded-b ">
                                    <button @click="addEmloyeeDataInServer" type="button" class="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none 
                                                focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center
                                                ">Add</button>
                                    <!--data-modal-hide="staticModal"-->
                                    <button type="button" @click="openModalForm" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg 
                                                border border-gray-200 text-sm font-medium px-5 py-2.5 
                                                hover:text-gray-900 focus:z-10 ">Decline</button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </transition>

            <div class="relative overflow-x-auto">
                <table class="w-full text-sm text-left text-gray-500">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr class="uppercase">
                            <th scope="col" class="px-6 py-3">
                                name
                            </th>
                            <th scope="col" class="px-6 py-3">
                                email
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="bg-white border-b" v-show="isLoading">
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap" colspan="2">
                                <Loading></Loading>
                            </th>
                        </tr>


                        <tr class="bg-white border-b" v-for="employee in employees" :key="employee.id">
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                {{ employee.name }}
                            </th>
                            <td class="px-6 py-4">
                                {{ employee.email }}
                            </td>
                            <td class="px-6 py-4">
                                Laptop
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
    </div>
</template>