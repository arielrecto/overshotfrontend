<script setup>
import { storeToRefs } from 'pinia';
import { inject, onMounted, ref } from 'vue';
import AdminNavBar from '../../../../components/AdminNavBar.vue'
import { useUserStore } from '../../../../stores/useUserStore.js'
import Loading from '../../../../components/Loading.vue';

const userStore = useUserStore();
const { addEmployee, getAllEmployeeInServer } = userStore;
const swal = inject('$swal');
const { status, employees, isLoading, message } = storeToRefs(userStore);


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


const barChart = {

    series: [{
        name: 'employee one',
        data: [44, 55, 57, 56, 61, 58, 63, 60, 66, 23, 70, 80]
    }, {
        name: 'employee two',
        data: [76, 85, 101, 98, 87, 105, 91, 114, 94, 50, 60, 80]
    }, {
        name: 'employee three',
        data: [35, 41, 36, 26, 45, 48, 52, 53, 41, 50, 80, 70]
    }],
    chartOptions: {
        chart: {
            type: 'bar',
            height: 350
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%',
                endingShape: 'rounded'
            },
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        },
        yaxis: {
            title: {
                text: ' (Transaction)'
            }
        },
        fill: {
            opacity: 1
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return " " + val + " Transaction"
                }
            }
        }
    },
}


onMounted(() => {
    getAllEmployeeInServer()
})
</script>
<template>
    <div class="p-4 sm:ml-64 bg-gray-100 min-h-screen">
        <div class="w-full flex flex-col gap-y-5 relative">
            <AdminNavBar></AdminNavBar>

            <div class="flex p-2 capitalize bg-white rounded-lg drop-shadow-lg">
                <div class="grow pt-2">
                    <button @click="openModalForm"
                        class="px-4 py-2 bg-orange-300 text-sm hover:bg-orange-400 hover:text-white hover:font-semibold duration-700 rounded-lg hover:scale-105">
                        Add employee
                    </button>
                </div>


                <div class="w-1/3 flex-none">

                    <form>
                        <label for="default-search"
                            class="mb-2 text-xs font-medium text-gray-900 sr-only dark:text-white">Search</label>
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none"
                                    stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                </svg>
                            </div>
                            <input type="search" id="default-search" class="block w-full p-4 pl-10 text-sm text-orange-900 border border-orange-300 rounded-lg bg-gray-50 
                            focus:ring-orange-500
                                         focus:border-blue-500 " placeholder="search" required>
                            <button type="submit" class="text-white absolute right-2.5 bottom-2.5 bg-orange-700 hover:bg-orange-800 focus:ring-4
                                         focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-4 py-2
                                          ">Search</button>
                        </div>
                    </form>

                </div>
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
                                                     focus:outline-none focus:ring-0 focus:border-orange-600 peer"
                                                placeholder=" " required />
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
                                                     focus:outline-none focus:ring-0 focus:border-orange-600 peer"
                                                placeholder=" " required />
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
                                                     focus:outline-none focus:ring-0 focus:border-orange-600 peer"
                                                placeholder=" " required />
                                            <label for="floating_repeat_password"
                                                class="peer-focus:font-medium absolute text-sm text-orange-500
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
                                                     focus:outline-none focus:ring-0 focus:border-orange-600 peer"
                                                placeholder=" " required />
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
                                    <button type="button" @click="openModalForm"
                                        class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg 
                                                                        border border-gray-200 text-sm font-medium px-5 py-2.5 
                                                                        hover:text-gray-900 focus:z-10 ">Decline</button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </transition>
            <div class="w-full flex gap-2">
                <div class="relative overflow-x-auto z-0 h-96 grow bg-white drop-shadow-lg rounded-lg">
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
                <div class="w-1/3 flex flex-col gap-2">
                    <div class="bg-white p-2 rounded-lg drop-shadow-lg flex justify-center">
                        <div v-if="isLoading">
                            <Loading></Loading>
                        </div>
                        <div class="w-5/6 p-5 flex space-x-5" v-else>
                            <div
                                class="px-4 py-4 rounded-full bg-orange-200 hover:bg-orange-300 hover:scale-105 duration-500">
                                <img src="../../../../assets/icons/user-line.png" alt="" srcset="" class="h-5">
                            </div>
                            <div class="flex flex-col gap-2">
                                <h1 class="text-xl font-semibold border-b-2 border-gray-100 tracking-widest">
                                    {{ employees.length }}
                                </h1>
                                <p class="capitalize text-xs text-gray-400">
                                    employees
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="bg-white drop-shadow-lg rounded-lg">
                        <apexchart type="bar" height="250" :options="barChart.chartOptions" :series="barChart.series">
                        </apexchart>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>