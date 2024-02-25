import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { HotelCard } from "./HotelCard";
import { useParams } from "react-router-dom";
import { HotelRoomRequest, useGetHotelQuery, useGetHotelRoomsQuery } from "../../../services/hotelAPI";
import { useEffect } from "react";
import { useAppDispatch, useTypedSelector } from "../../../store/store";
import { editReservationDate, selectReservationDates } from "../../../features/slices/reservationDateSlice";
import { HotelRoomCardView } from "../HotelRoomModule/HotelRoomCardView";
import { LoadingBox } from "../../utilites-components/Loading/LoadingBox";


export function HotelCardView () {
    const { id } = useParams()
    const { dateStart, dateEnd } = useTypedSelector( selectReservationDates )

    const queryParams: HotelRoomRequest = {
        hotel: id,
        offset: 0,
        limit: 10,
    }
    if ( dateStart !== '' && dateEnd !== '' ) {
        queryParams.dateStart = dateStart;
        queryParams.dateEnd = dateEnd;
    }
    
    console.log('queryParams', queryParams)
    
    const { data: hotelRoomsGroupedByHotel, isLoading, isFetching, refetch } = useGetHotelRoomsQuery(queryParams, )
    const { data: hotel, isLoading: isLoadingHotel, isFetching: isFetchingHotel } = useGetHotelQuery(id!, )
    const dispatch = useAppDispatch()

    useEffect(() => {
        console.log('{ dateStart, dateEnd }', { dateStart, dateEnd })
    }, [dateStart, dateEnd])

    useEffect(() => {
        console.log('hotelRoomsGroupedByHotel in HotelCardView', hotelRoomsGroupedByHotel)
    }, [hotelRoomsGroupedByHotel])

    const handlers = {
        onSubmit: (e: React.FormEvent) => {
            e.preventDefault();
            refetch()
        },

        onChangeDate: (e: React.ChangeEvent<HTMLInputElement>) => dispatch( editReservationDate(e))
    }

    return ( 
    <>  <Card className="mb-3">
            <Card.Body>
                <Card.Title>Даты бронирования</Card.Title>
                <Form onSubmit={ handlers.onSubmit }>
                    <Row className="mb-3 align-items-center" >
                        <Form.Group as={Col} className="mb-3" controlId="formSearchHotelStartDate">
                            <Form.Label>Заезд</Form.Label>
                            <Form.Control 
                                name='dateStart'
                                type="date" 
                                placeholder="Заезд" 
                                value={dateStart} 
                                onChange={ handlers.onChangeDate }/>
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3" controlId="formSearchHotelEndDate">
                            <Form.Label>Выезд</Form.Label>
                            <Form.Control 
                                name='dateEnd'
                                type="date" 
                                placeholder="Выезд" 
                                value={ dateEnd } 
                                onChange={ handlers.onChangeDate }/>
                        </Form.Group>
                        <Col xs="auto">
                            <Button variant="primary" type="submit">Искать</Button>
                        </Col>
                        
                    </Row>
                </Form> 
            </Card.Body>
        </Card>
        <div className="loading-box-parent">
            { isLoadingHotel || isFetchingHotel
                ? <LoadingBox />
                : hotel && <HotelCard hotel={hotel}/> }
            { isLoading || isFetching 
                ? <LoadingBox />
                : hotelRoomsGroupedByHotel 
                    && hotelRoomsGroupedByHotel[0].hotelRooms.map((hotelRoom, index) => <HotelRoomCardView key={index} hotelRoom={hotelRoom}/>) }
        </div>
    </>
    )
}