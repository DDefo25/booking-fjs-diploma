import { Container } from "react-bootstrap";
import { HotelCard } from "./HotelCard";
import { HotelRoomsList } from "../HotelRoomModule/HotelRoomsList";
import { Outlet, useParams } from "react-router-dom";
import { HotelRoomRequest, useGetHotelRoomsQuery } from "../../../services/hotelAPI";
import { useEffect, useState } from "react";
import { Loading } from "../../utilites-components/Loading";
import { useCheckRoles } from "../../../hooks/useCheckRoles";


export function HotelCardModule () {
    return ( 
        <Outlet />
    )
}