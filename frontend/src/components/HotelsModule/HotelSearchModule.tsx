import { Container } from "react-bootstrap";
import { IHotelRoom } from "./interfaces/HotellRoom.interface.dto";
import { HotelSearch } from "./HotelSearch";
import { HotelSearchList } from "./HotelSearchList";
import axios, { AxiosResponse } from "axios";
import { useReducer } from "react";
import { IHotelSearch } from "./interfaces/Hotel.search.interface.dto";
import { reducer } from "../../reducers/common.reducer";
import { SERVER_URL } from "../../config/config";
import { IHotel } from "./interfaces/Hotel.interface.dto";
import React from "react";
import { hotelModuleReducer } from "../../reducers/hotelModule.reducer";
import { HotelSearchCard } from "./HotelSearchCard";
import { useLoaderData } from "react-router-dom";



interface pageState {
    hotelRooms: IHotelRoom[],
    hotels: IHotel[]
}

export default function HotelSearchModule () {


    const initialFormState: IHotelSearch = {
        title: '',
        offset: 0,
        limit: 10
    }

    const initialResponse: any = useLoaderData()

    const initialHotelsList = {
        hotelRooms: initialResponse.data,
        hotels: Array.from(new Map(initialResponse.data.map((item: IHotelRoom) => [item.hotel._id, item.hotel])).values())
    }

    const [ formState, dispatch ] : [ IHotelSearch, React.Dispatch<any> ] = useReducer(reducer, initialFormState )
    const [ pageState, dispatchPage ]: [pageState, React.Dispatch<any>] = useReducer(hotelModuleReducer, initialHotelsList)

    const handlers = {
        input: (e: any) => {
            dispatch({
                type: 'HANDLE CUSTOM FIELD',
                field: e.target.name,
                payload: e.target.value,
            })
        },

        submit: async (e: any) => {
            e.preventDefault();
            const response = await axios({
                method: 'get',
                url: SERVER_URL + '/api/common/hotel-rooms',
                params: {  ...formState }
              })
              
            dispatchPage({
                type: 'UPDATE HOTEL ROOMS',
                payload: response.data
            })
        }
    }

    const hotelSearchList = pageState.hotels.map(hotel => <HotelSearchCard hotel={hotel}/>)

    return (
        <Container>
            <HotelSearch handlers={handlers} formState={formState}/>
            <HotelSearchList>
                {hotelSearchList}
            </HotelSearchList>
        </Container>
    )
}