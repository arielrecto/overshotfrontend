<script setup>
import { ref } from 'vue';
import EmployeeNavbarVue from '../../components/EmployeeNavbar.vue';
import EmployeeSideBar from '../../components/EmployeeSideBar.vue';

</script>

<template>
  <div class="w-full relative">
    <EmployeeNavbarVue></EmployeeNavbarVue>
    <div class="flex gap-2">
      <employee-side-bar></employee-side-bar>
      <div class="sm:ml-28 mt-[4rem] w-full">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>