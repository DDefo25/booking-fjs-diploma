import { HotelRoomCardView } from "./HotelRoomCardView";
import { HotelRoom } from "../interfaces/HotellRoom.interface.dto";

export function HotelRoomsList ({hotelRooms}: {hotelRooms: HotelRoom[]}) {
    const hotelRoomsComponents = hotelRooms.map(hotelRoom => <HotelRoomCardView hotelRoom={hotelRoom}/>)
    return (
        <>
            {hotelRoomsComponents}
        </>
    )
}