import { Container } from "react-bootstrap";
import { HotelSearch } from "./HotelSearch";
import { HotelSearchList } from "./HotelSearchList";
import { useState } from "react";
import { IHotelSearch } from "./interfaces/Hotel.search.interface.dto";
import { HotelSearchCard } from "./HotelSearchCard";
import { Loading } from "../utilites-components/Loading";
import { HandlersForm } from "../interfaces/handlers";
import { useGetHotelRoomsQuery } from "../../services/hotelAPI";
import { Outlet } from "react-router-dom";

const initialFormState: IHotelSearch = {
    title: '',
    offset: 0,
    limit: 10
}

export function HotelModule () {
    const [ formState, setForm ] = useState(initialFormState )
    const { data: hotelsRoom, isLoading, refetch } = useGetHotelRoomsQuery(formState)

    const handlers: HandlersForm = {
        onChange: ({target: { name, value }}) => {
            setForm((state) => ({...state, [name]: value}))
        },

        onSubmit: async (e) => {
            e.preventDefault();
            refetch()
        }
    }

    const hotels = hotelsRoom && [...new Map(hotelsRoom.map(({hotel}) => [hotel._id, hotel])).values()]
    const hotelSearchList = hotels && hotels.map((hotel) => <HotelSearchCard key={hotel._id} hotel={hotel} />)

    if (isLoading) return <Loading />

    return (
        <>
        <Container>
            <HotelSearch handlers={handlers} formState={formState}/>
            <HotelSearchList children={hotelSearchList} />
        </Container>

        <Outlet />
        </>
    )
}