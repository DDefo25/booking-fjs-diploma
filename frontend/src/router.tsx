import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import HotelsModule from "./components/HotelsModule/HotelSearchModule";
import UsersModule from "./components/UsersModule/UsersModule";
import HotelRoomsModule from "./components/HotelsModule/HotelRoomsModule";
import HotelCreateModule from "./components/HotelsModule/HotelCreateModule";
import { SERVER_URL } from "./config";
import axios, { AxiosResponse } from "axios";

export default createBrowserRouter([
    {
      path: '/',
      element: <App />,
      children: [
        { 
            path: 'hotels',
            element: <HotelsModule />,
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
            element: <UsersModule />,
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