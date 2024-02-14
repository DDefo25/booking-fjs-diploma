import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import UsersModule from "./components/UsersModule/UsersModule";
import HotelRoomsModule from "./components/HotelsModule/HotelRoomsModule";
import HotelCreateModule from "./components/HotelsModule/HotelCreateModule";
import { SERVER_URL } from "./config/config";
import axios, { AxiosResponse } from "axios";
import { ProtectedRoute } from "./components/utilites-components/ProtectedRoute";
import { Role } from "./config/roles.enum";
import HotelSearchModule from "./components/HotelsModule/HotelSearchModule";
import { LoadingNavigate } from "./components/utilites-components/LoadingNavigate";

export default createBrowserRouter([
    {
      path: '/',
      id: 'root',
      element: <App />,
      // loader: appLoader,
      children: [
        { 
            path: 'hotels',
            element: (
              //  <LoadingNavigate>
                <HotelSearchModule />
              //  </LoadingNavigate>
            ),
            loader: async (): Promise<AxiosResponse> => {
              return await axios({
                method: 'get',
                url: SERVER_URL + '/api/common/hotel-rooms',
                params: {  
                  limit: 10,
                  offset: 0
                 }
              })
            },
        },
        { 
            path: 'users',
            element: (
              <ProtectedRoute roles={[ Role.Manager, Role.Admin ]}>
                <UsersModule />
              </ProtectedRoute>
            ),
        },
        { 
            path: 'hotel-rooms',
            element: <HotelRoomsModule />
        },
        { 
            path: 'hotel-create',
            element: <HotelCreateModule />
        },
      ]
    },
  ]);