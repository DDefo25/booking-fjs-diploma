import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import HotelsModule from "./components/HotelsModule/HotelsModule";
import UsersModule from "./components/UsersModule/UsersModule";
import HotelRoomsModule from "./components/HotelsModule/HotelRoomsModule";
import HotelCreateModule from "./components/HotelsModule/HotelCreateModule";

export default createBrowserRouter([
    {
      path: '/',
      element: <App />,
      children: [
        { 
            path: 'hotels',
            element: <HotelsModule />
        },
        { 
            path: 'users',
            element: <UsersModule />
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