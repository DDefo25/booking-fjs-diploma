import { Outlet, createBrowserRouter } from 'react-router-dom';
import App from './App';
import UsersModule from './components/UsersModule/UsersModule';
import { ProtectedRoute } from './components/utilites-components/ProtectedRoute';
import { Role } from './config/roles.enum';
import { HotelsModule } from './components/HotelsModule/HotelsModule';
import { HotelCardEdit } from './components/HotelsModule/HotelCardModule/HotelCardEdit';
import { HotelCardView } from './components/HotelsModule/HotelCardModule/HotelCardView';
import { HotelRoomCardEdit } from './components/HotelsModule/HotelRoomModule/HotelRoomCardEdit';
import { HotelCreate } from './components/HotelsModule/HotelCreateModule/HotelCreate';
import HotelModule from './components/HotelsModule/HotelCreateModule/HotelModule';
import { HotelSearchModule } from './components/HotelsModule/HotelSearchModule/HotelSearchModule';
import { UserCreate } from './components/UsersModule/UserCreate';
import { ReservationModule } from './components/Reservation/ReservationModule';
import { HotelRoomCardAdd } from './components/HotelsModule/HotelRoomModule/HotelRoomCardAdd';


export default createBrowserRouter([
  {
    path: '/',
    id: 'root',
    element: <App />,
    children: [
      { 
        path: 'hotel-rooms',
        element: <HotelSearchModule />,
      }, { 
        path: 'users',
        element: (
            <ProtectedRoute roles={[ Role.Manager, Role.Admin ]}>
              <Outlet />
            </ProtectedRoute>
        ),
        children: [
          { 
            path: '',
            element: <UsersModule />,
          }, { 
            path: 'create',
            element: <UserCreate />,
          },
        ],
      }, { 
        path: 'reservation',
        element: (
              <ProtectedRoute roles={[ Role.Client, Role.Manager ]}>
                <Outlet />
              </ProtectedRoute>
        ),
        children: [
          { 
            path: '',
            element: <ReservationModule />,
          },
        ],
      }, { 
        path: 'hotels',
        element: (
              <ProtectedRoute roles={[ Role.Admin ]}>
                <HotelsModule />
              </ProtectedRoute>
        ),
      }, { 
        path: 'hotel',
        element: (
            <HotelModule />
        ),
        children: [
          {
            path: 'create',
            element: (
                <ProtectedRoute roles={[ Role.Admin ]}>
                    <HotelCreate />
                </ProtectedRoute>
            ),
          }, {
            path: ':id',
            children: [
              {
                path: '',
                element: <HotelCardView />,
              }, {
                path: 'edit',
                element: (
                    <ProtectedRoute roles={[ Role.Admin ]}>
                        <HotelCardEdit />
                    </ProtectedRoute>
                ),
              }, {
                path: 'add',
                element: (
                    <ProtectedRoute roles={[ Role.Admin ]}>
                        <HotelRoomCardAdd />
                    </ProtectedRoute>
                ),
              }, {
                path: ':roomId/edit',
                element: (
                    <ProtectedRoute roles={[ Role.Admin ]}>
                        <HotelRoomCardEdit />
                    </ProtectedRoute>
                ),
              },
            ],
          },  
        ],
      },
    ],
  },
]);