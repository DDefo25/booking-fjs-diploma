import { HotelRoomCardView } from "./HotelRoomCardView";
import { IHotelRoom } from "../interfaces/HotellRoom.interface.dto";

export function HotelRoomsList ({hotelRooms}: {hotelRooms: IHotelRoom[]}) {
    const hotelRoomsComponents = hotelRooms.map(hotelRoom => <HotelRoomCardView hotelRoom={hotelRoom}/>)
    console.log(hotelRooms)
    return (
        <>
            {hotelRoomsComponents}
        </>
    )
}