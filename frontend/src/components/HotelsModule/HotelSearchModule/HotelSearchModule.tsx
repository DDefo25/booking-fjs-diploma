import { Container } from "react-bootstrap";
import { HotelSearchForm } from "./HotelSearchForm";
import { useEffect, useState } from "react";
import { HotelSearch } from "../interfaces/Hotel.search.interface.dto";
import { HotelSearchCard } from "./HotelSearchCard";
import { Loading } from "../../utilites-components/Loading";

import { useGetHotelRoomsQuery } from "../../../services/hotelAPI";
import { Outlet } from "react-router-dom";
import { Handler, HandlersForm } from "../../../features/handlers/Handler";

const initialFormState: HotelSearch = {
    title: '',
    offset: 0,
    limit: 10,
    startDate: '',
    endDate: ''
}

export function HotelSearchModule () {
    const [ formState, setForm ] = useState(initialFormState )
    const { data: hotelsRoom, isLoading, refetch } = useGetHotelRoomsQuery(formState)

    const handlers = {
        onSubmit: (e: React.FocusEvent) => {
            e.preventDefault();
            refetch()
        },

        onChange: (e: React.ChangeEvent) => Handler.onChangeInput<HotelSearch>(e, setForm)
    }

    useEffect(() => {
        console.log('formState', formState)
    }, [formState])
    

    const hotels = hotelsRoom && [...new Map(hotelsRoom.map(({hotel}) => [hotel._id, hotel])).values()]

    if (isLoading) return <Loading />

    return (
        <>
        <Container>
            <HotelSearchForm handlers={handlers} formState={formState}/>
            { hotels && hotels.map((hotel) => <HotelSearchCard key={hotel._id} hotel={hotel} />) }
        </Container>
        </>
    )
}