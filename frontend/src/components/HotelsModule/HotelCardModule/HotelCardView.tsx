import { Container } from "react-bootstrap";
import { HotelCard } from "./HotelCard";
import { HotelRoomsList } from "../HotelRoomModule/HotelRoomsList";
import { useParams } from "react-router-dom";
import { HotelRoomRequest, useGetHotelQuery, useGetHotelRoomsQuery } from "../../../services/hotelAPI";
import { useEffect, useState } from "react";
import { Loading } from "../../utilites-components/Loading";
import { useCheckRoles } from "../../../hooks/useCheckRoles";


export function HotelCardView () {
    const { id } = useParams()
    const initialFormState: HotelRoomRequest = {
        hotel: id,
        offset: 0,
        limit: 10
    }
    
    const [ queryParams, setQueryParams ] = useState(initialFormState )
    const { data: hotelRooms, isLoading, isFetching } = useGetHotelRoomsQuery(queryParams, { refetchOnMountOrArgChange: true })
    const { data: hotel, isLoading: isLoadingHotel, isFetching: isFetchingHotel } = useGetHotelQuery(id!, { refetchOnMountOrArgChange: true })

    useEffect(() => {
        setQueryParams((state) => ({...state, hotel: id}))
    }, [id])
    

    if (isLoading || isLoadingHotel) return <Loading />
    if (isFetching || isFetchingHotel) return <Loading />

    return ( 
    <>
        {   (hotel && hotelRooms) ?
            <Container>
                <HotelCard hotel={hotel}/>
                <HotelRoomsList hotelRooms={hotelRooms}/>
            </Container>
            : null
        }
    </>
    )
}