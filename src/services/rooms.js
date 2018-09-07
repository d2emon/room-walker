import axios from 'axios';
import {ROOMS_ENDPOINT, ROOMS_TIMEOUT} from '../config';

const RoomsAxios = axios.create({
    baseURL: ROOMS_ENDPOINT,
    timeout: ROOMS_TIMEOUT
});

class RoomsService {
    /**
     * Get rooms list
     * @returns {Promise<AxiosResponse<any>>}
     */
    getRooms () {
        const url = '/rooms';
        return RoomsAxios.get(url)
            .then(response => {
                console.log(response);
                return response.data
            })
            .catch(error => {
                console.error(error)
            })
    }

    /**
     * Get room by roomId
     * @returns {Promise<AxiosResponse<any>>}
     */
    getRoom (roomId) {
        const url = `/rooms/${roomId}`;
        return RoomsAxios.get(url)
            .then(response => {
                return response.data.room
            })
            .catch(error => {
                console.error(error)
            })
    }
}

export default new RoomsService();
