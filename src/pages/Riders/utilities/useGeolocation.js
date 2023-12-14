import {onMounted, onUnmounted, ref } from 'vue'


export function  useGeolocation() {
    const coordinates = ref({latitude : 0, longitude : 0});
    const isSupported = 'navigator' in window && 'geolocation' in navigator;
    
    let watcher = null;

    onMounted(() => {
        console.log("on mounted use geolocation")
        if(isSupported){
            watcher = navigator.geolocation.watchPosition(
                position => (coordinates.value = position.coords)
            )
        }
    });

    onUnmounted(() => {
        if(watcher) navigator.geolocation.clearWatch(watcher)
    })

    return {
       coordinates,
       isSupported
    }
}