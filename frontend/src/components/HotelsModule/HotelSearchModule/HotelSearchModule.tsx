import { Container } from "react-bootstrap";
import { HotelSearchForm } from "./HotelSearchForm";
import { useEffect, useState } from "react";
import { HotelSearch } from "../interfaces/Hotel.search.interface.dto";
import { HotelSearchCard } from "./HotelSearchCard";
import { Loading } from "../../utilites-components/Loading";

import { useGetHotelRoomsQuery } from "../../../services/hotelAPI";
import { Outlet } from "react-router-dom";
import { Handler, HandlersForm } from "../../../features/handlers/Handler";
import { format, add } from 'date-fns'
import { LoadingBox } from "../../utilites-components/LoadingBox";
import { useAppDispatch, useTypedSelector } from "../../../store/store";
import { ReservationDateState, editReservationDate, selectReservationDates } from "../../../features/slices/reservationDateSlice";



export function HotelSearchModule () {
    const initialFormState: HotelSearch = {
        title: '',
        offset: 0,
        limit: 10,
    }


    const queryParams = {} as ReservationDateState
    const { dateStart, dateEnd } = useTypedSelector( selectReservationDates )
    if ( dateStart !== '' && dateEnd !== '' ) {
        queryParams.dateStart = dateStart;
        queryParams.dateEnd = dateEnd;
    }

    const [ formState, setForm ] = useState(initialFormState )
    const { data: hotelRoomsGroupedByHotel, isLoading, isFetching, refetch } = useGetHotelRoomsQuery({...formState, ...queryParams})
    const dispatch = useAppDispatch()

    const handlers = {
        onSubmit: (e: React.FocusEvent) => {
            e.preventDefault();
            refetch()
        },

        onChange: (e: React.ChangeEvent) => Handler.onChangeInput<HotelSearch>(e, setForm),
        onChangeDate: (e: React.ChangeEvent<HTMLInputElement>) => dispatch( editReservationDate(e))
    }

    return (
        <>
        <Container>
            <HotelSearchForm handlers={handlers} formState={formState}/>
            <div className="loading-box-parent">
                { isLoading || isFetching
                    ? <LoadingBox /> 
                    : hotelRoomsGroupedByHotel 
                        && hotelRoomsGroupedByHotel.map((hotelGrouped) => 
                            <HotelSearchCard key={hotelGrouped._id} hotelGrouped={hotelGrouped} 
                        />)
                }
            </div>
        </Container>
        </>
    )
}