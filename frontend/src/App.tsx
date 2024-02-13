import './App.css';
import { Col, Container, Row } from 'react-bootstrap';
import SideBar from './components/SideBar';
import Logo from './components/Logo';
import { Outlet, useLoaderData } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './hooks/hooksRedux';
import UserGreeting from './components/AuthModule/UserGreeting';
import GuestGreeting from './components/AuthModule/GuestGreeting';
import { setCredentials, authSelector } from './features/userSlice';
import { AuthService } from './services/auth.service';
import Profile from './components/AuthModule/Profile';

function App() {
  // const {user, token}: any = useLoaderData()
  // const dispatch = useAppDispatch()
  // // const dispatch = useAppDispatch()
  
  // // dispatch(setCredentials(payload))

  // // const user = useAppSelector(userSelector)

  // if (user && token) {
  //   dispatch(setCredentials({user, token}))
  // }



  return (
    <Container>
      <Row>
          <Col sm={4}>
            <Logo />
          </Col>
          <Col sm={8}>
            <Profile />
          </Col>
      </Row>
      <Row>
          <Col sm={4}>
            <SideBar />
          </Col>
          <Col sm={8}>
            <Outlet />
          </Col>
      </Row>
    </Container>
  );
}

export default App;

// export const appLoader = async () => {
//   try {
//     const user = await AuthService.getUser()
//     const token = localStorage.getItem('token')
//     return { user, token }
//   } catch (e) {
//     return { user: null, token: null }
//   }
// }

