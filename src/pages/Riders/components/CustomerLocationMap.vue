<script setup>

import { computed, onMounted, onUnmounted, onUpdated, ref, watch } from 'vue'
import { useGeolocation } from '../utilities/useGeolocation.js'
// import { Loader } from '@googlemaps/js-api-loader'
// import { map, tileLayer } from 'leaflet'
// const { coordinates } = useGeolocation()

const coordinates = defineProps({
    latitude: 0,
    longitude: 0,
    riderCoordinates : null
})

console.log(coordinates.riderCoordinates)



// const GOOGLE_MAPS_API_KEY = 'AIzaSyCTlMHsHxn6b1ZgQgrLsmmC5HhpNdtBpK8';



const myMapCanvas = ref(null)


// const loader = new Loader({ apiKey: GOOGLE_MAPS_API_KEY })



// watch(coordinates, (newCoords) => {
//     console.log(newCoords)
// })


let currentPosition = { lat: 0, lng: 0 };


// console.log({ myCanvas: myMapCanvas })


// let myMap = L.map(myMapCanvas.value).setView([currentPosition.lat, currentPosition.lng], 13);

// L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     maxZoom: 19,
//     attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
// }).addTo(myMap);

// L.Routing.control({
//     waypoints: [
//         L.latLng(customerCoordinates.latitude, customerCoordinates.longitude),
//         L.latLng(currentPosition.lat, currentPosition.lng)
//     ],
//     routeWhileDragging: true
// }).addTo(myMap);

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
//})




// console.log({ myCanvas: myMapCanvas })


onMounted(() => {

    let myMap = L.map(myMapCanvas.value).setView([coordinates.riderCoordinates.lat, coordinates.riderCoordinates.lng], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(myMap);


    L.marker([coordinates.latitude, coordinates.longitude]).addTo(myMap)

    L.Routing.control({
        waypoints: [
            L.latLng(coordinates.riderCoordinates.lat, coordinates.riderCoordinates.lng),
            L.latLng(coordinates.latitude, coordinates.longitude),
        ],
        routeWhileDragging: true
    }).addTo(myMap);
})


// const myIcon = L.icon({
//     iconUrl : '/map-icons/location.png',
//     iconSize : [30, 32],
//     shadowAnchor : [4, 62]
// })
// const customerIcon = L.icon({
//     iconUrl : '/map-icons/placeholder.png',
//     iconSize : [30, 32],
//     shadowAnchor : [4, 62]
// })
// L.marker([14.411446499999998, 121.0085945], {icon : myIcon}).addTo(myMap)
// L.marker([customerCoordinates.latitude, customerCoordinates.longitude], {icon : customerIcon}).addTo(myMap)



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