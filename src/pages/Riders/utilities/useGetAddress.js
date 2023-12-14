import axios from "axios";

export async function useGetAddressByCoordinates(lat, lng) {
  try {
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
    );
    console.log("getAddress using coordinates");

    console.log(response.data.display_name);

    const data = response.data.display_name;

    return data;
  } catch (error) {}
}
