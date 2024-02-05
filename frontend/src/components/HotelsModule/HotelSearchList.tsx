import { HotelSearchCard } from "./HotelSearchCard";
import { IHotel } from "./interfaces/Hotel.interface.dto";

export function HotelSearchList ({hotels}: {hotels: IHotel[]}) {
    const hotelSearchList = hotels.map(hotel => <HotelSearchCard hotel={hotel}/>)
    return (
        <>
            {hotelSearchList}
        </>
    )
}