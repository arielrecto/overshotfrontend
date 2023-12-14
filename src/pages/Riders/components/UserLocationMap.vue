<script setup>

import { computed, onMounted, onUpdated, ref, watch } from 'vue'
import { useGeolocation } from '../utilities/useGeolocation.js'
import { useLocationStore } from '../../../stores/useLocationStore';

// import { Loader } from '@googlemaps/js-api-loader'
// import { map, tileLayer } from 'leaflet'
const { coordinates } = useGeolocation()
const { storeLocation } = useLocationStore()

// const GOOGLE_MAPS_API_KEY = 'AIzaSyCTlMHsHxn6b1ZgQgrLsmmC5HhpNdtBpK8';


const currentLocation  = defineProps({
    latitude : 0,
    longitude : 0,
    address : null
})


console.log(coordinates.value)
const myMapCanvas = ref(null)

// const loader = new Loader({ apiKey: GOOGLE_MAPS_API_KEY })



// watch(coordinates, (newCoords) => {


//     console.log(newCoords);

//     const data = {
//         latitude: newCoords.latitude,
//         longitude: newCoords.longitude,
//         address: '12312312ada ads',
//         user: JSON.parse(localStorage.getItem('user')).id
//     }


//     console.log(data);

// })






onUpdated(() => {

    console.log("onUpdated")




    // console.log(coordinates)
    //  new google.maps.Map(mapCanvas.value, {
    //      center : currentPosition,
    //      zoom : 7
    // })   
    // let myMap = map(myMapCanvas.value).setView([currentPosition.lat, currentPosition.lng], 13)
    // tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //     maxZoom: 19,
    //     attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    // }).addTo(myMap);
})



onMounted(() => {

    console.log({ myCanvas: myMapCanvas })


    let myMap = L.map(myMapCanvas.value).setView([currentLocation.latitude, currentLocation.longitude], 17);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(myMap);
    const myIcon = L.icon({
        iconUrl: '/map-icons/location.png',
        iconSize: [30, 32],
        shadowAnchor: [4, 62]
    })
    L.marker([currentLocation.latitude, currentLocation.longitude], { icon: myIcon }).addTo(myMap).bindPopup(`Your Location! ${currentLocation.address}`).openPopup()

})


// onMounted( async () => {
//       await loader.load()
// })

// onMounted(async () => {
//
// })

// console.log(currentPosition.value)
</script>


<template>
    <div ref="myMapCanvas" class="h-96 w-full">

    </div>
</template>