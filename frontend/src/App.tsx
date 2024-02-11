import './App.css';
import { Col, Container, Row } from 'react-bootstrap';
import SideBar from './components/SideBar';
import Logo from './components/Logo';
import { Outlet, useLoaderData } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './hooks/hooksRedux';
import UserGreeting from './components/AuthModule/UserGreeting';
import GuestGreeting from './components/AuthModule/GuestGreeting';
import { setCredentials, userSelector } from './features/userSlice';
import { AuthService } from './services/auth.service';


function App() {
  const payload: any = useLoaderData()

  const dispatch = useAppDispatch()
  dispatch(setCredentials(payload))

  const user = useAppSelector(userSelector)

  return (
    <Container>
      <Row>
          <Col sm={4}>
            <Logo />
          </Col>
          <Col sm={8}>
            { user ? <UserGreeting /> : <GuestGreeting /> }
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

export const appLoader = async () => {
  const token = localStorage.getItem('token')
  if (token) {
    try {
      const user = await AuthService.getUser()
      return { user, token }
    } catch (e) {
      console.log(e)
    }
  }
  return { user: null, token: null }
}

export default App;

