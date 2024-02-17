import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import UsersModule from "./components/UsersModule/UsersModule";
import HotelCreateModule from "./components/HotelsModule/HotelCreateModule";
import { ProtectedRoute } from "./components/utilites-components/ProtectedRoute";
import { Role } from "./config/roles.enum";
import { HotelModule } from "./components/HotelsModule/HotelModule";
import { HotelCardModule } from "./components/HotelsModule/HotelCardModule/HotelCardModule";
import { HotelCardEdit } from "./components/HotelsModule/HotelCardModule/HotelCardEdit";
import { HotelCardView } from "./components/HotelsModule/HotelCardModule/HotelCardView";
import { HotelRoomCardEdit } from "./components/HotelsModule/HotelRoomModule/HotelRoomCardEdit";


export default createBrowserRouter([
    {
      path: '/',
      id: 'root',
      element: <App />,
      // loader: appLoader,
      children: [
        { 
            path: 'hotels',
            element: <HotelModule />,
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
            path: 'hotel-create',
            element: (
              <ProtectedRoute roles={[ Role.Admin ]}>
                <HotelCreateModule />
              </ProtectedRoute>
            )
        },
        { 
          path: 'hotel/:id',
          element: (
            <HotelCardModule />
          ),
          children: [
            {
              path: '',
              element: <HotelCardView />
            }, {
              path: 'edit',
              element: (
                <ProtectedRoute roles={[ Role.Admin ]}>
                    <HotelCardEdit />
                </ProtectedRoute>
              )
            }, {
              path: ':roomId/edit',
              element: (
                <ProtectedRoute roles={[ Role.Admin ]}>
                    <HotelRoomCardEdit />
                </ProtectedRoute>
              )
            }
          ]
        },
      ]
    },
  ]);