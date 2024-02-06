import { IHotel } from "../components/HotelsModule/interfaces/Hotel.interface.dto"
import { IHotelRoom } from "../components/HotelsModule/interfaces/HotellRoom.interface.dto"

export function hotelModuleReducer (state: any, action: any) {
    switch (action.type) {
        case 'UPDATE HOTEL ROOMS': {
            const arrayUniqueByKey = Array.from(new Map(action.payload.map((item: IHotelRoom) => [item.hotel._id, item.hotel])).values());
            return {
                hotelRooms: action.payload,
                hotels: arrayUniqueByKey
            }
        }
        default: 
            return state
    }
}