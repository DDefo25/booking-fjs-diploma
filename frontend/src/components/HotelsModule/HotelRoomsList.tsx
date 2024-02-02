import { HotelRoomCard } from "./HotelRoomCard";
import { IHotelRoom } from "./interfaces/HotellRoom.interface.dto";

export function HotelRoomsList ({hotelRooms}: {hotelRooms: IHotelRoom[]}) {
    const hotelRoomsComponents = hotelRooms.map(hotelRoom => <HotelRoomCard hotelRoom={hotelRoom}/>)
    return (
        <>
            {hotelRoomsComponents}
        </>
    )
}